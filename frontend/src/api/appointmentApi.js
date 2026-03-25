import axiosInstance from './axiosConfig';

export const appointmentApi = {
    // Book a new appointment
    // Expected data: { doctor_id, scheduled_at, mode }
    bookAppointment: async (appointmentData) => {
        const response = await axiosInstance.post('/api/appointments/book', appointmentData);
        return response.data;
    },

    // Add a prescription to an existing appointment
    // Expected prescriptionData: { herbs_prescribed: [...] }
    addPrescription: async (appointmentId, prescriptionData) => {
        const response = await axiosInstance.post(`/api/appointments/${appointmentId}/prescription`, prescriptionData);
        return response.data;
    },

    // Update the status of an appointment (e.g., 'Completed', 'Cancelled')
    // Expected statusData: { status: 'New Status' }
    updateStatus: async (appointmentId, statusData) => {
        const response = await axiosInstance.put(`/api/appointments/${appointmentId}/status`, statusData);
        return response.data;
    },

    // Add a review/rating after an appointment
    // Expected reviewData: { rating: number, comment?: string }
    addReview: async (appointmentId, reviewData) => {
        const response = await axiosInstance.post(`/api/appointments/${appointmentId}/review`, reviewData);
        return response.data;
    }
};