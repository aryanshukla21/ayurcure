// frontend/src/api/authApi.js
import apiClient from './axiosClient';

export const registerUser = (userData) => apiClient.post('/auth/register', userData);
export const loginUser = (credentials) => apiClient.post('/auth/login', credentials);
export const googleLogin = (idToken) => apiClient.post('/auth/sso', { idToken });

export const requestEmailVerification = (email) => apiClient.post('/auth/email/request-verification', { email });
export const verifyEmailToken = (data) => apiClient.post('/auth/email/verify-token', data);

export const requestPhoneOTP = (phone) => apiClient.post('/auth/phone/request-otp', { phone });
export const verifyPhoneOTP = (data) => apiClient.post('/auth/phone/verify-otp', data);

export const forgotPassword = (email) => apiClient.post('/auth/forgot-password', { email });
export const resetPassword = (data) => apiClient.post('/auth/reset-password', data);
export const setupSsoPassword = (newPassword) => apiClient.post('/auth/setup-sso-password', { newPassword });