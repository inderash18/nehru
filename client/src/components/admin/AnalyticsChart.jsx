import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AnalyticsChart = () => {
    const data = [
        { name: 'A+', val: 400 },
        { name: 'O+', val: 300 },
        { name: 'B+', val: 200 },
        { name: 'AB+', val: 278 },
        { name: 'A-', val: 189 },
        { name: 'O-', val: 239 },
        { name: 'B-', val: 349 },
        { name: 'AB-', val: 210 },
    ];

    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }}
                    />
                    <Tooltip
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        contentStyle={{ backgroundColor: '#1d3557', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="val" radius={[6, 6, 0, 0]} barSize={25}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.val > 300 ? '#ef4444' : '#3b82f6'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            <div className="mt-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-blue-200/50">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-blue-500"></div> Stable Demand
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-red-500"></div> Critical Shortage
                </div>
            </div>
        </div>
    );
};

export default AnalyticsChart;
