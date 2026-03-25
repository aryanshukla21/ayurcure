const { RtcTokenBuilder, RtcRole, RtmTokenBuilder, RtmRole } = require('agora-token');
const logger = require('../utils/logger');

class AgoraService {
    /**
     * Generates an RTC token for a specific channel (Video/Audio).
     */
    generateRTCToken(channelName, uid) {
        try {
            const appId = process.env.AGORA_APP_ID;
            const appCertificate = process.env.AGORA_APP_CERTIFICATE;

            if (!appId || !appCertificate) {
                logger.warn('Agora credentials missing. Video consultations disabled.');
                throw new Error('Agora integration is not configured.');
            }

            const role = RtcRole.PUBLISHER;

            // Token expires in 2 hours for safety
            const expirationTimeInSeconds = 7200;
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

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
            logger.error(`Agora RTC Token Generation Error: ${error.message}`);
            throw new Error('Could not generate video token.');
        }
    }

    /**
     * Generates an RTM token for a specific user (Real-Time Messaging / Chat).
     */
    generateRTMToken(userIdString) {
        try {
            const appId = process.env.AGORA_APP_ID;
            const appCertificate = process.env.AGORA_APP_CERTIFICATE;

            if (!appId || !appCertificate) return null;

            const expirationTimeInSeconds = 7200;
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

            // RTM requires the user ID to be a string
            return RtmTokenBuilder.buildToken(
                appId,
                appCertificate,
                userIdString,
                RtmRole.Rtm_User,
                privilegeExpiredTs
            );
        } catch (error) {
            logger.error(`Agora RTM Token Generation Error: ${error.message}`);
            throw new Error('Could not generate chat token.');
        }
    }
}

module.exports = new AgoraService();