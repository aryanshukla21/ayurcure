const UserModel = require('../models/userModel');
const authService = require('../services/authService');
const notificationService = require('../services/notificationService');
const logger = require('../utils/logger');

exports.register = async (req, res) => {
    try {
        const { role, full_name, email, phone, password } = req.body;

        if (!email || !password || !full_name) {
            return res.status(400).json({ error: 'Incomplete registration details.' });
        }

        const password_hash = await authService.hashData(password);
        const rawOtp = authService.generateOTP();
        const otp_hash = await authService.hashData(rawOtp);

        // OTP expiry set to 5 minutes per requirements [cite: 141]
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

        if (!user || !(await authService.verifyHash(password, user.password_hash))) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        if (user.account_status !== 'Active') {
            return res.status(403).json({ error: 'Account not active.' });
        }

        if (!user.is_email_verified) {
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