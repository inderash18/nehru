import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PublicDashboard from './pages/PublicDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DonorDashboard from './pages/DonorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import EmergencyPage from './pages/EmergencyPage';
import ProtectedRoute from './components/shared/ProtectedRoute';

function App() {
    console.log('App component rendering...');
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="dashboard" element={<PublicDashboard />} />
                    <Route path="emergency" element={<EmergencyPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />

                    {/* Protected Donor Routes */}
                    <Route path="donor" element={
                        <ProtectedRoute role="donor">
                            <DonorDashboard />
                        </ProtectedRoute>
                    } />

                    {/* Protected Admin Routes */}
                    <Route path="admin" element={
                        <ProtectedRoute role="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />
                </Route>
            </Routes>
        </>
    );
}

export default App;
