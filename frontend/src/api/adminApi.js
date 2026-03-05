// frontend/src/api/adminApi.js
import apiClient from './axiosClient';

export const getAdminStats = () => apiClient.get('/admin/stats');
export const getAllUsers = () => apiClient.get('/admin/users');
export const banUser = (id, data) => apiClient.put(`/admin/users/${id}/ban`, data);
export const getPendingDoctors = () => apiClient.get('/admin/doctors/pending');
export const verifyDoctor = (id, decision) => apiClient.put(`/admin/doctors/${id}/verify`, decision);
export const sendBroadcast = (notification) => apiClient.post('/admin/broadcast', notification);