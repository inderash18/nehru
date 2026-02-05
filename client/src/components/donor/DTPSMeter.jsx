import { motion } from 'framer-motion';

const DTPSMeter = ({ score = 85 }) => {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    const getColor = () => {
        if (score >= 80) return '#10b981'; // green
        if (score >= 50) return '#f59e0b'; // amber
        return '#ef4444'; // red
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="96"
                        cy="96"
                        r={radius}
                        stroke="#e5e7eb"
                        strokeWidth="12"
                        fill="transparent"
                    />
                    <motion.circle
                        cx="96"
                        cy="96"
                        r={radius}
                        stroke={getColor()}
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-medical-navy">{score}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">DTPS Score</span>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 w-full text-center">
                <div className="p-3 bg-gray-50 rounded-2xl">
                    <p className="text-xs text-gray-500 font-bold uppercase">Consistency</p>
                    <p className="text-lg font-bold text-medical-navy">High</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl">
                    <p className="text-xs text-gray-500 font-bold uppercase">Rank</p>
                    <p className="text-lg font-bold text-medical-navy">Gold</p>
                </div>
            </div>
        </div>
    );
};

export default DTPSMeter;
