import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    withCredentials: true, // THIS IS CRITICAL: It tells browser to send the HttpOnly cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

// Remove the request interceptor entirely! We don't need to manually attach Bearer tokens.

// Keep your response interceptor to handle global 401 logouts
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
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