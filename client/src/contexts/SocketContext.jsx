import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://127.0.0.1:8000';
        console.log('Connecting to socket at:', socketUrl);

        const newSocket = io(socketUrl, {
            path: '/socket.io',
            transports: ['websocket'],
            autoConnect: true,
            reconnection: true
        });

        newSocket.on('connect', () => console.log('Socket connected! ID:', newSocket.id));
        newSocket.on('connect_error', (err) => console.error('Socket connection error:', err));

        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
