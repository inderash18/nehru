import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Droplet, User, Bell, LogOut, Menu } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="sticky top-0 z-50 glass-morphism shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-blood p-2 rounded-lg group-hover:scale-110 transition-transform">
                            <Droplet className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold text-medical-navy tracking-tight">LifeLink <span className="text-blood">AI</span></span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <Link to="/dashboard" className="hover:text-blood transition-colors">Blood Stock</Link>
                        <Link to="/emergency" className="text-red-600 font-bold hover:animate-pulse">Emergency</Link>
                        {user ? (
                            <>
                                <Link to={user.role === 'admin' ? '/admin' : '/donor'} className="hover:text-blood transition-colors">Dashboard</Link>
                                <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                                    <Bell className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blood" />
                                    <button onClick={logout} className="flex items-center gap-1 text-gray-500 hover:text-red-500">
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                    <div className="w-8 h-8 rounded-full bg-medical-blue flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">
                                        {user.email[0].toUpperCase()}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="px-4 py-2 text-medical-navy hover:text-blood transition-colors">Sign In</Link>
                                <Link to="/register" className="px-6 py-2 bg-blood text-white rounded-full hover:bg-blood-dark transition-all transform hover:scale-105 shadow-md">
                                    Join as Donor
                                </Link>
                            </div>
                        )}
                    </div>

                    <button className="md:hidden p-2 text-medical-navy">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
