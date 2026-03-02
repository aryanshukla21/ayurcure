const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

class NotificationService {
    constructor() {
        // Initialize the SMTP transport. 
        // Analytical Note: In production, use managed services like SendGrid, AWS SES, or Mailgun 
        // rather than standard SMTP for higher deliverability rates and bounce tracking.
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    /**
     * Dispatches a standardized HTML email.
     * @param {string} to - Recipient email address.
     * @param {string} subject - Email subject line.
     * @param {string} htmlContent - Rendered HTML body.
     */
    async sendEmail(to, subject, htmlContent) {
        try {
            const info = await this.transporter.sendMail({
                from: `"AyurCure Support" <${process.env.SMTP_USER}>`,
                to,
                subject,
                html: htmlContent,
            });
            logger.debug(`Email dispatched to ${to} | MessageId: ${info.messageId}`);
            return true;
        } catch (error) {
            logger.error(`SMTP Dispatch Failure for ${to}: ${error.message}`);
            // Do not throw the error to prevent blocking the main execution thread (e.g., user registration)
            return false;
        }
    }

    /**
     * Domain-specific wrapper for OTP delivery.
     */
    async sendOTP(email, otp) {
        const subject = 'Your AyurCure Verification Code';
        const html = `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>AyurCure Verification</h2>
                <p>Your One-Time Password (OTP) is:</p>
                <h1 style="color: #2E8B57; letter-spacing: 5px;">${otp}</h1>
                <p>This code will expire in 5 minutes. Do not share it with anyone.</p>
            </div>
        `;
        return this.sendEmail(email, subject, html);
    }

    /**
     * Dispatches an SMS message.
     * @param {string} phone - Recipient phone number in E.164 format.
     * @param {string} message - Plain text message.
     */
    async sendSMS(phone, message) {
        try {
            // Mock implementation. Replace with Twilio/AWS SNS SDK.
            // const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
            // await client.messages.create({ body: message, from: process.env.TWILIO_PHONE, to: phone });

            logger.debug(`[MOCK SMS] Sent to ${phone}: ${message}`);
            return true;
        } catch (error) {
            logger.error(`SMS Dispatch Failure for ${phone}: ${error.message}`);
            return false;
        }
    }
}

module.exports = new NotificationService();