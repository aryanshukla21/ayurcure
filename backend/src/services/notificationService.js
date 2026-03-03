const twilio = require('twilio');
const logger = require('../utils/logger');

class NotificationService {
    constructor() {
        this.client = twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );
        this.verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;
    }

    /**
     * Sends an OTP via Twilio Verify.
     * @param {string} phoneNumber - Recipient phone in E.164 format (e.g., +919876543210).
     */
    async sendOTP(phoneNumber) {
        try {
            const verification = await this.client.verify.v2
                .services(this.verifySid)
                .verifications.create({ to: phoneNumber, channel: 'sms' });
            return verification.status;
        } catch (error) {
            logger.error(`Twilio OTP Send Error: ${error.message}`);
            throw new Error('Failed to send verification code.');
        }
    }

    /**
     * Verifies an OTP entered by the user.
     */
    async verifyOTP(phoneNumber, code) {
        try {
            const check = await this.client.verify.v2
                .services(this.verifySid)
                .verificationChecks.create({ to: phoneNumber, code });
            return check.status === 'approved';
        } catch (error) {
            logger.error(`Twilio OTP Verify Error: ${error.message}`);
            return false;
        }
    }

    /**
     * Sends transactional SMS (e.g., appointment reminders).
     */
    async sendSMS(phoneNumber, message) {
        try {
            const response = await this.client.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phoneNumber
            });
            return response.sid;
        } catch (error) {
            logger.error(`Twilio Transactional SMS Error: ${error.message}`);
            return null;
        }
    }
}

module.exports = new NotificationService();