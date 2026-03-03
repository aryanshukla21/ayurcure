const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    // 1. Log the full error (including stack trace)
    logger.error(`${err.name}: ${err.message}`, {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        stack: err.stack,
    });

    // 2. Determine response status and message
    const statusCode = err.statusCode || 500;

    // In production, avoid sending detailed server errors to the client
    const message = process.env.NODE_ENV === 'production' && statusCode === 500
        ? 'Internal Server Error'
        : err.message;

    res.status(statusCode).json({
        success: false,
        error: message,
    });
};

module.exports = errorHandler;