import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

const AppointmentScheduler = () => {
    const [selectedDate, setSelectedDate] = useState('');

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <label className="block">
                    <span className="text-xs font-bold text-gray-400 uppercase">Preferred Date</span>
                    <div className="mt-1 relative">
                        <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="date"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blood outline-none"
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>
                </label>

                <label className="block">
                    <span className="text-xs font-bold text-gray-400 uppercase">Hospital / Blood Bank</span>
                    <div className="mt-1 relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blood outline-none appearance-none">
                            <option>Select location...</option>
                            <option>Central Blood Bank</option>
                            <option>City General Hospital</option>
                            <option>St. Mary's Clinic</option>
                        </select>
                    </div>
                </label>

                <div className="grid grid-cols-3 gap-2">
                    {['09:00', '11:00', '14:00', '16:00', '18:00', '20:00'].map(time => (
                        <button key={time} className="py-2 rounded-xl border border-gray-100 text-sm font-bold hover:bg-blood hover:text-white hover:border-blood transition-all">
                            {time}
                        </button>
                    ))}
                </div>
            </div>

            <button className="w-full py-4 blood-gradient text-white rounded-2xl font-bold shadow-lg shadow-blood/20 transform hover:scale-[1.02] transition-all">
                Confirm Appointment
            </button>
        </div>
    );
};

export default AppointmentScheduler;
