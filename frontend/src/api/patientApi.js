import axiosInstance from './axiosConfig';

export const patientApi = {
    // 1
    getcompletePatientProfile: async () => {
        const response = await axiosInstance.post('/api/patients/onboarding');
        return response.data;
    },

    // 2
    getDashboard: async () => {
        const response = await axiosInstance.get('/api/patients/dashboard');
        return response.data;
    },

    // 3
    updatePrakriti: async () => {
        const response = await axiosInstance.post('/api/patients/prakriti-assessment');
        return response.data;
    },

    // 4
    getProfile: async () => {
        const response = await axiosInstance.get('/api/patients/profile');
        return response.data;
    },

    // 5
    addHealthLogs: async () => {
        const response = await axiosInstance.post('/api/patients/health-logs');
        return response.data;
    },

    // 6
    getAllAppointments: async () => {
        const response = await axiosInstance.get('/api/patients/all-appointments');
        return response.data;
    },

    // 7
    getAppointment: async (id) => {
        const response = await axiosInstance.get(`/api/patients/appointment/${id}`);
        return response.data;
    },

    // 8
    getHealthStats: async () => {
        const response = await axiosInstance.get('/api/patients/health-stats');
        return response.data;
    },

    // 9
    getDailyRoutine: async () => {
        const response = await axiosInstance.get('/api/patients/routine');
        return response.data;
    },

    // 10
    updateDailyRoutine: async (routineData) => {
        const response = await axiosInstance.put('/api/patients/routine', routineData);
        return response.data;
    },

    // 11
    getCurrentRegimen: async () => {
        const response = await axiosInstance.get('/api/patients/regimen');
        return response.data;
    },

    // 12
    getWellnessTip: async () => {
        const response = await axiosInstance.get('/api/patients/wellness-tip');
        return response.data;
    },

    // 13 Update existing profile details
    updateProfile: async (profileData) => {
        const response = await axiosInstance.put('/api/patients/profile', profileData);
        return response.data;
    },

    // 14 Retrieve historical health logs
    getHealthLogs: async () => {
        const response = await axiosInstance.get('/api/patients/health-logs');
        return response.data;
    },

    getDocuments: async () => {
        const response = await axiosInstance.get('/api/patients/documents');
        return response.data;
    },
    uploadDocument: async (formData) => {
        // Must pass headers for file uploads
        const response = await axiosInstance.post('/api/patients/documents', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    // ---User Settings ---
    getSettings: async () => {
        const response = await axiosInstance.get('/api/patients/settings');
        return response.data;
    },
    updateSettings: async (settingsData) => {
        const response = await axiosInstance.put('/api/patients/settings', settingsData);
        return response.data;
    }
};