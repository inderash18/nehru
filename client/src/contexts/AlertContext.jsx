import { createContext, useContext, useState } from 'react';

const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);

    const addAlert = (alert) => {
        setAlerts(prev => [alert, ...prev]);
    };

    const clearAlert = (id) => {
        setAlerts(prev => prev.filter(a => a.id !== id));
    };

    return (
        <AlertContext.Provider value={{ alerts, addAlert, clearAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlerts = () => useContext(AlertContext);
