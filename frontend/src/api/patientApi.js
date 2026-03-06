// frontend/src/api/patientApi.js
import apiClient from './axiosClient';

// ==========================================
// EXISTING PATIENT APIs
// ==========================================
export const completeOnboarding = (data) => apiClient.post('/patients/onboarding', data);
export const getPatientDashboard = () => apiClient.get('/patients/dashboard');
export const updatePrakriti = (assessmentData) => apiClient.post('/patients/prakriti-assessment', assessmentData);
export const getPatientProfile = () => apiClient.get('/patients/profile');
export const addHealthLogs = (logs) => apiClient.post('/patients/health-logs', logs);
export const getPatientAppointments = () => apiClient.get('/patients/all-appointments');

// ==========================================
// NEW OVERVIEW & ROUTINE APIs
// ==========================================

// Fetches the most recent health statistics (Weight, Sleep, BP, Dosha)
export const getHealthStats = () => apiClient.get('/patients/health-stats');

// Fetches the current active medicine regimen
export const getCurrentRegimen = () => apiClient.get('/patients/regimen');

// Fetches a dynamic wellness tip
export const getWellnessTip = () => apiClient.get('/patients/wellness-tip');

// Fetches the patient's daily Dincharya (Morning, Afternoon, Evening, Night)
export const getDailyRoutine = () => apiClient.get('/patients/routine');

// Updates the patient's daily Dincharya
export const updateDailyRoutine = (data) => apiClient.put('/patients/routine', data);