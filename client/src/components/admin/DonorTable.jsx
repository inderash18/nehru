import { motion } from 'framer-motion';
import { Search, Filter, MoreVertical, Download } from 'lucide-react';

const DonorTable = () => {
    const donors = [
        { name: "Sarah Williams", type: "O-", last: "2 days ago", score: 95, status: "High Priority" },
        { name: "Michael Chen", type: "B+", last: "1 week ago", score: 82, status: "Contacted" },
        { name: "Emma Davis", type: "A+", last: "1 month ago", score: 78, status: "Eligible" },
        { name: "James Wilson", type: "AB-", last: "Yesterday", score: 91, status: "Pending" },
        { name: "Olivia Brown", type: "O+", last: "5 days ago", score: 89, status: "Active" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-grow max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search donors by name or blood type..."
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 flex items-center gap-2 text-sm font-bold">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 flex items-center gap-2 text-sm font-bold">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5 text-[10px] font-bold text-blue-200 uppercase tracking-widest">
                            <th className="pb-4 px-4">Donor Name</th>
                            <th className="pb-4 px-4">Blood Type</th>
                            <th className="pb-4 px-4">Last Donation</th>
                            <th className="pb-4 px-4 text-center">AI Score</th>
                            <th className="pb-4 px-4 text-center">Status</th>
                            <th className="pb-4 px-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {donors.map((donor, i) => (
                            <motion.tr
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="group hover:bg-white/5 transition-colors cursor-pointer"
                            >
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center font-bold text-blue-400">
                                            {donor.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{donor.name}</p>
                                            <p className="text-[10px] text-blue-200/50">Verified Member</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-lg font-bold text-xs">{donor.type}</span>
                                </td>
                                <td className="py-4 px-4 text-sm text-blue-200">
                                    {donor.last}
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex flex-col items-center">
                                        <span className="font-bold text-sm">{donor.score}</span>
                                        <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden mt-1">
                                            <div className="h-full bg-blue-500" style={{ width: `${donor.score}%` }}></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${donor.status === 'High Priority' ? 'bg-red-500/20 text-red-500' :
                                            donor.status === 'Contacted' ? 'bg-amber-500/20 text-amber-500' : 'bg-green-500/20 text-green-500'
                                        }`}>
                                        {donor.status}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-right">
                                    <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreVertical className="w-5 h-5 text-gray-500" />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DonorTable;
