import axiosInstance from './axiosConfig';

export const authApi = {
    // ==========================================
    // 1. REGISTRATION (2-Step Flow)
    // ==========================================
    sendSignupOtps: async (data) => {
        const response = await axiosInstance.post('/api/auth/send-signup-otps', data);
        return response.data;
    },
    verifyAndRegister: async (userData) => {
        const response = await axiosInstance.post('/api/auth/verify-and-register', userData);
        return response.data;
    },

    // ==========================================
    // 2. LOGIN & SSO
    // ==========================================
    login: async (credentials) => {
        const response = await axiosInstance.post('/api/auth/login', credentials);
        return response.data;
    },
    ssoLogin: async (data) => {
        const response = await axiosInstance.post('/api/auth/sso', data);
        return response.data;
    },

    // ==========================================
    // 3. PASSWORD & OTP MANAGEMENT
    // ==========================================
    verifyOtp: async (data) => {
        const response = await axiosInstance.post('/api/auth/verify-otp', data);
        return response.data;
    },
    resendOtp: async (data) => {
        const response = await axiosInstance.post('/api/auth/resend-otp', data);
        return response.data;
    },
    forgotPassword: async (email) => {
        const response = await axiosInstance.post('/api/auth/forgot-password', { email });
        return response.data;
    },
    resetPassword: async (data) => {
        const response = await axiosInstance.post('/api/auth/reset-password', data);
        return response.data;
    },

    // ==========================================
    // 4. SESSION MANAGEMENT
    // ==========================================
    logout: async () => {
        const response = await axiosInstance.post('/api/auth/logout');
        return response.data;
    },
    checkAuth: async () => {
        const response = await axiosInstance.get('/api/auth/me');
        return response.data;
    },

    // ==========================================
    // 5. EMAIL & PHONE VERIFICATION 
    // ==========================================
    requestEmailVerification: async (email) => {
        const response = await axiosInstance.post('/api/auth/email/request-verification', { email });
        return response.data;
    },
    verifyEmailToken: async (data) => {
        const response = await axiosInstance.post('/api/auth/email/verify-token', data);
        return response.data;
    },
    requestPhoneOTP: async (phone) => {
        const response = await axiosInstance.post('/api/auth/phone/request-otp', { phone });
        return response.data;
    },
    verifyPhoneOTP: async (data) => {
        const response = await axiosInstance.post('/api/auth/phone/verify-otp', data);
        return response.data;
    },

    // ==========================================
    // 6. ACCOUNT SECURITY
    // ==========================================
    setupSsoPassword: async (newPassword) => {
        const response = await axiosInstance.post('/api/auth/setup-sso-password', { newPassword });
        return response.data;
    },
    updateFcmToken: async (fcm_token) => {
        const response = await axiosInstance.put('/api/auth/fcm-token', { fcm_token });
        return response.data;
    }
};