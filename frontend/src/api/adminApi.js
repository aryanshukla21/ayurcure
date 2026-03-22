import axiosInstance from './axiosConfig';

export const adminApi = {
    // Get dashboard statistics
    getStats: async () => {
        const response = await axiosInstance.get('/api/admin/stats');
        return response.data;
    },

    // Get a list of all users
    getAllUsers: async () => {
        const response = await axiosInstance.get('/api/admin/users');
        return response.data;
    },

    // Update a user's ban status
    // Expected status: e.g., 'Banned', 'Active'
    banUser: async (userId, status, reason) => {
        const response = await axiosInstance.put(`/api/admin/users/${userId}/ban`, {
            status,
            reason
        });
        return response.data;
    },

    // Get a list of doctors pending verification
    getPendingDoctors: async () => {
        const response = await axiosInstance.get('/api/admin/doctors/pending');
        return response.data;
    },

    // Verify or reject a doctor's application
    // Expected status: e.g., 'Verified', 'Rejected'
    verifyDoctor: async (doctorId, status, comments) => {
        const response = await axiosInstance.put(`/api/admin/doctors/${doctorId}/verify`, {
            status,
            comments
        });
        return response.data;
    },

    // Send a broadcast notification (Health reminders, promos, etc.)
    sendBroadcastNotification: async (broadcastData) => {
        // broadcastData should contain: { topic, title, body }
        const response = await axiosInstance.post('/api/admin/broadcast', broadcastData);
        return response.data;
    }
};