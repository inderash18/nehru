import api from './api';

const donorService = {
    scheduleAppointment: async (appointmentData) => {
        const response = await api.post('/donor/appointments', appointmentData);
        return response.data;
    },
    getMyAppointments: async () => {
        const response = await api.get('/donor/appointments');
        return response.data;
    },
    getProfile: async () => {
        const response = await api.get('/donor/profile');
        return response.data;
    },
    getStats: async () => {
        const response = await api.get('/donor/stats');
        return response.data;
    }
};

export default donorService;
