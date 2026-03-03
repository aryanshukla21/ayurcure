const { RtcTokenBuilder, RtcRole } = require('agora-token');
const logger = require('../utils/logger');

class AgoraService {
    /**
     * Generates an RTC token for a specific channel and user.
     * @param {string} channelName - The unique ID of the appointment.
     * @param {number} uid - The integer user ID (Agora requires integers for RTC).
     */
    generateRTCToken(channelName, uid) {
        try {
            const appId = process.env.AGORA_APP_ID;
            const appCertificate = process.env.AGORA_APP_CERTIFICATE;

            if (!appId || !appCertificate) {
                logger.warn('Agora credentials missing. Video consultations disabled.');
                throw new Error('Agora integration is not configured.');
            }

            const role = RtcRole.PUBLISHER; // Both doctor and patient publish audio/video

            // Token expires in 1 hour
            const expirationTimeInSeconds = 3600;
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

            // `buildTokenWithUid` is the official method signature for the `agora-token` library.
            const token = RtcTokenBuilder.buildTokenWithUid(
                appId,
                appCertificate,
                channelName,
                uid,
                role,
                privilegeExpiredTs
            );

            return token;
        } catch (error) {
            logger.error(`Agora Token Generation Error: ${error.message}`);
            throw new Error('Could not generate video token.');
        }
    }
}

module.exports = new AgoraService();