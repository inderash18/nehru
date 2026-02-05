import { useState, useEffect } from 'react';
import { Users, Droplet, Building2, Activity } from 'lucide-react';

import api from '../services/api';
import bloodService from '../services/bloodService';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        total_donors: 0,
        total_banks: 0,
        total_donations: 0,
        active_requests: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const statsData = await bloodService.getStats();
                const locRes = await api.get('/public/locations');
                setStats({
                    total_donors: statsData.active_donors,
                    total_banks: locRes.data.length,
                    total_donations: statsData.donations_today, // mapped from endpoint
                    active_requests: statsData.emergency_requests
                });
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            }
        };

        fetchStats();
        // Poll every 3 seconds
        const interval = setInterval(fetchStats, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">System overview and management</p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    <div className="card">
                        <div className="flex items-center gap-3 mb-2">
                            <Users className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium text-gray-600">Total Donors</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{stats.total_donors}</div>
                    </div>
                    <div className="card">
                        <div className="flex items-center gap-3 mb-2">
                            <Building2 className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium text-gray-600">Blood Banks</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{stats.total_banks}</div>
                    </div>
                    <div className="card">
                        <div className="flex items-center gap-3 mb-2">
                            <Droplet className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium text-gray-600">Total Donations</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{stats.total_donations}</div>
                    </div>
                    <div className="card">
                        <div className="flex items-center gap-3 mb-2">
                            <Activity className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium text-gray-600">Active Requests</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{stats.active_requests}</div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                    <div className="card">
                        <div className="space-y-4">
                            {[
                                { action: "New donor registered", user: "John Doe", time: "5 min ago" },
                                { action: "Blood donation completed", user: "Jane Smith", time: "15 min ago" },
                                { action: "Emergency request fulfilled", user: "City Hospital", time: "1 hour ago" },
                                { action: "Stock updated", user: "Blood Bank Admin", time: "2 hours ago" }
                            ].map((activity, i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                                    <div>
                                        <p className="font-medium text-gray-900">{activity.action}</p>
                                        <p className="text-sm text-gray-600">{activity.user}</p>
                                    </div>
                                    <span className="text-sm text-gray-500">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <button className="card hover:shadow-md transition-shadow text-left">
                            <Users className="w-8 h-8 text-primary mb-3" />
                            <h3 className="font-semibold text-gray-900 mb-1">Manage Donors</h3>
                            <p className="text-sm text-gray-600">View and manage donor profiles</p>
                        </button>
                        <button className="card hover:shadow-md transition-shadow text-left">
                            <Building2 className="w-8 h-8 text-primary mb-3" />
                            <h3 className="font-semibold text-gray-900 mb-1">Manage Blood Banks</h3>
                            <p className="text-sm text-gray-600">Update blood bank information</p>
                        </button>
                        <button className="card hover:shadow-md transition-shadow text-left">
                            <Droplet className="w-8 h-8 text-primary mb-3" />
                            <h3 className="font-semibold text-gray-900 mb-1">Update Stock</h3>
                            <p className="text-sm text-gray-600">Manage blood inventory levels</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
