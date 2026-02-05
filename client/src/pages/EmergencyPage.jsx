import { motion } from 'framer-motion';
import { Phone, MapPin, Activity, AlertCircle, Droplet, Clock } from 'lucide-react';

const EmergencyPage = () => {
    return (
        <div className="bg-medical-cream min-h-screen py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-16">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="inline-flex p-4 bg-red-100 rounded-3xl mb-6 shadow-xl shadow-red-200"
                    >
                        <AlertCircle className="text-red-600 w-12 h-12 animate-pulse" />
                    </motion.div>
                    <h1 className="text-4xl lg:text-6xl font-black text-medical-navy mb-4">Emergency Assistance</h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">If you need blood urgently, use the resources below. Our AI network is currently coordinating with 12 blood banks.</p>
                </header>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Quick Action Cards */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border-4 border-red-50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 bg-red-600 w-32 h-32 rounded-full opacity-5"></div>
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-red-600">
                                <Droplet className="fill-current" /> Request Blood Now
                            </h3>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Blood Type Required</label>
                                    <select className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 outline-none font-bold text-lg">
                                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(t => <option key={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Patient Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 outline-none" placeholder="Hospital Name..." />
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-10 py-5 bg-red-600 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-red-200 hover:bg-red-700 transition-all flex items-center justify-center gap-4">
                                <Activity className="w-8 h-8" /> BROADCAST EMERGENCY ALERT
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                { title: "Nearby Blood Banks", icon: MapPin, count: "12 Active" },
                                { title: "Matched Donors", icon: Droplet, count: "145 Ready" }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-lg flex items-center gap-6">
                                    <div className="p-4 bg-red-50 rounded-2xl">
                                        <item.icon className="text-red-600 w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{item.title}</p>
                                        <p className="text-2xl font-black text-medical-navy">{item.count}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Helpline Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-medical-navy p-10 rounded-[3rem] text-white shadow-2xl shadow-medical-navy/30">
                            <h3 className="text-2xl font-bold mb-8">Helpline Numbers</h3>
                            <div className="space-y-8">
                                {[
                                    { label: "24/7 Central Blood Bank", num: "1-800-LIFE-LINK" },
                                    { label: "Emergency Ambulance", num: "102 / 108" },
                                    { label: "LifeLink Support", num: "+91 99999 00000" }
                                ].map((item, i) => (
                                    <div key={i} className="group cursor-pointer">
                                        <p className="text-xs text-blue-200 font-bold uppercase tracking-widest mb-1">{item.label}</p>
                                        <div className="flex items-center gap-3 text-2xl font-black group-hover:text-red-400 transition-colors">
                                            <Phone className="w-6 h-6" /> {item.num}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[2.5rem] shadow-lg">
                            <h4 className="font-bold text-medical-navy mb-4 flex items-center gap-2">
                                <Clock className="text-red-600 w-5 h-5" /> Average Response Time
                            </h4>
                            <div className="flex items-end gap-2">
                                <span className="text-5xl font-black text-medical-navy">12</span>
                                <span className="text-xl font-bold text-gray-400 mb-1">mins</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                                Our AI routing minimizes response time by coordinating the nearest available units.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyPage;
