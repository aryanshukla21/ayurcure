// frontend/src/api/patientApi.js
import apiClient from './axiosClient';

export const completeOnboarding = (data) => apiClient.post('/patients/onboarding', data);
export const getPatientDashboard = () => apiClient.get('/patients/dashboard');
export const updatePrakriti = (assessmentData) => apiClient.post('/patients/prakriti-assessment', assessmentData);
export const getPatientProfile = () => apiClient.get('/patients/profile');
export const addHealthLogs = (logs) => apiClient.post('/patients/health-logs', logs);
export const getPatientAppointments = () => apiClient.get('/patients/all-appointments');