import { io } from 'socket.io-client';

const socket = io('http://localhost:8000', {
    path: '/socket.io',
    autoConnect: false
});

export const connectSocket = () => socket.connect();
export const disconnectSocket = () => socket.disconnect();
export const getSocket = () => socket;

export default socket;
