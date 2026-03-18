export const ecommerceApi = {
    // Fetch products with optional filters (category, search, prakriti)
    getProducts: async (params = {}) => {
        const response = await axiosInstance.get('/api/ecommerce/products', { params });
        return response.data;
    },
    getProductDetails: async (id) => {
        const response = await axiosInstance.get(`/api/ecommerce/products/${id}`);
        return response.data;
    }
};