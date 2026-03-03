const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateBodyFields } = require('../middlewares/validateRequest');

// Add validation to ensure essential fields are provided before processing the request
router.post('/register', validateBodyFields(['email', 'password', 'full_name']), authController.register);
router.post('/login', validateBodyFields(['email', 'password']), authController.login);
router.post('/sso', validateBodyFields(['idToken']), authController.ssoLogin);
router.post('/verify-otp', validateBodyFields(['email', 'otp']), authController.verifyOtp);

router.post('/resend-otp', authController.resendOtp);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;