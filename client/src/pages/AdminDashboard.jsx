import { motion } from 'framer-motion';
import InventoryManager from '../components/admin/InventoryManager';
import DonorTable from '../components/admin/DonorTable';
import AnalyticsChart from '../components/admin/AnalyticsChart';
import { Package, Users, BellRing, PieChart } from 'lucide-react';

const AdminDashboard = () => {
    return (
        <div className="bg-medical-navy min-h-screen py-8 px-4 text-white">
            <div className="max-w-7xl mx-auto space-y-8">

                <header className="flex justify-between items-center bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-md">
                    <div>
                        <h1 className="text-3xl font-bold">Admin Mission Control</h1>
                        <p className="text-blue-200 opacity-80 mt-1">System status: All services operational</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-3 bg-red-600 rounded-2xl hover:bg-red-700 transition-colors font-bold shadow-lg shadow-red-900/20">
                            Broadcast Panic Alert
                        </button>
                    </div>
                </header>

                <div className="grid md:grid-cols-4 gap-6">
                    {[
                        { label: "Total Units", val: "2,840", icon: Package, trend: "+12%" },
                        { label: "Active Donors", val: "18,201", icon: Users, trend: "+5%" },
                        { label: "Pending Requests", val: "14", icon: BellRing, trend: "Stable" },
                        { label: "Utilization Rate", val: "94%", icon: PieChart, trend: "+3%" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white/10 p-6 rounded-3xl border border-white/10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-blue-500/20 rounded-xl">
                                    <stat.icon className="w-6 h-6 text-blue-400" />
                                </div>
                                <span className="text-xs font-bold text-green-400">{stat.trend}</span>
                            </div>
                            <p className="text-xs text-blue-200 font-bold uppercase tracking-wider">{stat.label}</p>
                            <p className="text-3xl font-bold mt-1">{stat.val}</p>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
                        <h3 className="text-xl font-bold mb-6">Inventory Management</h3>
                        <InventoryManager />
                    </div>
                    <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
                        <h3 className="text-xl font-bold mb-6">Regional Analytics</h3>
                        <AnalyticsChart />
                    </div>
                </div>

                <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
                    <h3 className="text-xl font-bold mb-6">Recent Donors</h3>
                    <DonorTable />
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
