import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EmergencyBanner = () => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="bg-red-600 text-white overflow-hidden relative"
            >
                <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-4 text-sm font-semibold">
                    <AlertTriangle className="w-5 h-5 animate-bounce" />
                    <p className="tracking-wide">
                        CRITICAL: O- AND B- BLOOD GROUPS URGENTLY NEEDED AT CITY GENERAL HOSPITAL.
                        <span className="hidden sm:inline bg-white text-red-600 px-2 py-0.5 rounded-full ml-3 text-xs uppercase cursor-pointer hover:bg-gray-100">
                            Donate Now
                        </span>
                    </p>
                    <button onClick={() => setVisible(false)} className="absolute right-4 p-1 hover:bg-red-700 rounded-full transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default EmergencyBanner;
