import { Link } from 'react-router-dom';
import { Droplet } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 py-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 font-bold text-lg">
                        <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                            <Droplet className="text-white w-4 h-4" />
                        </div>
                        <span className="text-gray-900">LifeLink</span>
                    </Link>

                    {/* Links */}
                    <div className="flex gap-6 text-sm text-gray-600">
                        <Link to="/" className="hover:text-gray-900">Home</Link>
                        <Link to="/dashboard" className="hover:text-gray-900">Dashboard</Link>
                        <Link to="/emergency" className="hover:text-gray-900">Emergency</Link>
                    </div>

                    {/* Copyright */}
                    <div className="text-sm text-gray-500">
                        © 2026 LifeLink. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
