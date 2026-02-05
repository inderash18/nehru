import { motion } from 'framer-motion';

const BloodStockCard = ({ type, units, status }) => {
    const getStatusColor = () => {
        if (status === 'critical') return 'bg-red-500';
        if (status === 'low') return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getStatusText = () => {
        if (status === 'critical') return 'Emergency';
        if (status === 'low') return 'Low Stock';
        return 'Adequate';
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden"
        >
            <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold text-white uppercase ${getStatusColor()}`}>
                {getStatusText()}
            </div>

            <div className="w-16 h-16 blood-gradient rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg shadow-blood/30">
                {type}
            </div>

            <p className="text-3xl font-extrabold text-medical-navy mb-1">{units}</p>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Units Available</p>

            <div className="w-full mt-6 bg-gray-100 h-2 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((units / 50) * 100, 100)}%` }}
                    className={`h-full ${getStatusColor()}`}
                />
            </div>
        </motion.div>
    );
};

export default BloodStockCard;
