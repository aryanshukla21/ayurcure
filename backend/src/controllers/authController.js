const UserModel = require('../models/userModel');
const PatientModel = require('../models/patientModel');
const DoctorModel = require('../models/doctorModel');
const authService = require('../services/authService');
const notificationService = require('../services/notificationService');
const logger = require('../utils/logger');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const tempOtpCache = new Map();

// --- UPDATED COOKIE FUNCTION ---
const setTokenCookie = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Must be true in production (requires HTTPS)
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' required for cross-domain
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
};

// ==========================================
// 1. LOCAL AUTHENTICATION & REGISTRATION
// ==========================================

// STEP 1: Send OTPs but DO NOT create the user in the database yet
exports.sendSignupOtps = async (req, res) => {
    try {
        const { email, phone } = req.body;
        if (!email || !phone) return res.status(400).json({ error: 'Email and Phone are required.' });

        await notificationService.sendPhoneOTP(phone);
        const emailOtp = authService.generateOTP();
        tempOtpCache.set(email, { otp: emailOtp, expiresAt: Date.now() + 5 * 60000 });
        await notificationService.sendEmailVerification(email, emailOtp);

        res.status(200).json({ message: 'Verification codes sent.' });
    } catch (error) {
        logger.error(`Pre-Signup OTP Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to send verification codes.' });
    }
};

// STEP 2: Verify both OTPs and Permanently Store User Details
exports.verifyAndRegister = async (req, res) => {
    try {
        const { role, full_name, email, phone, password, emailOtp, phoneOtp } = req.body;

        const isPhoneValid = await notificationService.verifyPhoneOTP(phone, phoneOtp);
        if (!isPhoneValid) return res.status(401).json({ error: 'Invalid or expired Phone OTP.' });

        const cachedEmailData = tempOtpCache.get(email);
        if (!cachedEmailData || cachedEmailData.otp !== emailOtp || Date.now() > cachedEmailData.expiresAt) {
            return res.status(401).json({ error: 'Invalid or expired Email OTP.' });
        }
        tempOtpCache.delete(email);

        const password_hash = await authService.hashData(password);
        const newUser = await UserModel.createUser({
            role: role || 'patient',
            full_name, email, phone,
            auth_provider: 'local',
            password_hash, google_id: null
        });

        await UserModel.updateVerificationStatus(newUser.id, true, 'email');
        await UserModel.updateVerificationStatus(newUser.id, true, 'phone');

        if (role === 'doctor') {
            await DoctorModel.createProfile({ user_id: newUser.id });
        } else {
            await PatientModel.createProfile({ user_id: newUser.id });
        }

        const token = authService.generateToken(newUser);
        setTokenCookie(res, token); // Use updated cookie function

        res.status(201).json({ message: 'Registration complete.', user: { id: newUser.id, role: newUser.role } });
    } catch (error) {
        if (error.code === '23505') return res.status(409).json({ error: 'Email or phone already registered.' });
        logger.error(`Registration Error: ${error.message}`);
        res.status(500).json({ error: 'Registration failed.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, phone, password, role } = req.body;
        let user;

        if (email) user = await UserModel.getUserByEmail(email);
        else if (phone) user = await UserModel.getUserByPhone(phone);
        else return res.status(400).json({ error: 'Email or phone required.' });

        if (!user || !user.password_hash || !(await authService.verifyHash(password, user.password_hash))) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        if (role && user.role !== role) {
            return res.status(403).json({ error: `You are registered as a ${user.role}.` });
        }

        if (user.account_status !== 'Active') {
            return res.status(403).json({ error: `Account is ${user.account_status}.` });
        }

        const token = authService.generateToken(user);
        setTokenCookie(res, token); // Use updated cookie function

        res.status(200).json({ user: { id: user.id, role: user.role } });
    } catch (error) {
        logger.error(`Login Error: ${error.message}`);
        res.status(500).json({ error: 'Login failed.' });
    }
};

// ==========================================
// 2. EMAIL / PHONE VERIFICATION (LEGACY / MANUAL)
// ==========================================

exports.requestEmailVerification = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.getUserByEmail(email);
        if (!user) return res.status(404).json({ error: 'User not found.' });

        const otp = authService.generateOTP();
        const otpHash = await authService.hashData(otp);
        const expiryDate = new Date(Date.now() + 5 * 60000);

        await UserModel.updateOtp(user.id, otpHash, expiryDate);
        await notificationService.sendEmailVerification(email, otp);

        res.status(200).json({ message: 'Verification email sent.' });
    } catch (error) {
        logger.error(`Request Email Verification Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to send verification email.' });
    }
};

exports.verifyEmailToken = async (req, res) => {
    try {
        const { email, token } = req.body;

        const user = await UserModel.getUserByEmail(email);
        if (!user) return res.status(404).json({ error: 'User not found.' });

        if (!user.otp_hash || new Date() > user.otp_expires_at) {
            return res.status(401).json({ error: 'OTP expired or invalid.' });
        }

        const isValid = await authService.verifyHash(token, user.otp_hash);
        if (!isValid) return res.status(401).json({ error: 'Invalid verification code.' });

        await UserModel.updateVerificationStatus(user.id, true, 'email');
        await UserModel.updatePasswordAndClearOtp(user.id, user.password_hash);

        const jwtToken = authService.generateToken(user);
        setTokenCookie(res, jwtToken); // Use updated cookie function

        res.status(200).json({ message: 'Email verified successfully.' });
    } catch (error) {
        logger.error(`Email Verify Error: ${error.message}`);
        res.status(500).json({ error: 'Verification failed.' });
    }
};

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

exports.resendOtp = async (req, res) => {
    try {
        const { email, phone } = req.body;

        if (email) {
            return await exports.requestEmailVerification(req, res);
        } else if (phone) {
            return await exports.requestPhoneOTP(req, res);
        } else {
            return res.status(400).json({ error: 'Provide either email or phone to resend OTP.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to resend OTP.' });
    }
};

exports.verifyOtp = async (req, res) => {
    try {
        const { email, phone } = req.body;
        if (email) {
            req.body.token = req.body.otp;
            return await exports.verifyEmailToken(req, res);
        } else if (phone) {
            if (!req.user) req.user = await UserModel.getUserByEmail(email);
            return await exports.verifyPhoneOTP(req, res);
        }
        res.status(400).json({ error: 'Email or Phone required.' });
    } catch (error) {
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

                // Also create Role-based profile for new SSO users
                if (role === 'doctor') {
                    await DoctorModel.createProfile({ user_id: user.id });
                } else {
                    await PatientModel.createProfile({ user_id: user.id });
                }
            }
        }

        const token = authService.generateToken(user);
        setTokenCookie(res, token); // Use updated cookie function

        res.status(200).json({
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

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.getUserByEmail(email);

        if (user && user.auth_provider === 'local') {
            const otp = authService.generateOTP();
            const otpHash = await authService.hashData(otp);
            const expiryDate = new Date(Date.now() + 5 * 60000); // 5 mins

            await UserModel.updateOtp(user.id, otpHash, expiryDate);
            await notificationService.sendEmailVerification(email, otp);
        }

        res.status(200).json({ message: 'If registered, a reset code has been sent via email.' });
    } catch (error) {
        res.status(500).json({ error: 'Error processing request.' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await UserModel.getUserByEmail(email);
        if (!user) return res.status(404).json({ error: 'User not found.' });

        if (!user.otp_hash || new Date() > user.otp_expires_at) {
            return res.status(401).json({ error: 'OTP expired or invalid.' });
        }

        const isValid = await authService.verifyHash(otp, user.otp_hash);
        if (!isValid) return res.status(401).json({ error: 'Invalid verification code.' });

        const new_password_hash = await authService.hashData(newPassword);
        await UserModel.updatePasswordAndClearOtp(user.id, new_password_hash);

        res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Error resetting password.' });
    }
};

exports.updateFcmToken = async (req, res) => {
    try {
        const { fcm_token } = req.body;
        await UserModel.updateFcmToken(req.user.id, fcm_token);
        res.status(200).json({ message: 'FCM token updated.' });
    } catch (error) {
        logger.error(`FCM Update Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to update token.' });
    }
};

// ==========================================
// 4. SESSION MANAGEMENT
// ==========================================

// Endpoint to handle frontend session validation
exports.checkAuth = (req, res) => { res.status(200).json({ user: req.user }); };

// Clear the cookie to log the user out
exports.logout = (req, res) => {
    // --- UPDATED LOGOUT COOKIE PARAMS ---
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });
    res.status(200).json({ message: 'Logged out successfully.' });
};