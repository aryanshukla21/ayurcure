import axiosInstance from './axiosConfig';

export const authApi = {
    // ==========================================
    // 1. REGISTRATION (2-Step Flow)
    // ==========================================

    // Step 1: Send OTPs to Email and Phone
    sendSignupOtps: async (data) => {
        // Expected data: { email, phone }
        const response = await axiosInstance.post('/api/auth/send-signup-otps', data);
        return response.data;
    },

    // Step 2: Verify both OTPs and Register
    verifyAndRegister: async (userData) => {
        // Expected userData: { email, phone, password, full_name, emailOtp, phoneOtp }
        const response = await axiosInstance.post('/api/auth/verify-and-register', userData);
        return response.data;
    },

    // ==========================================
    // 2. LOGIN & SSO
    // ==========================================

    login: async (credentials) => {
        // Expected credentials: { password } (authController handles missing email/phone logic)
        const response = await axiosInstance.post('/api/auth/login', credentials);
        return response.data;
    },

    ssoLogin: async (data) => {
        // Expected data: { idToken }
        const response = await axiosInstance.post('/api/auth/sso', data);
        return response.data;
    },

    // ==========================================
    // 3. PASSWORD & OTP MANAGEMENT
    // ==========================================

    verifyOtp: async (data) => {
        // Expected data: { email, otp }
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
        // Validates the current session/token and returns user info
        const response = await axiosInstance.get('/api/auth/me');
        return response.data;
    }
};