import { apiClient } from './axiosClient';

export const getExpertPractitioners = async () => {
    try {
        const response = await apiClient.get('/doctors');
        return response.data.doctors || [];
    } catch (error) {
        return [];
    }
};