const cron = require('node-cron');
const UserModel = require('../models/userModel');
const logger = require('./logger');

/**
 * Executes a database sweep every minute ('* * * * *') to enforce strict OTP TTL.
 * Physically nullifies the hashed data from the PostgreSQL table once the timestamp expires.
 */
const startOtpCleanupJob = () => {
    // Schedule task to run at the start of every minute
    cron.schedule('* * * * *', async () => {
        try {
            await UserModel.clearExpiredOtps();
            // Using debug level to prevent log pollution during normal operation
            logger.debug('CRON: Expired OTP sweep completed successfully.');
        } catch (error) {
            // Escalate to error level for immediate visibility if the cleanup fails
            logger.error(`CRON ERROR: Failed to clear expired OTPs: ${error.message}`);
        }
    });
};

module.exports = { startOtpCleanupJob };