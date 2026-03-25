import axiosInstance from './axiosConfig';

export const doctorApi = {
    // ==========================================
    // PUBLIC ROUTES
    // ==========================================
    searchDoctors: async (queryParams = '') => {
        // queryParams could be '?specialty=Ayurveda' etc.
        const response = await axiosInstance.get(`/api/doctors${queryParams}`);
        return response.data;
    },

    getDoctorSlots: async (doctorId, date) => {
        // Expected date format: 'YYYY-MM-DD'
        const response = await axiosInstance.get(`/api/doctors/${doctorId}/slots?date=${date}`);
        return response.data;
    },

    // ==========================================
    // PROTECTED ROUTES
    // ==========================================
    getProfile: async () => {
        const response = await axiosInstance.get('/api/doctors/profile');
        return response.data;
    },

    submitProfile: async (profileData) => {
        const response = await axiosInstance.post('/api/doctors/apply', profileData);
        return response.data;
    },

    updateAvailability: async (availabilityData) => {
        const response = await axiosInstance.post('/api/doctors/availability', availabilityData);
        return response.data;
    },

    addArticle: async (articleData) => {
        const response = await axiosInstance.post('/api/doctors/articles', articleData);
        return response.data;
    },

    getAllAppointments: async () => {
        const response = await axiosInstance.get('/api/doctors/all-appointments');
        return response.data;
    },

    getAppointment: async (id) => {
        const response = await axiosInstance.get(`/api/doctors/appointments/${id}`);
        return response.data;
    },

    getPatientProfile: async (patientId) => {
        const response = await axiosInstance.get(`/api/doctors/patient-profile/${patientId}`);
        return response.data;
    },

    getDashboardStats: async () => {
        const response = await axiosInstance.get('/api/doctors/stats');
        return response.data;
    },

    getDashboardData: async () => {
        const response = await axiosInstance.get('/api/doctors/dashboard-data');
        return response.data;
    },

    getPayoutDashboard: async () => {
        const response = await axiosInstance.get('/api/doctors/payouts');
        return response.data;
    }
};