import axiosInstance from './axiosConfig';

export const appointmentApi = {
    // Original book appointment
    bookAppointment: async (appointmentData) => {
        const response = await axiosInstance.post('/api/appointments/book', appointmentData);
        return response.data;
    },
    // Alias to match the updated BookAppointmentPage.jsx frontend call
    createAppointment: async (appointmentData) => {
        const response = await axiosInstance.post('/api/appointments/book', appointmentData);
        return response.data;
    },
    addPrescription: async (appointmentId, prescriptionData) => {
        const response = await axiosInstance.post(`/api/appointments/${appointmentId}/prescription`, prescriptionData);
        return response.data;
    },
    updateStatus: async (appointmentId, statusData) => {
        const response = await axiosInstance.put(`/api/appointments/${appointmentId}/status`, statusData);
        return response.data;
    },
    addReview: async (appointmentId, reviewData) => {
        const response = await axiosInstance.post(`/api/appointments/${appointmentId}/review`, reviewData);
        return response.data;
    }
};