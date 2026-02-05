import { useState, useEffect } from 'react';
import BloodStockCard from '../components/public/BloodStockCard';
import LiveMap from '../components/public/LiveMap';
import bloodService from '../services/bloodService';
import api from '../services/api';
import { useSocket } from '../contexts/SocketContext';
import { Search, MapPin, Activity, AlertTriangle, Users } from 'lucide-react';

const PublicDashboard = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const socket = useSocket();

    useEffect(() => {
        fetchStocks();

        // Poll for updates every 3 seconds to reflect DB changes immediately
        const interval = setInterval(fetchStocks, 3000);

        if (socket) {
            socket.emit('subscribe_to_stock'); // Ensure we join the room if using sockets too
            socket.on('stock_update', handleStockUpdate);
            // return cleanup includes clearing interval and socket off
            return () => {
                clearInterval(interval);
                socket.off('stock_update', handleStockUpdate);
            };
        }

        return () => clearInterval(interval);
    }, [socket]);

    const [locationsCount, setLocationsCount] = useState(0);
    const [activeDonorsCount, setActiveDonorsCount] = useState(0);

    const fetchStocks = async () => {
        try {
            const data = await bloodService.getBloodStock(); // Fixed method name
            setStocks(data);

            // Also fetch stats/locations for the cards
            const statsData = await bloodService.getStats();
            setActiveDonorsCount(statsData.active_donors);

            const locRes = await api.get('/public/locations');
            setLocationsCount(locRes.data.length);

        } catch (error) {
            console.error('Error fetching stocks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStockUpdate = (update) => {
        setStocks(prev => prev.map(stock =>
            stock.blood_type === update.blood_type ? { ...stock, ...update } : stock
        ));
    };

    const displayStocks = stocks; // Use real data only

    // Calculate dynamic stats
    const criticalCount = displayStocks.filter(s => s.status === 'critical').length;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 text-primary mb-4">
                        <Activity className="w-5 h-5" />
                        <span className="text-sm font-medium">Live Dashboard</span>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Blood Availability</h1>
                    <p className="text-gray-600 max-w-2xl">
                        Real-time blood stock levels across all registered blood banks. Updated every minute.
                    </p>
                </div>

                {/* Search */}
                <div className="mb-8">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by blood type or location..."
                            className="input pl-10"
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="card">
                        <div className="flex items-center gap-3 mb-2">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            <span className="text-sm font-medium text-gray-600">Critical Types</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{criticalCount}</div>
                    </div>
                    <div className="card">
                        <div className="flex items-center gap-3 mb-2">
                            <Activity className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium text-gray-600">Active Banks</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{locationsCount}</div>
                    </div>
                    <div className="card">
                        <div className="flex items-center gap-3 mb-2">
                            <Users className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium text-gray-600">Active Donors</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{activeDonorsCount}</div>
                    </div>
                </div>

                {/* Blood Stock Grid */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Stock Levels</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        {displayStocks.map((stock) => (
                            <BloodStockCard
                                key={stock.blood_type}
                                type={stock.blood_type}
                                units={stock.units}
                                status={stock.status}
                            />
                        ))}
                    </div>
                </div>

                {/* Map */}
                <div className="card">
                    <div className="flex items-center gap-3 mb-6">
                        <MapPin className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-bold text-gray-900">Blood Bank Locations</h2>
                    </div>
                    <div className="w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden">
                        <LiveMap />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicDashboard;
