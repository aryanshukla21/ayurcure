import axiosInstance from './axiosConfig';

export const consultationApi = {
    // Fetch the Agora video call token for a specific appointment
    getCallToken: async (appointmentId) => {
        const response = await axiosInstance.get(`/api/consultations/token/${appointmentId}`);
        return response.data;
    }
};