const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');
const path = require('path');
const logger = require('../utils/logger');

// 1. Fail-Fast Check for AWS Credentials
// This ensures that during deployment (e.g., Render/Railway), you are immediately 
// warned if you forgot to set the S3 environment variables.
const isAwsConfigured = process.env.AWS_REGION &&
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    process.env.AWS_S3_BUCKET_NAME;

if (!isAwsConfigured) {
    logger.warn('⚠️ AWS S3 credentials or bucket name are missing. File uploads will fail in production.');
}

// 2. Configure AWS S3 Client
const s3 = new S3Client({
    region: process.env.AWS_REGION || 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    }
});

// 3. Use memory storage to process the file stream before uploading to S3
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit to prevent memory overflow
});

// 4. Middleware to push memory buffer to S3
const uploadToS3 = async (req, res, next) => {
    // Proceed to the next middleware if no file(s) are uploaded
    if (!req.file && (!req.files || req.files.length === 0)) {
        return next();
    }

    if (!isAwsConfigured) {
        return res.status(500).json({ error: "Storage configuration is missing. Cannot process upload." });
    }

    try {
        // Helper function for uploading a single file buffer
        const uploadBuffer = async (file) => {
            const fileExtension = path.extname(file.originalname);
            const fileName = `${crypto.randomBytes(16).toString('hex')}${fileExtension}`;

            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: `uploads/${fileName}`,
                Body: file.buffer,
                ContentType: file.mimetype,
                // Note: We do NOT use `ACL: 'public-read'` here because modern AWS S3 
                // best practice enforces Bucket Policies instead of Object ACLs.
            };

            const command = new PutObjectCommand(params);
            await s3.send(command);

            // Inject the public S3 URL back into the file object so the controller can save it to the DB
            file.s3Url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;
        };

        // Handle both single file (req.file) and multiple files (req.files) arrays safely
        if (req.file) {
            await uploadBuffer(req.file);
        } else if (req.files) {
            await Promise.all(req.files.map(file => uploadBuffer(file)));
        }

        next();
    } catch (error) {
        logger.error(`S3 Upload Error: ${error.message}`);
        res.status(500).json({ error: "Failed to securely upload file to storage" });
    }
};

module.exports = { upload, uploadToS3 };