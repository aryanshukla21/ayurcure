import axiosInstance from './axiosConfig';

export const adminApi = {
    getStats: async () => (await axiosInstance.get('/api/admin/stats')).data,
    getAllUsers: async () => (await axiosInstance.get('/api/admin/users')).data,
    banUser: async (userId, status, reason) => (await axiosInstance.put(`/api/admin/users/${userId}/ban`, { status, reason })).data,

    getAdmins: async () => (await axiosInstance.get('/api/admin/admins')).data,
    createAdmin: async (adminData) => (await axiosInstance.post('/api/admin/admins', adminData)).data,

    getAllDoctors: async () => (await axiosInstance.get('/api/admin/doctors')).data,
    getPendingDoctors: async () => (await axiosInstance.get('/api/admin/doctors/pending')).data,
    verifyDoctor: async (doctorId, status, comments) => (await axiosInstance.put(`/api/admin/doctors/${doctorId}/verify`, { status, comments })).data,

    getAllOrders: async () => (await axiosInstance.get('/api/admin/orders')).data,
    getReportData: async () => (await axiosInstance.get('/api/admin/reports')).data,

    getAllBlogs: async () => (await axiosInstance.get('/api/admin/blogs')).data,
    getBlogById: async (blogId) => (await axiosInstance.get(`/api/admin/blogs/${blogId}`)).data,
    createBlog: async (blogData) => (await axiosInstance.post('/api/admin/blogs', blogData)).data,
    updateBlog: async (blogId, blogData) => (await axiosInstance.put(`/api/admin/blogs/${blogId}`, blogData)).data,
    deleteBlog: async (blogId) => (await axiosInstance.delete(`/api/admin/blogs/${blogId}`)).data,

    sendBroadcastNotification: async (broadcastData) => (await axiosInstance.post('/api/admin/broadcast', broadcastData)).data
};