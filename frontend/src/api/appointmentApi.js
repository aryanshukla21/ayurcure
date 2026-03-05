// frontend/src/api/appointmentApi.js
import apiClient from './axiosClient';

export const getAppointments = () => apiClient.get('/appointments');
export const bookAppointment = (bookingData) => apiClient.post('/appointments/book', bookingData);
export const addPrescription = (id, prescriptionData) => apiClient.post(`/appointments/${id}/prescription`, prescriptionData);
export const updateAppointmentStatus = (id, status) => apiClient.put(`/appointments/${id}/status`, { status });
export const submitReview = (id, reviewData) => apiClient.post(`/appointments/${id}/review`, reviewData);