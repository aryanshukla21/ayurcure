const UserModel = require('../models/userModel');
const authService = require('../services/authService');
const notificationService = require('../services/notificationService');
const logger = require('../utils/logger');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ==========================================
// 1. LOCAL AUTHENTICATION (EMAIL & PHONE)
// ==========================================

exports.register = async (req, res) => {
    try {
        const { role, full_name, email, phone, password } = req.body;

        if (!email || !password || !full_name) {
            return res.status(400).json({ error: 'Incomplete registration details.' });
        }

        const password_hash = await authService.hashData(password);

        const newUser = await UserModel.createUser({
            role: role || 'patient',
            full_name,
            email,
            phone,
            auth_provider: 'local',
            password_hash,
            otp_hash: null, // No longer stored locally
            otp_expires_at: null,
            google_id: null
        });

        // THIRD-PARTY VERIFICATION: Trigger Twilio Verify for Email
        await notificationService.sendEmailVerification(email);

        res.status(201).json({ message: 'Verification email sent via third-party service.', userId: newUser.id });
    } catch (error) {
        if (error.code === '23505') return res.status(409).json({ error: 'User exists.' });
        logger.error(`Register Error: ${error.message}`);
        res.status(500).json({ error: 'Registration failed.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.getUserByEmail(email);

        if (!user || !user.password_hash || !(await authService.verifyHash(password, user.password_hash))) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        if (user.account_status !== 'Active') {
            return res.status(403).json({ error: `Account is ${user.account_status}.` });
        }

        // Security requirement: Must be verified via Email or Phone
        if (!user.is_email_verified && !user.is_phone_verified) {
            return res.status(403).json({ error: 'Account not verified. Please check your email or phone.' });
        }

        const token = authService.generateToken(user);
        res.status(200).json({ token, user: { id: user.id, role: user.role } });
    } catch (error) {
        logger.error(`Login Error: ${error.message}`);
        res.status(500).json({ error: 'Login failed.' });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Use third-party service to verify the code
        const isApproved = await notificationService.verifyEmailOTP(email, otp);

        if (!isApproved) {
            return res.status(401).json({ error: 'Invalid or expired verification code.' });
        }

        const user = await UserModel.getUserByEmail(email);
        if (!user) return res.status(404).json({ error: 'User not found.' });

        await UserModel.updateVerificationStatus(user.id, true, 'email');
        const token = authService.generateToken(user);

        res.status(200).json({ message: 'Email verified successfully.', token });
    } catch (error) {
        logger.error(`Email Verify Error: ${error.message}`);
        res.status(500).json({ error: 'Verification failed.' });
    }
};

// ==========================================
// 2. PHONE VERIFICATION (TWILIO VERIFY)
// ==========================================

exports.requestPhoneOTP = async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) return res.status(400).json({ error: 'Phone number required.' });

        await notificationService.sendPhoneOTP(phone);
        res.status(200).json({ message: 'Verification code sent to your phone.' });
    } catch (error) {
        logger.error(`Phone OTP Request Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to send SMS OTP.' });
    }
};

exports.verifyPhoneOTP = async (req, res) => {
    try {
        const { phone, otp } = req.body;
        const isApproved = await notificationService.verifyPhoneOTP(phone, otp);

        if (!isApproved) {
            return res.status(401).json({ error: 'Invalid or expired phone OTP.' });
        }

        await UserModel.updateVerificationStatus(req.user.id, true, 'phone');
        res.status(200).json({ message: 'Phone number verified successfully.' });
    } catch (error) {
        logger.error(`Phone OTP Verify Error: ${error.message}`);
        res.status(500).json({ error: 'Verification failed.' });
    }
};

// ==========================================
// 3. SSO & PASSWORD MANAGEMENT
// ==========================================

exports.ssoLogin = async (req, res) => {
    try {
        const { idToken, role } = req.body;
        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { email, name, email_verified, sub: google_id } = ticket.getPayload();
        if (!email_verified) return res.status(403).json({ error: 'Google email not verified.' });

        let user = await UserModel.getUserByGoogleId(google_id);
        if (!user) {
            user = await UserModel.getUserByEmail(email);
            if (user) {
                user = await UserModel.linkGoogleAccount(user.id, google_id);
            } else {
                user = await UserModel.createUser({
                    role: role || 'patient',
                    full_name: name,
                    email,
                    auth_provider: 'google',
                    google_id
                });
                await UserModel.updateVerificationStatus(user.id, true, 'email');
            }
        }

        const token = authService.generateToken(user);
        res.status(200).json({
            token,
            user: { id: user.id, role: user.role, full_name: user.full_name },
            requiresPasswordSetup: !user.password_hash
        });
    } catch (error) {
        logger.error(`SSO Error: ${error.message}`);
        res.status(401).json({ error: 'SSO Verification failed.' });
    }
};

exports.setupSsoPassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { newPassword } = req.body;

        const user = await UserModel.getUserByEmail(req.user.email);
        if (user.password_hash) return res.status(400).json({ error: 'Password already established.' });

        const password_hash = await authService.hashData(newPassword);
        await UserModel.updatePasswordAndClearOtp(userId, password_hash);

        res.status(200).json({ message: 'Password established successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to set password.' });
    }
};

// Recovery using SendGrid
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.getUserByEmail(email);

        if (user && user.auth_provider === 'local') {
            // Trigger third-party verification for password reset
            await notificationService.sendEmailVerification(email);
        }

        res.status(200).json({ message: 'If registered, a reset code has been sent via third-party service.' });
    } catch (error) {
        res.status(500).json({ error: 'Error processing request.' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const isApproved = await notificationService.verifyEmailOTP(email, otp);

        if (!isApproved) return res.status(401).json({ error: 'Invalid or expired code.' });

        const user = await UserModel.getUserByEmail(email);
        const new_password_hash = await authService.hashData(newPassword);
        await UserModel.updatePasswordAndClearOtp(user.id, new_password_hash);

        res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Error resetting password.' });
    }
};