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

    toggleWishlist: async (productId) => {
        // Send as productId so it aligns smoothly with component logic
        const response = await axiosInstance.post(`/api/ecommerce/wishlist/toggle`, { productId });
        return response.data;
    },

    placeOrder: async (orderData) => {
        // Expected: { items: [{product_id, quantity, price}], total_amount, discount_applied, shipping_address, payment_method }
        const response = await axiosInstance.post(`/api/ecommerce/orders`, orderData);
        return response.data;
    },

    getUserOrders: async () => {
        const response = await axiosInstance.get(`/api/ecommerce/orders`);
        return response.data;
    },

    // NEW: Get details and items of a specific order
    getOrderDetails: async (orderId) => {
        const response = await axiosInstance.get(`/api/ecommerce/orders/${orderId}`);
        return response.data;
    },

    verifyPayments: async (paymentData) => {
        // Expected: { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id }
        const response = await axiosInstance.post(`/api/ecommerce/orders/verify-payment`, paymentData);
        return response.data;
    },
};