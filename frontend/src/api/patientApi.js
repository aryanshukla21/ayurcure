import axiosInstance from './axiosConfig';

export const patientApi = {
    // // Fetch all data needed for the patient dashboard 
    // getDashboardData: async () => {
    //     // You can either hit a single aggregation endpoint or use Promise.all to fetch multiple
    //     const response = await axiosInstance.get('/api/patients/dashboard');
    //     return response.data;
    // },

    // getUpcomingAppointment: async () => {
    //     const response = await axiosInstance.get('/api/appointments/upcoming');
    //     return response.data;
    // },

    // getMedicalHistory: async () => {
    //     const response = await axiosInstance.get('/api/patients/medical-history');
    //     return response.data;
    // }

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
    getAppointment: async () => {
        const response = await axiosInstance.get('/api/patients/appointment/:id');
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
    updtaeDailyRoutine: async () => {
        const response = await axiosInstance.put('/api/patients/routine');
        return response.data;
    },

    // 11
    getCurrentRegimen: async () => {
        const response = await axiosInstance.get('/api/patients/regimen');
        return response.data;
    },

    // 12
    getWellnessTips: async () => {
        const response = await axiosInstance.get('/api/patients/wellness-tips');
        return response.data;
    }
};