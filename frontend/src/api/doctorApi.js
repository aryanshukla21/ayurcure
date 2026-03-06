import apiClient from './axiosClient';

// Public route to search doctors
export const searchDoctors = (params) => apiClient.get('/doctors', { params });

// Protected Doctor routes
export const submitDoctorProfile = (profileData) => apiClient.post('/doctors/apply', profileData);
export const getDoctorProfile = () => apiClient.get('/doctors/profile');
export const updateAvailability = (availability) => apiClient.post('/doctors/availability', availability);
export const addMedicalArticle = (article) => apiClient.post('/doctors/articles', article);
export const getDoctorAppointments = () => apiClient.get('/doctors/all-appointments');

// --- ADD THESE NEW APIS ---
// Fetch specific appointment details
export const getDoctorAppointmentDetails = (id) => apiClient.get(`/doctors/appointments/${id}`);
// Fetch a specific patient's profile (for the doctor viewing their patient)
export const getPatientProfileForDoctor = (patientId) => apiClient.get(`/doctors/patient-profile/${patientId}`);