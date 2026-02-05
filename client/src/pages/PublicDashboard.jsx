import { useState, useEffect } from 'react';
import BloodStockCard from '../components/public/BloodStockCard';
import LiveMap from '../components/public/LiveMap';
import bloodService from '../services/bloodService';
import { useSocket } from '../contexts/SocketContext';
import { Search, MapPin, Filter } from 'lucide-react';

const PublicDashboard = () => {
    const [stocks, setStocks] = useState([]);
    const socket = useSocket();

    useEffect(() => {
        const fetchStock = async () => {
            const data = await bloodService.getBloodStock();
            setStocks(data);
        };
        fetchStock();

        if (socket) {
            socket.on('stock_update', (data) => {
                setStocks(prev => prev.map(s => s.blood_type === data.blood_type ? { ...s, ...data } : s));
            });
        }

        return () => { if (socket) socket.off('stock_update'); };
    }, [socket]);

    // Mock data for initial UI if service fails
    const displayStocks = stocks.length > 0 ? stocks : [
        { blood_type: 'O+', units: 45, status: 'adequate' },
        { blood_type: 'O-', units: 8, status: 'critical' },
        { blood_type: 'A+', units: 32, status: 'adequate' },
        { blood_type: 'A-', units: 12, status: 'low' },
        { blood_type: 'B+', units: 28, status: 'adequate' },
        { blood_type: 'B-', units: 5, status: 'critical' },
        { blood_type: 'AB+', units: 15, status: 'low' },
        { blood_type: 'AB-', units: 3, status: 'critical' },
    ];

    return (
        <div className="bg-medical-cream min-h-screen py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-medical-navy mb-2">Real-time Blood Inventory</h1>
                        <p className="text-gray-600">Live updates from 12 associated blood banks and hospitals.</p>
                    </div>

                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search location..."
                                className="pl-10 pr-4 py-3 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-blood outline-none w-64"
                            />
                        </div>
                        <button className="p-3 bg-white rounded-2xl shadow-sm hover:bg-gray-50 text-medical-navy">
                            <Filter className="w-6 h-6" />
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
                    {displayStocks.map((stock, i) => (
                        <BloodStockCard key={i} type={stock.blood_type} units={stock.units} status={stock.status} />
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white p-2 rounded-[2.5rem] shadow-xl h-[500px] overflow-hidden">
                            <LiveMap />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-[2rem] shadow-lg">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <MapPin className="text-blood" /> Nearby Blood Banks
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { name: "Central Blood Bank", dist: "1.2 km", status: "Open 24/7" },
                                    { name: "St. Mary's Hospital", dist: "2.5 km", status: "Closing soon" },
                                    { name: "City Red Cross", dist: "3.8 km", status: "Open 24/7" }
                                ].map((bank, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-red-50 transition-colors group">
                                        <div>
                                            <p className="font-bold text-medical-navy group-hover:text-blood">{bank.name}</p>
                                            <p className="text-xs text-gray-500">{bank.dist} • {bank.status}</p>
                                        </div>
                                        <button className="text-blood text-sm font-bold">Directions</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicDashboard;
