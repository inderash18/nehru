import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Zap, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatsCounter from '../components/public/StatsCounter';

const HomePage = () => {
    return (
        <div className="relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-blood/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-medical-blue/10 rounded-full blur-3xl" />

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 pt-20 pb-16 text-center lg:text-left lg:flex lg:items-center">
                <div className="lg:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blood/10 text-blood text-sm font-bold mb-6">
                            <Zap className="w-4 h-4 fill-blood" />
                            <span>AI-Powered Donation Network</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-medical-navy leading-tight mb-8">
                            Connecting Hearts, <br />
                            <span className="text-blood">Saving Lives</span> with AI.
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 max-w-2xl">
                            The world's first smart blood donation platform that predicts demand
                            and ensures no emergency goes unanswered. Powered by LifeLink AI.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link to="/register" className="px-8 py-4 bg-blood text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blood-dark transition-all transform hover:scale-105 shadow-xl shadow-blood/20">
                                Become a Donor <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link to="/emergency" className="px-8 py-4 bg-medical-navy text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-medical-navy/90 transition-all shadow-xl">
                                I Need Blood <Activity className="w-5 h-5" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <div className="hidden lg:block lg:w-1/2 relative">
                    <motion.img
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        src="https://images.unsplash.com/photo-1615461066841-6116ecaaba74?auto=format&fit=crop&q=80&w=800"
                        alt="Medical Professional"
                        className="rounded-3xl shadow-2xl relative z-10"
                    />
                    <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 flex items-center gap-4 animate-bounce">
                        <div className="p-3 bg-red-100 rounded-lg">
                            <Heart className="text-red-600 fill-red-600 w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Lives Saved Today</p>
                            <p className="text-2xl font-extrabold text-medical-navy">1,248</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-white/50 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-medical-navy">Why Choose LifeLink AI?</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Zap, title: "Real-time Alerts", desc: "Instant notifications when your blood type is needed nearby." },
                            { icon: ShieldCheck, title: "Secure Data", desc: "Your health records are encrypted and managed with utmost privacy." },
                            { icon: Activity, title: "Smart Matching", desc: "Our AI predicts shortages and schedules donations efficiently." }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className="w-14 h-14 bg-blood/10 rounded-2xl flex items-center justify-center mb-6">
                                    <feature.icon className="text-blood w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <StatsCounter />
        </div>
    );
};

export default HomePage;
