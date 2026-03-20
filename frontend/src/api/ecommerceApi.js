export const ecommerceApi = {
    // Fetch products with optional filters (category, search, prakriti)
    getProducts: async (params = {}) => {
        const response = await axiosInstance.get('/api/ecommerce/products', { params });
        return response.data;
    },
    getProductDetails: async (id) => {
        const response = await axiosInstance.get(`/api/ecommerce/products/${id}`);
        return response.data;
    },
    getWishlist: async (id) => {
        const response = await axiosInstance.get(`/api/ecommerce/wishlist`);
        return response.data;
    },
    toggleWishlist: async (id) => {
        const response = await axiosInstance.post(`/api/ecommerce/wishlist/toggle`);
        return response.data;
    },
    placeOrder: async (id) => {
        const response = await axiosInstance.post(`/api/ecommerce/orders`);
        return response.data;
    },
    getUserOrders: async (id) => {
        const response = await axiosInstance.get(`/api/ecommerce/orders`);
        return response.data;
    },
    verifyPayments: async (id) => {
        const response = await axiosInstance.get(`/api/ecommerce/orders/verify-payment`);
        return response.data;
    },
};