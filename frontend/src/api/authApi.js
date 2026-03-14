import axiosInstance from './axiosConfig';

export const authApi = {
    login: async (credentials) => {
        // credentials now include { identifier, password, role }
        const response = await axiosInstance.post('/auth/login', credentials);
        return response.data;
    },

    register: async (userData) => {
        // userData includes { first_name, last_name, email, password, role, etc. }
        const response = await axiosInstance.post('/auth/register', userData);
        return response.data;
    },

    verifyOtp: async (data) => {
        const response = await axiosInstance.post('/auth/verify-otp', data);
        return response.data;
    },

    forgotPassword: async (email) => {
        const response = await axiosInstance.post('/auth/forgot-password', { email });
        return response.data;
    },

    resetPassword: async (data) => {
        const response = await axiosInstance.post('/auth/reset-password', data);
        return response.data;
    }
};