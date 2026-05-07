import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    withCredentials: true, // It tells browser to send the HttpOnly cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // ==========================================
        // 1. DEVELOPER CONSOLE LOGGING (Global)
        // ==========================================
        // import.meta.env.DEV is Vite's way of checking if we are in development mode
        if (import.meta.env.DEV) {
            console.groupCollapsed(`🚨 API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`);
            console.error('Status:', error.response?.status || 'Network Error');

            // Safely parse the payload sent to the server
            if (error.config?.data) {
                try {
                    console.error('Payload Sent:', JSON.parse(error.config.data));
                } catch {
                    console.error('Payload Sent:', error.config.data);
                }
            }

            console.error('Server Error Message:', error.response?.data?.error || error.message);

            // If the backend sent a stack trace (500 error), print it so you know exactly which backend file crashed
            if (error.response?.data?.stack) {
                console.error('Backend Stack Trace:\n', error.response.data.stack);
            }
            console.groupEnd();
        }

        // ==========================================
        // 2. STANDARDIZE THE ERROR MESSAGE FOR THE UI
        // ==========================================
        // No matter what the backend sends (error, message, or a hard crash),
        // we extract the best readable string and attach it to `error.customMessage`
        error.customMessage =
            error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            "An unexpected error occurred.";

        // ==========================================
        // 3. GLOBAL 401 UNAUTHORIZED HANDLING
        // ==========================================
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('role');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;