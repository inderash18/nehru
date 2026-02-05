import { Link } from 'react-router-dom';
import { Home, Droplet, Calendar, History, Settings, LogOut, Award } from 'lucide-react';

const Sidebar = ({ role = 'donor' }) => {
    const menuItems = role === 'admin' ? [
        { icon: Home, label: 'Dashboard', path: '/admin' },
        { icon: Droplet, label: 'Inventory', path: '/admin' },
        { icon: History, label: 'Donations', path: '/admin' },
        { icon: Award, label: 'Analytics', path: '/admin' },
    ] : [
        { icon: Home, label: 'Overview', path: '/donor' },
        { icon: Calendar, label: 'Schedule', path: '/donor' },
        { icon: History, label: 'My History', path: '/donor' },
        { icon: Award, label: 'Rewards', path: '/donor' },
    ];

    return (
        <aside className="w-64 h-full bg-white border-r border-gray-100 flex flex-col p-6">
            <div className="flex-grow space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 ml-2">Main Menu</p>
                {menuItems.map((item, i) => (
                    <Link
                        key={i}
                        to={item.path}
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-500 hover:bg-blood/5 hover:text-blood transition-all font-medium"
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </Link>
                ))}
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-2">
                <Link to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-500 hover:bg-gray-50 transition-all font-medium">
                    <Settings className="w-5 h-5" />
                    Settings
                </Link>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-medium">
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
