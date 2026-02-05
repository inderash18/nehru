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
    updateInventory: async (data) => {
        const response = await api.post('/blood/inventory', data);
        return response.data;
    }
};

export default bloodService;
