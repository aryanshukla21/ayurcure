const cron = require('node-cron');
const UserModel = require('../models/userModel');
const db = require('../config/db')
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

/**
 * Sweeps the Appointments table every 5 minutes.
 * If an appointment's end_time has passed and it is still 'Scheduled', 
 * it forces the status to 'Completed'.
 */
const startAppointmentSweepJob = () => {
    cron.schedule('* * * * *', async () => {
        try {
            const query = `
                UPDATE Appointments 
                SET status = 'Completed' 
                WHERE status = 'Scheduled' AND end_time < CURRENT_TIMESTAMP
            `;
            const result = await db.query(query);
            if (result.rowCount > 0) {
                logger.info(`CRON: Swept ${result.rowCount} overdue appointments to 'Completed'.`);
            }
        } catch (error) {
            logger.error(`CRON ERROR: Failed to sweep past appointments: ${error.message}`);
        }
    });
};

module.exports = { startOtpCleanupJob, startAppointmentSweepJob };