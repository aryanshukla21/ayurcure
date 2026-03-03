const UserModel = require('../models/userModel');
const authService = require('../services/authService');
const notificationService = require('../services/notificationService');
const logger = require('../utils/logger');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.register = async (req, res) => {
    try {
        const { role, full_name, email, phone, password } = req.body;

        if (!email || !password || !full_name) {
            return res.status(400).json({ error: 'Incomplete registration details.' });
        }

        const password_hash = await authService.hashData(password);
        const rawOtp = authService.generateOTP();
        const otp_hash = await authService.hashData(rawOtp);

        // OTP expiry set to 5 minutes per requirements
        const otp_expires_at = new Date(Date.now() + 5 * 60000);

        const newUser = await UserModel.createUser({
            role: role || 'patient',
            full_name,
            email,
            phone,
            auth_provider: 'local',
            password_hash,
            otp_hash,
            otp_expires_at
        });

        await notificationService.sendOTP(email, rawOtp);

        res.status(201).json({ message: 'OTP sent to email.', userId: newUser.id });
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
            return res.status(403).json({ error: 'Account not active.' });
        }

        if (!user.is_email_verified && !user.is_phone_verified) {
            return res.status(403).json({ error: 'Account not verified.' });
        }

        const token = authService.generateToken(user);
        res.status(200).json({ token, user: { id: user.id, role: user.role } });
    } catch (error) {
        logger.error(`Login Error: ${error.message}`);
        res.status(500).json({ error: 'Login failed.' });
    }
};

exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await UserModel.getUserByEmail(email);

        if (!user || new Date() > new Date(user.otp_expires_at)) {
            return res.status(400).json({ error: 'OTP invalid or expired.' });
        }

        if (!(await authService.verifyHash(otp, user.otp_hash))) {
            return res.status(401).json({ error: 'Invalid OTP.' });
        }

        await UserModel.updateVerificationStatus(user.id, true);
        const token = authService.generateToken(user);

        res.status(200).json({ token });
    } catch (error) {
        logger.error(`OTP Verify Error: ${error.message}`);
        res.status(500).json({ error: 'OTP verification failed.' });
    }
};

exports.resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.getUserByEmail(email);

        if (!user) return res.status(404).json({ error: 'User not found.' });

        const rawOtp = authService.generateOTP();
        const otp_hash = await authService.hashData(rawOtp);
        const otp_expires_at = new Date(Date.now() + 5 * 60000);

        await UserModel.updateOtp(user.id, otp_hash, otp_expires_at);
        await notificationService.sendOTP(email, rawOtp);

        res.status(200).json({ message: 'OTP resent.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to resend OTP.' });
    }
};

exports.ssoLogin = async (req, res) => {
    try {
        const { idToken, role } = req.body;

        if (!idToken) return res.status(400).json({ error: 'Google ID token is required.' });

        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        // Extract the unique 'sub' identifier from Google's payload
        const { email, name, email_verified, sub: google_id } = ticket.getPayload();

        if (!email_verified) return res.status(403).json({ error: 'Google email not verified.' });

        let requiresPasswordSetup = false;

        // 1. Primary Look-up: Attempt to find user by their immutable Google ID
        let user = await UserModel.getUserByGoogleId(google_id);

        if (!user) {
            // 2. Secondary Look-up: Check if they previously registered locally using this email
            user = await UserModel.getUserByEmail(email);

            if (user) {
                // Account Linking: They exist locally, but this is their first time using Google SSO.
                // Attach the google_id to their existing record.
                user = await UserModel.linkGoogleAccount(user.id, google_id);
                if (!user.password_hash) requiresPasswordSetup = true;

            } else {
                // 3. Complete Registration: Brand new user
                user = await UserModel.createUser({
                    role: role || 'patient',
                    full_name: name,
                    email,
                    phone: null,
                    auth_provider: 'google',
                    password_hash: null,
                    otp_hash: null,
                    otp_expires_at: null,
                    google_id // Insert the extracted sub ID here
                });
                await UserModel.updateVerificationStatus(user.id, true);
                requiresPasswordSetup = true;
            }
        } else if (!user.password_hash) {
            requiresPasswordSetup = true;
        }

        if (user.account_status !== 'Active') {
            return res.status(403).json({ error: `Account is ${user.account_status}.` });
        }

        const token = authService.generateToken(user);

        res.status(200).json({
            token,
            user: { id: user.id, role: user.role, full_name: user.full_name },
            requiresPasswordSetup
        });
    } catch (error) {
        logger.error(`SSO Error: ${error.message}`);
        res.status(401).json({ error: 'SSO Verification failed.' });
    }
};

exports.setupSsoPassword = async (req, res) => {
    try {
        // req.user is extracted via authMiddleware
        const userId = req.user.id;
        const { newPassword } = req.body;

        if (!newPassword) return res.status(400).json({ error: 'Password is required.' });

        const password_hash = await authService.hashData(newPassword);
        await UserModel.updatePasswordAndClearOtp(userId, password_hash);

        res.status(200).json({ message: 'Password successfully established for SSO account.' });
    } catch (error) {
        logger.error(`SSO Password Setup Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to set password.' });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.getUserByEmail(email);

        if (user && user.auth_provider === 'local') {
            const rawOtp = authService.generateOTP();
            const otp_hash = await authService.hashData(rawOtp);
            const otp_expires_at = new Date(Date.now() + 5 * 60000);

            await UserModel.updateOtp(user.id, otp_hash, otp_expires_at);
            await notificationService.sendOTP(email, rawOtp);
        }

        res.status(200).json({ message: 'If registered, a reset OTP has been sent.' });
    } catch (error) {
        logger.error(`Forgot Password Error: ${error.message}`);
        res.status(500).json({ error: 'Error processing request.' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await UserModel.getUserByEmail(email);

        if (!user || !user.otp_expires_at || new Date() > new Date(user.otp_expires_at)) {
            return res.status(400).json({ error: 'OTP expired or invalid.' });
        }

        if (!(await authService.verifyHash(otp, user.otp_hash))) {
            return res.status(401).json({ error: 'Invalid OTP.' });
        }

        const new_password_hash = await authService.hashData(newPassword);
        await UserModel.updatePasswordAndClearOtp(user.id, new_password_hash);

        res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
        logger.error(`Reset Password Error: ${error.message}`);
        res.status(500).json({ error: 'Error resetting password.' });
    }
};