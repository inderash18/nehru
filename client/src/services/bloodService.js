import api from './api';

const bloodService = {
    getBloodStock: async () => {
        const response = await api.get('/public/blood-stock');
        return response.data;
    },
    getAlerts: async () => {
        const response = await api.get('/public/alerts');
        return response.data;
    },
    getStats: async () => {
        const response = await api.get('/public/stats');
        return response.data;
    },
    updateInventory: async (data) => {
        const response = await api.post('/blood/inventory', data);
        return response.data;
    },
    getInventory: async () => {
        const response = await api.get('/blood/inventory');
        return response.data;
    },
    getMyDonations: async () => {
        const response = await api.get('/blood/donations');
        return response.data;
    }
};

export default bloodService;
