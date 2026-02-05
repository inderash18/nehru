import { Phone, AlertCircle, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmergencyPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* Emergency Header */}
            <div className="bg-red-600 text-white py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <AlertCircle className="w-16 h-16 mx-auto mb-6" />
                    <h1 className="text-5xl font-bold mb-4">Emergency Blood Request</h1>
                    <p className="text-xl text-red-100 mb-8">
                        Need blood urgently? Contact our 24/7 emergency hotline
                    </p>
                    <a href="tel:1800-BLOOD-911" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-red-600 rounded-lg font-bold text-lg hover:bg-red-50 transition-colors">
                        <Phone className="w-6 h-6" />
                        1-800-BLOOD-911
                    </a>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* Active Requests */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Active Emergency Requests</h2>
                    <div className="space-y-4">
                        {[
                            { location: "City General Hospital", type: "O-", units: "4 units", time: "2 min ago", urgency: "critical" },
                            { location: "Metro Medical Center", type: "AB+", units: "2 units", time: "15 min ago", urgency: "high" },
                            { location: "South District Clinic", type: "B+", units: "3 units", time: "28 min ago", urgency: "moderate" }
                        ].map((request, i) => (
                            <div key={i} className="card hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-3 h-3 rounded-full mt-1.5 ${request.urgency === 'critical' ? 'bg-red-500' :
                                                request.urgency === 'high' ? 'bg-orange-500' :
                                                    'bg-yellow-500'
                                            }`} />
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">{request.location}</h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                <span className="font-medium text-primary">{request.type}</span>
                                                <span>•</span>
                                                <span>{request.units}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {request.time}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn-primary whitespace-nowrap">
                                        Respond
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <div className="card">
                        <MapPin className="w-8 h-8 text-primary mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Find Nearest Blood Bank</h3>
                        <p className="text-gray-600 mb-4">Locate blood banks within 10km of your location</p>
                        <input
                            type="text"
                            placeholder="Enter your location"
                            className="input mb-3"
                        />
                        <button className="btn-primary w-full">Search</button>
                    </div>

                    <div className="card">
                        <Phone className="w-8 h-8 text-primary mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Emergency Contacts</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-gray-700">Blood Bank Hotline</span>
                                <a href="tel:1800-BLOOD" className="text-primary font-medium">1800-BLOOD</a>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-gray-700">Ambulance Service</span>
                                <a href="tel:108" className="text-primary font-medium">108</a>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-700">Medical Emergency</span>
                                <a href="tel:102" className="text-primary font-medium">102</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                <div className="card bg-blue-50 border-blue-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Emergency Protocol</h3>
                    <ol className="space-y-3 text-gray-700">
                        <li className="flex gap-3">
                            <span className="font-bold text-primary">1.</span>
                            <span>Call the emergency hotline immediately</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-primary">2.</span>
                            <span>Provide patient details and required blood type</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-primary">3.</span>
                            <span>Confirm your location and nearest hospital</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-primary">4.</span>
                            <span>Wait for confirmation and follow instructions</span>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default EmergencyPage;
