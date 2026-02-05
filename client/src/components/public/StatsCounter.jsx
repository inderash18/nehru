import { motion } from 'framer-motion';

const StatsCounter = () => {
    const stats = [
        { label: "Active Donors", value: "25,000+" },
        { label: "Blood Units Collected", value: "142,000" },
        { label: "Partner Hospitals", value: "850" },
        { label: "Lives Impacted", value: "1.2M" }
    ];

    return (
        <div className="bg-medical-navy py-16 text-white">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center"
                    >
                        <p className="text-4xl font-extrabold mb-2">{stat.value}</p>
                        <p className="text-blue-200 text-sm font-medium uppercase tracking-widest">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default StatsCounter;
