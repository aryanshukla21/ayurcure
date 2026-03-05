// backend/src/middlewares/uploadMiddleware.js
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');
const path = require('path');

// Configure AWS S3 Client using your existing environment variables
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

// Use memory storage to process the file stream before uploading to S3
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

// Middleware to push memory buffer to S3
const uploadToS3 = async (req, res, next) => {
    // Proceed to the next middleware if no file(s) are uploaded
    if (!req.file && (!req.files || req.files.length === 0)) {
        return next();
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
            };

            const command = new PutObjectCommand(params);
            await s3.send(command);

            // Inject the public S3 URL back into the file object so the controller can save it to the DB
            file.s3Url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;
        };

        if (req.file) {
            await uploadBuffer(req.file);
        } else if (req.files) {
            await Promise.all(req.files.map(file => uploadBuffer(file)));
        }

        next();
    } catch (error) {
        console.error("S3 Upload Error:", error);
        res.status(500).json({ error: "Failed to upload file to S3" });
    }
};

module.exports = { upload, uploadToS3 };