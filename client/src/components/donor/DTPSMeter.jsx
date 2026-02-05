import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Award } from 'lucide-react';

const DTPSMeter = ({ score = 85 }) => {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    const getColor = () => {
        if (score >= 80) return '#38A169'; // success-green (medical-mint)
        if (score >= 50) return '#D4AF37'; // medical-gold
        return '#C53030'; // emergency-red
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-56 h-56 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    {/* Track */}
                    <circle
                        cx="112"
                        cy="112"
                        r={radius}
                        stroke="#1A365D"
                        strokeWidth="10"
                        fill="transparent"
                        className="opacity-5"
                    />
                    {/* Progress */}
                    <motion.circle
                        cx="112"
                        cy="112"
                        r={radius}
                        stroke={getColor()}
                        strokeWidth="16"
                        fill="transparent"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 2, ease: "circOut" }}
                        strokeLinecap="round"
                        className="drop-shadow-xl"
                    />
                </svg>

                {/* Score Dashboard */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-navy-800 p-6 rounded-full shadow-2xl border-4 border-white flex flex-col items-center justify-center w-36 h-36 relative"
                    >
                        <span className="text-5xl font-heading font-black text-white tracking-tighter">{score}</span>
                        <div className="absolute -bottom-2 -right-2 bg-medical-gold p-2 rounded-xl shadow-lg">
                            <Award className="w-5 h-5 text-navy-900" />
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 w-full">
                <div className="p-5 bg-navy-50 rounded-[2rem] border border-navy-100 flex items-center gap-4">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm">
                        <Activity className="w-4 h-4 text-medical-teal" />
                    </div>
                    <div className="text-left">
                        <p className="text-[9px] text-navy-200 font-black uppercase tracking-widest leading-none mb-1">Impact</p>
                        <p className="text-sm font-heading font-black text-navy-800 uppercase tracking-tighter">Gold Tier</p>
                    </div>
                </div>
                <div className="p-5 bg-navy-50 rounded-[2rem] border border-navy-100 flex items-center gap-4">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm">
                        <ShieldCheck className="w-4 h-4 text-medical-gold" />
                    </div>
                    <div className="text-left">
                        <p className="text-[9px] text-navy-200 font-black uppercase tracking-widest leading-none mb-1">Consistency</p>
                        <p className="text-sm font-heading font-black text-navy-800 uppercase tracking-tighter">High (98%)</p>
                    </div>
                </div>
            </div>

            <p className="mt-8 text-[9px] font-black uppercase tracking-[0.4em] text-navy-200">System Dynamic Score</p>
        </div>
    );
};

export default DTPSMeter;
