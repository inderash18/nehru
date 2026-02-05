import { useState } from 'react';
import { Calendar, MapPin, Activity } from 'lucide-react';
import donorService from '../../services/donorService';

const AppointmentScheduler = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('09:00');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleConfirm = async () => {
        if (!selectedDate) return alert('Please select a date');
        setLoading(true);
        try {
            await donorService.scheduleAppointment({
                date: selectedDate,
                time: selectedTime,
                hospital: "Central Blood Bank" // Default for now
            });
            setMessage({ type: 'success', text: 'Appointment scheduled successfully!' });
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to schedule. Try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                {message && (
                    <div className={`p-4 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {message.text}
                    </div>
                )}
                <label className="block">
                    <span className="text-xs font-bold text-gray-400 uppercase">Preferred Date</span>
                    <div className="mt-1 relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="date"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blood outline-none"
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>
                </label>

                <label className="block">
                    <span className="text-xs font-bold text-gray-400 uppercase">Hospital / Blood Bank</span>
                    <div className="mt-1 relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blood outline-none appearance-none font-medium text-medical-navy">
                            <option>Central Blood Bank</option>
                            <option>City General Hospital</option>
                            <option>St. Mary's Clinic</option>
                        </select>
                    </div>
                </label>

                <div className="grid grid-cols-3 gap-2">
                    {['09:00', '11:00', '14:00', '16:00', '18:00', '20:00'].map(time => (
                        <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 rounded-xl border text-sm font-bold transition-all ${selectedTime === time ? 'bg-blood text-white border-blood' : 'border-gray-100 hover:border-blood text-gray-500'}`}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={handleConfirm}
                disabled={loading}
                className="w-full py-4 bg-blood text-white rounded-2xl font-bold shadow-lg shadow-blood/20 transform hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {loading ? "Scheduling..." : <><Activity className="w-5 h-5" /> Confirm Appointment</>}
            </button>
        </div>
    );
};

export default AppointmentScheduler;
