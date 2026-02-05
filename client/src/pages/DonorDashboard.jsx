import { motion } from 'framer-motion';
import DTPSMeter from '../components/donor/DTPSMeter';
import AppointmentScheduler from '../components/donor/AppointmentScheduler';
import DonationHistory from '../components/donor/DonationHistory';
import ProfileCard from '../components/donor/ProfileCard';
import { Calendar, History, Award, TrendingUp } from 'lucide-react';

const DonorDashboard = () => {
    return (
        <div className="bg-medical-cream min-h-screen py-8 px-4">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-8">

                {/* Left Sidebar - Profile & DTPS */}
                <div className="lg:col-span-1 space-y-8">
                    <ProfileCard />
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-white">
                        <h3 className="text-xl font-bold mb-6 text-center">Trust Score</h3>
                        <DTPSMeter score={92} />
                        <p className="mt-6 text-sm text-gray-500 text-center leading-relaxed">
                            Your DTPS score is 15% higher than average. You're a top-tier donor!
                        </p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { label: "Total Donations", val: "12", icon: History, color: "bg-blue-500" },
                            { label: "Lives Saved", val: "36", icon: Award, color: "bg-red-500" },
                            { label: "Next Eligibility", val: "Mar 15", icon: Calendar, color: "bg-green-500" }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                                <div className={`p-4 rounded-2xl ${stat.color} text-white`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">{stat.label}</p>
                                    <p className="text-2xl font-bold text-medical-navy">{stat.val}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-gray-50">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Calendar className="text-blood" /> Schedule Donation
                            </h3>
                            <AppointmentScheduler />
                        </div>

                        <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-gray-50">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <TrendingUp className="text-blood" /> History
                            </h3>
                            <DonationHistory />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DonorDashboard;
