import { Mail, Phone, MapPin, User, Edit2, ShieldCheck, Activity } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

const ProfileCard = () => {
    const { user } = useAuth();

    if (!user) return (
        <div className="bg-white p-12 rounded-[3.5rem] shadow-premium border border-navy-50 text-center animate-pulse">
            <div className="w-28 h-28 mx-auto bg-navy-50 rounded-[2rem] mb-8" />
            <div className="h-6 bg-navy-50 rounded-full w-3/4 mx-auto mb-4" />
            <div className="h-4 bg-navy-50 rounded-full w-1/2 mx-auto" />
        </div>
    );

    const getInitials = (name) => {
        if (!name) return "LL";
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <div className="bg-white p-12 rounded-[3.5rem] shadow-premium border border-navy-50 text-center relative overflow-hidden group">
            {/* Top Gold Accent */}
            <div className="absolute top-0 left-0 w-full h-2 bg-medical-gold/20" />

            <div className="relative mb-8">
                <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="w-28 h-28 mx-auto bg-navy-800 rounded-[2.5rem] flex items-center justify-center text-4xl font-heading font-black text-white shadow-2xl relative z-10"
                >
                    {getInitials(user.full_name)}
                    <div className="absolute -bottom-2 -right-2 bg-medical-gold text-navy-900 p-2.5 rounded-2xl shadow-xl border-4 border-white">
                        <User className="w-5 h-5 font-black" />
                    </div>
                </motion.div>
                {/* Decorative Aura */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-medical-teal/5 rounded-full blur-2xl -z-0" />
            </div>

            <div className="space-y-2">
                <h3 className="text-2xl font-heading font-black text-navy-800 tracking-tighter leading-none">{user.full_name || 'Donor Profile'}</h3>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-medical-red/5 text-medical-red rounded-full text-[10px] font-black uppercase tracking-widest border border-medical-red/10">
                        <Activity className="w-3 h-3 animate-pulse" />
                        Type {user.blood_type || 'TBD'}
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-medical-mint/5 text-medical-mint rounded-full text-[10px] font-black uppercase tracking-widest border border-medical-mint/10">
                        <ShieldCheck className="w-3 h-3" />
                        Verified
                    </span>
                </div>
            </div>

            <div className="mt-12 space-y-6 text-left">
                <div className="flex items-center gap-5 group/item">
                    <div className="p-3 bg-navy-50 rounded-2xl group-hover/item:bg-navy-800 group-hover/item:text-white transition-all">
                        <Mail className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black uppercase tracking-widest text-navy-200">Session Email</span>
                        <span className="text-sm font-heading font-bold text-navy-800 truncate">{user.email || '—'}</span>
                    </div>
                </div>
                <div className="flex items-center gap-5 group/item">
                    <div className="p-3 bg-navy-50 rounded-2xl group-hover/item:bg-navy-800 group-hover/item:text-white transition-all">
                        <Phone className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black uppercase tracking-widest text-navy-200">Direct Contact</span>
                        <span className="text-sm font-heading font-bold text-navy-800">{user.phone || '—'}</span>
                    </div>
                </div>
                <div className="flex items-center gap-5 group/item">
                    <div className="p-3 bg-navy-50 rounded-2xl group-hover/item:bg-navy-800 group-hover/item:text-white transition-all">
                        <MapPin className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black uppercase tracking-widest text-navy-200">Registered Zone</span>
                        <span className="text-sm font-heading font-bold text-navy-800">
                            {user.address?.city ? `${user.address.city}, ${user.address.state}` : '—'}
                        </span>
                    </div>
                </div>
            </div>

            <button className="w-full mt-12 py-5 bg-navy-800 text-white rounded-[1.5rem] font-heading font-black text-[10px] uppercase tracking-[0.3em] hover:bg-navy-700 transition-all shadow-[0_20px_40px_-15px_rgba(26,54,93,0.3)] flex items-center justify-center gap-3 active:scale-95 group">
                <Edit2 className="w-4 h-4 text-medical-gold group-hover:rotate-12 transition-transform" />
                Update Network Profile
            </button>
        </div>
    );
};

export default ProfileCard;
