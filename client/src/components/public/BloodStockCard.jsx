import { Droplet, AlertCircle, Check } from 'lucide-react';

const BloodStockCard = ({ type, units, status }) => {
    const getStatusColor = () => {
        if (status === 'critical') return 'bg-red-50 border-red-200 text-red-700';
        if (status === 'low') return 'bg-yellow-50 border-yellow-200 text-yellow-700';
        return 'bg-green-50 border-green-200 text-green-700';
    };

    const getStatusIcon = () => {
        if (status === 'critical') return AlertCircle;
        if (status === 'low') return AlertCircle;
        return Check;
    };

    const StatusIcon = getStatusIcon();

    return (
        <div className="card hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Droplet className="w-5 h-5 text-primary" />
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor()}`}>
                    <StatusIcon className="w-3 h-3" />
                    {status}
                </div>
            </div>

            <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{type}</div>
                <div className="text-sm text-gray-600 mb-4">{units} units</div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full ${status === 'critical' ? 'bg-red-500' : status === 'low' ? 'bg-yellow-500' : 'bg-green-500'}`}
                        style={{ width: `${Math.min((units / 50) * 100, 100)}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default BloodStockCard;
