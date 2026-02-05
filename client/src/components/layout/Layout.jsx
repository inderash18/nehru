import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import EmergencyBanner from '../public/EmergencyBanner';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <EmergencyBanner />
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
