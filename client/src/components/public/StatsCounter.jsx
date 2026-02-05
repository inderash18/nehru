import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import bloodService from '../../services/bloodService';

const StatsCounter = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await bloodService.getStats();
                setStats(data);
            } catch (err) {
                console.error('Failed to fetch stats');
            }
        };
        fetchStats();
    }, []);

    const statItems = [
        { label: "Active Donors", value: stats?.active_donors || "0" },
        { label: "Donations Recorded", value: stats?.donations_today || "0" },
        { label: "Emergency Alerts", value: stats?.emergency_requests || "0" },
        { label: "Lives Saved", value: stats?.lives_saved || "0" }
    ];

    return (
        <div className="bg-medical-navy py-16 text-white">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                {statItems.map((stat, i) => (
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
