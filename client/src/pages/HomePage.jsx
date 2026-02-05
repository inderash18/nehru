import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Heart, MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import heroImage from '../assets/images/1.jpg';
import api from '../services/api';

const HomePage = () => {
    const [stats, setStats] = useState({
        active_donors: 0,
        lives_saved: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/public/stats');
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch stats", error);
            }
        };

        fetchStats();
        // Poll every 3 seconds
        const interval = setInterval(fetchStats, 3000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero with Image */}
            <section className="pt-20 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Text */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-8">
                                <Droplet className="w-4 h-4" />
                                Blood Donation Platform
                            </div>

                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                                Save Lives Through<br />
                                <span className="text-primary">Smart Coordination</span>
                            </h1>

                            <p className="text-xl text-gray-600 mb-12">
                                Connect donors with those in need. Real-time blood availability tracking and emergency coordination.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/register" className="btn-primary inline-flex items-center justify-center gap-2">
                                    Become a Donor <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link to="/dashboard" className="btn-secondary">
                                    View Availability
                                </Link>
                            </div>
                        </div>

                        {/* Right Column - Image */}
                        <div className="relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={heroImage}
                                    alt="Blood Donation"
                                    className="w-full h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <p className="text-2xl font-bold mb-2">Every donation saves 3 lives</p>
                                    <p className="text-white/90">Join our community of heroes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Simple Features */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Users,
                                title: "Register as Donor",
                                desc: "Create your profile and specify your blood type and availability."
                            },
                            {
                                icon: MapPin,
                                title: "Find Nearby Centers",
                                desc: "Locate blood banks and donation centers in your area."
                            },
                            {
                                icon: Calendar,
                                title: "Schedule Donation",
                                desc: "Book appointments at your convenience and save lives."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="card text-center hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <feature.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Simple Stats */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {[
                            { number: stats.active_donors || "0", label: "Active Donors" },
                            { number: "25+", label: "Blood Banks" }, // Keeping this static as it's not in stats yet, or mapped to active_donors if slightly modified logic
                            { number: stats.lives_saved || "0", label: "Lives Saved" }
                        ].map((stat, i) => (
                            <div key={i} className="card">
                                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Simple CTA */}
            <section className="py-20 px-6 bg-primary text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <Heart className="w-16 h-16 mx-auto mb-6" />
                    <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
                    <p className="text-xl mb-8 text-white/90">
                        Join thousands of donors helping save lives every day.
                    </p>
                    <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Get Started <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
