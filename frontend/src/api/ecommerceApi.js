import axiosInstance from './axiosConfig';

export const ecommerceApi = {
    // --- PHARMACY STORE ---
    getAllProducts: async () => (await axiosInstance.get('/api/pharmacy-store/all')).data,
    getHerbalSupplements: async () => (await axiosInstance.get('/api/pharmacy-store/herbal-suppliments')).data,
    getDigestiveCare: async () => (await axiosInstance.get('/api/pharmacy-store/digestive-care')).data,
    getImmunityBoosters: async () => (await axiosInstance.get('/api/pharmacy-store/immunity-booster')).data,
    getSkinCare: async () => (await axiosInstance.get('/api/pharmacy-store/skin-care')).data,
    getWellnessProducts: async () => (await axiosInstance.get('/api/pharmacy-store/wellness-products')).data,
    getProductDetails: async (id) => (await axiosInstance.get(`/api/pharmacy-store/product/${id}/details`)).data,

    // --- PHARMACY ORDERS ---
    getInProgressOrders: async () => (await axiosInstance.get('/api/pharmacy-orders/orders/in-progress')).data,
    getShippedToday: async () => (await axiosInstance.get('/api/pharmacy-orders/orders/shipped-today')).data,
    getTotalSpent: async () => (await axiosInstance.get('/api/pharmacy-orders/orders/total-spent')).data,
    getOrderHistory: async () => (await axiosInstance.get('/api/pharmacy-orders/order-history')).data,
    filterOrderHistory: async (status, sort) => (await axiosInstance.get(`/api/pharmacy-orders/order-history/filter/status=${status}-sort-by=${sort}`)).data,
    getRefillReminder: async () => (await axiosInstance.get('/api/pharmacy-orders/refill-reminder')).data,
    getAssistanceInfo: async () => (await axiosInstance.get('/api/pharmacy-orders/need-assistance')).data,
    exportOrderHistory: async () => (await axiosInstance.get('/api/pharmacy-orders/order-history/export-all', { responseType: 'blob' })).data,

    // --- ORDER DETAILS (:id) ---
    getOrderDetails: async (id) => (await axiosInstance.get(`/api/order/${id}/order-details`)).data,
    getOrderedProducts: async (id) => (await axiosInstance.get(`/api/order/${id}/ordered-products`)).data,
    getDeliveryStatus: async (id) => (await axiosInstance.get(`/api/order/${id}/delivery-projects`)).data, // Keeping your spelling
    getPaymentSummary: async (id) => (await axiosInstance.get(`/api/order/${id}/payment-summary`)).data,
    downloadInvoice: async (id) => (await axiosInstance.get(`/api/order/${id}/download-invoice`, { responseType: 'blob' })).data,
    getOrderWellnessTip: async (id) => (await axiosInstance.get(`/api/order/${id}/wellness-tip`)).data,

    // --- CART ---
    getCartProductDetails: async () => (await axiosInstance.get('/api/cart/product-details')).data,
    getCartOrderSummary: async () => (await axiosInstance.get('/api/cart/order-summary')).data,
    applyPromoCode: async (code) => (await axiosInstance.post('/api/cart/apply-promo-code', { code })).data,
};