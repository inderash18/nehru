import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import bloodService from '../../services/bloodService';

const DonationHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await bloodService.getMyDonations();
                setHistory(data || []);
            } catch (err) {
                console.error('Failed to fetch donation history');
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    if (loading) {
        return (
            <div className="space-y-4 animate-pulse">
                {[1, 2].map(i => (
                    <div key={i} className="h-16 bg-gray-50 rounded-2xl"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
            {history.length > 0 ? (
                history.map((item, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={i}
                        className="relative"
                    >
                        <div className="absolute -left-[29px] top-1 w-5 h-5 rounded-full bg-white border-4 border-blood z-10" />
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold text-medical-navy">{item.location || 'Central Blood Bank'}</p>
                                <p className="text-xs text-gray-500">{item.date} • Whole Blood</p>
                            </div>
                            <div className="flex items-center gap-1 text-green-500 font-bold text-xs uppercase">
                                <CheckCircle2 className="w-4 h-4" /> {item.status || 'Completed'}
                            </div>
                        </div>
                    </motion.div>
                ))
            ) : (
                <div className="py-4 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <Calendar className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 font-medium">No donations recorded yet</p>
                    <p className="text-xs text-gray-400 mt-1">Your first donation will appear here</p>
                </div>
            )}

            <div className="relative pt-4">
                <div className="absolute -left-[29px] top-5 w-5 h-5 rounded-full bg-white border-4 border-gray-200 z-10" />
                <p className="text-gray-500 text-sm font-bold">
                    Joined LifeLink Network
                    <span className="block text-xs text-gray-400 font-medium">
                        {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'February 2026'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default DonationHistory;
