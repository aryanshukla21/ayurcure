// frontend/src/api/ecommerceApi.js
import apiClient from './axiosClient';

// Public routes
export const getAllProducts = (params) => apiClient.get('/ecommerce/products', { params });
export const getProductDetails = (id) => apiClient.get(`/ecommerce/products/${id}`);

// Patient protected routes
export const toggleWishlist = (productId) => apiClient.post('/ecommerce/wishlist/toggle', { productId });
export const getWishlist = () => apiClient.get('/ecommerce/wishlist');
export const placeOrder = (orderData) => apiClient.post('/ecommerce/orders', orderData);
export const getUserOrders = () => apiClient.get('/ecommerce/orders');
export const verifyPayment = (paymentDetails) => apiClient.post('/ecommerce/orders/verify-payment', paymentDetails);