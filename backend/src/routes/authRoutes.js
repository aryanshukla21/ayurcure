const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// Updated to use the correct filename found in your repository
const { validateBodyFields } = require('../middlewares/validationMiddleware');
const { requireAuth } = require('../middlewares/authMiddleware');

// ==========================================
// 1. REGISTRATION & LOGIN
// ==========================================

// Initial registration with basic details
router.post('/register',
    validateBodyFields(['email', 'password', 'full_name']),
    authController.register
);

// Standard local login
router.post('/login',
    validateBodyFields(['email', 'password']),
    authController.login
);

// Google SSO Login
router.post('/sso',
    validateBodyFields(['idToken']),
    authController.ssoLogin
);

// ==========================================
// 2. EMAIL VERIFICATION (TWILIO VERIFY + SENDGRID)
// ==========================================

// Request a third-party verification token to be sent via SendGrid
router.post('/email/request-verification',
    validateBodyFields(['email']),
    authController.requestEmailVerification
);

// Verify the code received via email
router.post('/email/verify-token',
    validateBodyFields(['email', 'token']),
    authController.verifyEmailToken
);

// Legacy/Internal OTP verification (if still needed for local flows)
router.post('/verify-otp',
    validateBodyFields(['email', 'otp']),
    authController.verifyOtp
);

// ==========================================
// 3. PHONE VERIFICATION (TWILIO VERIFY SMS)
// ==========================================

// Request SMS OTP
router.post('/phone/request-otp',
    validateBodyFields(['phone']),
    authController.requestPhoneOTP
);

// Verify SMS OTP - Requires Auth to link to the correct user profile
router.post('/phone/verify-otp',
    requireAuth,
    validateBodyFields(['phone', 'otp']),
    authController.verifyPhoneOTP
);

// ==========================================
// 4. PASSWORD MANAGEMENT
// ==========================================

router.post('/resend-otp', authController.resendOtp);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// Specifically for SSO users establishing a password for the first time
router.post('/setup-sso-password',
    requireAuth,
    validateBodyFields(['newPassword']),
    authController.setupSsoPassword
);

module.exports = router;