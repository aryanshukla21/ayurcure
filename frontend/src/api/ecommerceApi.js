import axiosInstance from './axiosConfig';

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

    getWishlist: async () => {
        const response = await axiosInstance.get(`/api/ecommerce/wishlist`);
        return response.data;
    },

    toggleWishlist: async (wishlistData) => {
        // wishlistData should contain the product ID to toggle: { productId }
        const response = await axiosInstance.post(`/api/ecommerce/wishlist/toggle`, wishlistData);
        return response.data;
    },

    placeOrder: async (orderData) => {
        // orderData should contain cart items, shipping details, etc.
        const response = await axiosInstance.post(`/api/ecommerce/orders`, orderData);
        return response.data;
    },

    getUserOrders: async () => {
        const response = await axiosInstance.get(`/api/ecommerce/orders`);
        return response.data;
    },

    verifyPayments: async (paymentData) => {
        // Changed to POST. paymentData should contain { razorpay_order_id, razorpay_payment_id, razorpay_signature } or similar.
        const response = await axiosInstance.post(`/api/ecommerce/orders/verify-payment`, paymentData);
        return response.data;
    },
};