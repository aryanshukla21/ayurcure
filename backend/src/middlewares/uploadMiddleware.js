const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');
const path = require('path');
const logger = require('../utils/logger');
const dns = require('dns');

// 🚨 PERFORMANCE FIX: Force Node.js to use IPv4 first.
// This prevents the 15-second AWS S3 timeout bug caused by Node.js 18+ IPv6 resolution.
dns.setDefaultResultOrder('ipv4first');

// 1. Fail-Fast Check for AWS Credentials
const isAwsConfigured = process.env.AWS_REGION &&
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    process.env.AWS_S3_BUCKET_NAME;

if (!isAwsConfigured) {
    logger.warn('⚠️ AWS S3 credentials or bucket name are missing. File uploads will fail in production.');
    console.warn('⚠️ [AWS INIT] Missing required AWS environment variables.');
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
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

// 4. Middleware to push memory buffer to S3
const uploadToS3 = async (req, res, next) => {
    console.log('--- [AWS S3 Middleware] Triggered ---');
    console.log(`[AWS S3 Middleware] req.file present: ${!!req.file}`);
    console.log(`[AWS S3 Middleware] req.files present: ${!!req.files && req.files.length > 0}`);

    // Proceed to the next middleware if no file(s) are uploaded
    if (!req.file && (!req.files || req.files.length === 0)) {
        console.log('[AWS S3 Middleware] No files detected. Skipping S3 upload.');
        return next();
    }

    if (!isAwsConfigured) {
        console.error('🚨 [AWS S3 Middleware] Cannot process upload: AWS is not configured properly.');
        return res.status(500).json({ error: "Storage configuration is missing. Cannot process upload." });
    }

    try {
        // Helper function for uploading a single file buffer
        const uploadBuffer = async (file) => {
            console.log(`\n[AWS S3 Middleware] Processing file: ${file.originalname}`);

            const fileExtension = path.extname(file.originalname);
            const fileName = `${crypto.randomBytes(16).toString('hex')}${fileExtension}`;
            console.log(`[AWS S3 Middleware] Generated unique filename: ${fileName}`);

            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: `uploads/${fileName}`,
                Body: file.buffer,
                ContentType: file.mimetype,
            };

            console.log(`[AWS S3 Middleware] Prepared S3 Params: Bucket=${params.Bucket}, Key=${params.Key}, ContentType=${params.ContentType}`);

            try {
                console.log(`[AWS S3 Middleware] Sending PutObjectCommand to AWS S3...`);
                const command = new PutObjectCommand(params);
                await s3.send(command); // This will now execute instantly over IPv4
                console.log(`✅ [AWS S3 Middleware] Successfully uploaded ${file.originalname} to S3.`);
            } catch (s3SendError) {
                console.error(`🚨 [AWS S3 Middleware] S3 SEND ERROR for ${file.originalname}:`, s3SendError);
                throw s3SendError; // Rethrow to trigger the outer catch block
            }

            try {
                // Inject the public S3 URL back into the file object
                file.s3Url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;
                console.log(`✅ [AWS S3 Middleware] Generated S3 URL attached to req.file: ${file.s3Url}\n`);
            } catch (urlGenError) {
                console.error(`🚨 [AWS S3 Middleware] URL GENERATION ERROR for ${file.originalname}:`, urlGenError);
                throw urlGenError;
            }
        };

        // Handle both single file (req.file) and multiple files (req.files) arrays safely
        if (req.file) {
            console.log('[AWS S3 Middleware] Detected single file upload (req.file).');
            await uploadBuffer(req.file);
        } else if (req.files) {
            console.log(`[AWS S3 Middleware] Detected multiple file upload (req.files). Count: ${req.files.length}`);
            await Promise.all(req.files.map(file => uploadBuffer(file)));
        }

        console.log('--- [AWS S3 Middleware] Execution Complete. Moving to next middleware. ---\n');
        next();
    } catch (error) {
        // This will catch any errors thrown during the buffer mapping or S3 sending
        console.error('🚨 [AWS S3 Middleware] CRITICAL UPLOAD EXCEPTION:', error);
        logger.error(`S3 Upload Error: ${error.message}`);
        res.status(500).json({ error: "Failed to securely upload file to storage" });
    }
};

module.exports = { upload, uploadToS3 };