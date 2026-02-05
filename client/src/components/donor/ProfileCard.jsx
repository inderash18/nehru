import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const ProfileCard = () => {
    return (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-white text-center">
            <div className="w-24 h-24 mx-auto bg-medical-blue rounded-3xl mb-6 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                JD
            </div>
            <h3 className="text-2xl font-bold text-medical-navy">John Doe</h3>
            <p className="inline-block px-3 py-1 bg-blood/10 text-blood rounded-full text-xs font-bold mt-2">O+ Donor</p>

            <div className="mt-8 space-y-4 text-left">
                <div className="flex items-center gap-3 text-gray-500">
                    <Mail className="w-4 h-4" /> <span className="text-sm">john@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                    <Phone className="w-4 h-4" /> <span className="text-sm">+1 234 567 890</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                    <MapPin className="w-4 h-4" /> <span className="text-sm">New York, NY</span>
                </div>
            </div>

            <button className="w-full mt-8 py-3 bg-medical-navy text-white rounded-2xl font-bold hover:bg-opacity-90 transition-all">
                Edit Profile
            </button>
        </div>
    );
};

export default ProfileCard;
