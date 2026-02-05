import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Droplet, MapPin, Clock } from 'lucide-react';
import donorService from '../services/donorService';

const DonorDashboard = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (user) {
            fetchProfile();
        }
    }, [user]);

    const fetchProfile = async () => {
        try {
            const data = await donorService.getProfile();
            setProfile(data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome, {user?.full_name}</h1>
                    <p className="text-gray-600">Thank you for being a life-saver</p>
                </div>

                {/* Profile Card */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="card">
                        <div className="flex items-center gap-3 mb-2">
                            <Droplet className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium text-gray-600">Blood Type</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{user?.blood_type || 'O+'}</div>
                    </div>
                    <div className="card">
                        <div className="flex items-center gap-3 mb-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium text-gray-600">Donations</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{profile?.donation_count || 0}</div>
                    </div>
                    <div className="card">
                        <div className="flex items-center gap-3 mb-2">
                            <Clock className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium text-gray-600">Last Donation</span>
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                            {profile?.last_donation || 'Never'}
                        </div>
                    </div>
                </div>

                {/* Upcoming Appointments */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Appointments</h2>
                    <div className="card">
                        <p className="text-gray-600 text-center py-8">No upcoming appointments</p>
                        <button className="btn-primary w-full">Schedule Donation</button>
                    </div>
                </div>

                {/* Nearby Blood Banks */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Nearby Blood Banks</h2>
                    <div className="space-y-4">
                        {[
                            { name: "City Blood Bank", distance: "2.3 km", address: "123 Main Street" },
                            { name: "General Hospital Blood Center", distance: "4.1 km", address: "456 Park Avenue" },
                            { name: "Red Cross Blood Bank", distance: "5.8 km", address: "789 Oak Road" }
                        ].map((bank, i) => (
                            <div key={i} className="card hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-primary mt-1" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">{bank.name}</h3>
                                            <p className="text-sm text-gray-600">{bank.address}</p>
                                            <p className="text-sm text-primary font-medium mt-1">{bank.distance} away</p>
                                        </div>
                                    </div>
                                    <button className="btn-secondary text-sm">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonorDashboard;
