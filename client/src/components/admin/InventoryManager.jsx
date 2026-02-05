import { Plus, Minus, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import bloodService from '../../services/bloodService';

const InventoryManager = () => {
    const [loading, setLoading] = useState(false);
    const [inventory, setInventory] = useState({});
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    const fetchInventory = async () => {
        setLoading(true);
        try {
            const data = await bloodService.getInventory();
            const invMap = {};
            data.forEach(item => invMap[item.blood_type] = item.units);
            setInventory(invMap);
        } catch (err) {
            console.error('Failed to fetch inventory');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    const updateStock = async (type, delta) => {
        const newUnits = (inventory[type] || 0) + delta;
        if (newUnits < 0) return;

        setInventory({ ...inventory, [type]: newUnits });
        try {
            await bloodService.updateInventory({
                blood_type: type,
                units: newUnits,
                threshold: 10,
                location: "Central Blood Bank"
            });
        } catch (err) {
            alert('Failed to update stock');
            fetchInventory(); // Revert
        }
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                {bloodTypes.map(type => (
                    <div key={type} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                        <span className="font-bold text-lg">{type}</span>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => updateStock(type, -1)}
                                className="p-1 hover:bg-white/10 rounded-lg text-red-400"
                            ><Minus className="w-5 h-5" /></button>
                            <span className="w-8 text-center font-bold">{inventory[type] || 0}</span>
                            <button
                                onClick={() => updateStock(type, 1)}
                                className="p-1 hover:bg-white/10 rounded-lg text-green-400"
                            ><Plus className="w-5 h-5" /></button>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="w-full mt-4 flex items-center justify-center gap-2 py-4 bg-blue-600 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/40"
                onClick={fetchInventory}
            >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Syncing...' : 'Sync All Inventories'}
            </button>
        </div>
    );
};

export default InventoryManager;
