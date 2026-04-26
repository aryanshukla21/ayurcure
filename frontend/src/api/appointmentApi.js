import axiosInstance from './axiosConfig';

export const appointmentApi = {
    // --- APPOINTMENT LISTS ---
    getAll: async () => (await axiosInstance.get('/api/appointment/all-appointment')).data,
    getUpcoming: async () => (await axiosInstance.get('/api/appointment/upcoming-appointment')).data,
    getCompleted: async () => (await axiosInstance.get('/api/appointment/completed-appointment')).data,
    getCancelled: async () => (await axiosInstance.get('/api/appointment/cancelled-appointment')).data,
    getThisMonth: async () => (await axiosInstance.get('/api/appointment/this-month')).data,
    filterByDoctor: async (docName) => (await axiosInstance.get(`/api/appointment/filter/doctor-name=${docName}`)).data,
    getAyurvedicInsight: async () => (await axiosInstance.get('/api/appointment/ayurvedic-insight')).data,
    getPrepInstructions: async () => (await axiosInstance.get('/api/appointment/prepare-for-your-next-visit')).data,

    // --- APPOINTMENT DETAILS (:id) ---
    getActions: async (id) => (await axiosInstance.get(`/api/appointment/${id}/actions`)).data,
    getSymptoms: async (id) => (await axiosInstance.get(`/api/appointment/${id}/your-symptoms-and-notes`)).data,
    getPractitionerInfo: async (id) => (await axiosInstance.get(`/api/appointment/${id}/practitioner-info`)).data,
    getDocuments: async (id) => (await axiosInstance.get(`/api/appointment/${id}/related-documents`)).data,
    downloadDocument: async (id) => (await axiosInstance.get(`/api/appointment/${id}/related-documents/download`, { responseType: 'blob' })).data,

    // --- BOOK APPOINTMENT ---
    getAllPractitioners: async () => (await axiosInstance.get('/api/book-appointment/view-all-practitioners')).data,
    filterPractitioners: async (filters) => (await axiosInstance.get('/api/book-appointment/view-all-practitioners/filter', { params: filters })).data,
    searchPractitioners: async (docName) => (await axiosInstance.get(`/api/book-appointment/view-all-practitioners/search=${docName}`)).data,
    selectPractitioner: async (docId) => (await axiosInstance.get(`/api/book-appointment/view-all-practitioners/select/${docId}`)).data,
    getAvailableSlots: async (docId, date) => (await axiosInstance.get(`/api/book-appointment/view-all-practitioners/select/${docId}/available-slots`, { params: { date } })).data,
    getBookingSummary: async (docId) => (await axiosInstance.get(`/api/book-appointment/view-all-practitioners/select/${docId}/appointment-summary`)).data,
    getPrakritiAnalysis: async () => (await axiosInstance.get('/api/book-appointment/prakriti-analysis')).data,

    // --- PRESCRIPTIONS ---
    getAllPrescriptions: async () => (await axiosInstance.get('/api/prescription/all-prescriptions')).data,
    downloadPrescriptionPdf: async (id) => (await axiosInstance.get(`/api/prescription/all-prescription/${id}/view-pdf`, { responseType: 'blob' })).data,
    getAutomatedRefills: async () => (await axiosInstance.get('/api/prescription/automated-refills')).data,
    getExpertConsultation: async () => (await axiosInstance.get('/api/prescription/expert-consultation')).data,
};