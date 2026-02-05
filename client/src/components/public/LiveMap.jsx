import { MapPin, Navigation } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../services/api';

const LiveMap = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const { data } = await api.get('/public/locations');
                setLocations(data);
            } catch (error) {
                console.error("Failed to fetch locations", error);
            }
        };

        fetchLocations();
        // Poll every 5 seconds for map updates
        const interval = setInterval(fetchLocations, 5000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="w-full h-full bg-slate-100 rounded-[2rem] relative flex items-center justify-center overflow-hidden">
            {/* Mock Map Background */}
            <div className="absolute inset-0 bg-[#e5e7eb] opacity-40" style={{ backgroundImage: 'radial-gradient(#9ca3af 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}></div>

            {/* City Paths Mock */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-2 bg-white/50 rotate-45 transform"></div>
                <div className="w-full h-2 bg-white/50 -rotate-45 transform"></div>
                <div className="h-full w-2 bg-white/50"></div>
            </div>

            {/* Map Markers */}
            {/* Map Markers */}
            {locations.map((loc, i) => {
                // Simple scaling for demo purposes (assuming NYC area)
                // Lat: 40.70 - 40.80, Lng: -74.05 - -73.90
                const top = `${(40.80 - loc.lat) * 1000}%`;
                const left = `${(loc.lng - (-74.05)) * 600}%`;

                // Fallback to random if out of bounds (just for demo visual safety)
                const safeTop = parseFloat(top) > 100 || parseFloat(top) < 0 ? `${Math.random() * 80 + 10}%` : top;
                const safeLeft = parseFloat(left) > 100 || parseFloat(left) < 0 ? `${Math.random() * 80 + 10}%` : left;

                return (
                    <div key={loc.id || i} className="absolute group cursor-pointer" style={{ top: safeTop, left: safeLeft }}>
                        <div className="flex flex-col items-center">
                            <div className="bg-white p-2 rounded-lg shadow-xl text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity mb-1 whitespace-nowrap">
                                {loc.name} ({loc.status})
                            </div>
                            <MapPin className={`w-8 h-8 ${loc.status === 'Critical' ? 'text-red-500' : 'text-medical-blue'} fill-current`} />
                        </div>
                    </div>
                );
            })}

            <div className="absolute bottom-6 left-6 p-4 bg-white/90 backdrop-blur rounded-2xl shadow-lg border border-white">
                <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-tight">Active Banks</p>
                <p className="text-xl font-bold text-medical-navy">{locations.length} Locations</p>
            </div>

            <div className="absolute top-6 right-6">
                <button className="p-3 bg-blood text-white rounded-full shadow-lg">
                    <Navigation className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default LiveMap;
