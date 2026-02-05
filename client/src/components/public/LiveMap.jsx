import { MapPin, Navigation } from 'lucide-react';

const LiveMap = () => {
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
            {[
                { t: '15%', l: '30%', name: 'Central Bank', status: 'Adequate' },
                { t: '60%', l: '70%', name: 'City Hospital', status: 'Critical' },
                { t: '40%', l: '45%', name: 'Red Cross', status: 'Low' },
            ].map((pos, i) => (
                <div key={i} className="absolute group cursor-pointer" style={{ top: pos.t, left: pos.l }}>
                    <div className="flex flex-col items-center">
                        <div className="bg-white p-2 rounded-lg shadow-xl text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity mb-1 whitespace-nowrap">
                            {pos.name} ({pos.status})
                        </div>
                        <MapPin className={`w-8 h-8 ${pos.status === 'Critical' ? 'text-red-500' : 'text-medical-blue'} fill-current`} />
                    </div>
                </div>
            ))}

            <div className="absolute bottom-6 left-6 p-4 bg-white/90 backdrop-blur rounded-2xl shadow-lg border border-white">
                <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-tight">Active Banks</p>
                <p className="text-xl font-bold text-medical-navy">12 Locations</p>
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
