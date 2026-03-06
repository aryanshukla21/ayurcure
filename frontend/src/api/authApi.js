import apiClient from './axiosClient';

// ==========================================
// REGISTRATION (2-Step Flow)
// ==========================================
export const sendSignupOtps = (userData) => apiClient.post('/auth/send-signup-otps', userData);
export const verifyAndRegister = (verificationData) => apiClient.post('/auth/verify-and-register', verificationData);

// ==========================================
// LOGIN & SSO
// ==========================================
export const loginUser = (credentials) => apiClient.post('/auth/login', credentials);
export const googleLogin = (idToken) => apiClient.post('/auth/sso', { idToken });

// ==========================================
// EMAIL & PHONE VERIFICATION (Manual triggers)
// ==========================================
export const requestEmailVerification = (email) => apiClient.post('/auth/email/request-verification', { email });
export const verifyEmailToken = (data) => apiClient.post('/auth/email/verify-token', data);

export const requestPhoneOTP = (phone) => apiClient.post('/auth/phone/request-otp', { phone });
export const verifyPhoneOTP = (data) => apiClient.post('/auth/phone/verify-otp', data);

// ==========================================
// PASSWORD MANAGEMENT
// ==========================================
export const forgotPassword = (email) => apiClient.post('/auth/forgot-password', { email });
export const resetPassword = (data) => apiClient.post('/auth/reset-password', data);
export const setupSsoPassword = (newPassword) => apiClient.post('/auth/setup-sso-password', { newPassword });

// ==========================================
// SESSION MANAGEMENT (Cookies)
// ==========================================
export const logoutUser = () => apiClient.post('/auth/logout');
export const checkAuthStatus = () => apiClient.get('/auth/me');