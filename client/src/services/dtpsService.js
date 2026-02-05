import api from './api';

const dtpsService = {
    getScore: async (donorId) => {
        const response = await api.get(`/dtps/score/${donorId}`);
        return response.data;
    },
    calculateScore: async (donorId) => {
        const response = await api.get(`/dtps/calculate/${donorId}`);
        return response.data;
    }
};

export default dtpsService;
