import { motion } from 'framer-motion';
import { CheckCircle2, Clock } from 'lucide-react';

const DonationHistory = () => {
    const history = [
        { date: '2025-11-12', units: '1 Unit', location: 'Central Blood Bank', status: 'Completed' },
        { date: '2025-08-05', units: '1 Unit', location: 'City General Hospital', status: 'Completed' },
        { date: '2025-05-18', units: '1 Unit', location: 'Central Blood Bank', status: 'Completed' },
    ];

    return (
        <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
            {history.map((item, i) => (
                <div key={i} className="relative">
                    <div className="absolute -left-[29px] top-1 w-5 h-5 rounded-full bg-white border-4 border-blood z-10" />
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-medical-navy">{item.location}</p>
                            <p className="text-xs text-gray-500">{item.date} • Whole Blood</p>
                        </div>
                        <div className="flex items-center gap-1 text-green-500 font-bold text-xs uppercase">
                            <CheckCircle2 className="w-4 h-4" /> {item.status}
                        </div>
                    </div>
                </div>
            ))}
            <div className="relative">
                <div className="absolute -left-[29px] top-1 w-5 h-5 rounded-full bg-white border-4 border-gray-200 z-10" />
                <p className="text-gray-400 text-sm font-medium">Joined LifeLink Network • May 2025</p>
            </div>
        </div>
    );
};

export default DonationHistory;
