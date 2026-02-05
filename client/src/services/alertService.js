import api from './api';

const alertService = {
    broadcastEmergency: async (alertData) => {
        const response = await api.post('/alert/broadcast', alertData);
        return response.data;
    },
    getActiveAlerts: async () => {
        const response = await api.get('/alert/active');
        return response.data;
    }
};

export default alertService;
