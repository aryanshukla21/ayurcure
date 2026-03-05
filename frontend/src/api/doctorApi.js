// frontend/src/api/doctorApi.js
import apiClient from './axiosClient';

// Public route to search doctors
export const searchDoctors = (params) => apiClient.get('/doctors', { params });

// Protected Doctor routes
export const submitDoctorProfile = (profileData) => apiClient.post('/doctors/apply', profileData);
export const getDoctorProfile = () => apiClient.get('/doctors/profile');
export const updateAvailability = (availability) => apiClient.post('/doctors/availability', availability);
export const addMedicalArticle = (article) => apiClient.post('/doctors/articles', article);
export const getDoctorAppointments = () => apiClient.get('/doctors/all-appointments');