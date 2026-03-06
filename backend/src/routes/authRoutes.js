const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateBodyFields } = require('../middlewares/validationMiddleware');
const { requireAuth } = require('../middlewares/authMiddleware');

// ==========================================
// 1. REGISTRATION & LOGIN
// ==========================================

// Step 1: Send OTPs to Email and Phone (temporarily caches email OTP)
router.post('/send-signup-otps',
    validateBodyFields(['email', 'phone']),
    authController.sendSignupOtps
);

// Step 2: Verify both OTPs and permanently create the User Profile
router.post('/verify-and-register',
    validateBodyFields(['email', 'phone', 'password', 'full_name', 'emailOtp', 'phoneOtp']),
    authController.verifyAndRegister
);

// Standard local login
// Note: Removed 'email' from validateBodyFields because the user might send 'phone' instead.
// The authController.login handles the missing email/phone logic gracefully.
router.post('/login',
    validateBodyFields(['password']),
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

router.put('/fcm-token',
    requireAuth,
    validateBodyFields(['fcm_token']),
    authController.updateFcmToken
);

// ==========================================
// 5. SESSION MANAGEMENT
// ==========================================

router.post('/logout', authController.logout);
router.get('/me', requireAuth, authController.checkAuth);

module.exports = router;