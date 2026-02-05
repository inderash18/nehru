import { Droplet, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="bg-blood p-1.5 rounded-lg">
                                <Droplet className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold text-medical-navy">LifeLink AI</span>
                        </div>
                        <p className="text-gray-500 max-w-sm leading-relaxed">
                            We are a smart healthcare initiative dedicated to revolutionizing
                            blood donation through artificial intelligence and real-time coordination.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-medical-navy mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-gray-500 text-sm">
                            <li><a href="#" className="hover:text-blood">Blood Stock</a></li>
                            <li><a href="#" className="hover:text-blood">Find Donors</a></li>
                            <li><a href="#" className="hover:text-blood">Emergency Request</a></li>
                            <li><a href="#" className="hover:text-blood">Eligibility Quiz</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-medical-navy mb-6">Contact Us</h4>
                        <div className="flex gap-4">
                            <div className="p-3 bg-gray-50 rounded-xl hover:bg-blood/10 hover:text-blood transition-all cursor-pointer">
                                <Twitter className="w-5 h-5" />
                            </div>
                            <div className="p-3 bg-gray-50 rounded-xl hover:bg-blood/10 hover:text-blood transition-all cursor-pointer">
                                <Github className="w-5 h-5" />
                            </div>
                            <div className="p-3 bg-gray-50 rounded-xl hover:bg-blood/10 hover:text-blood transition-all cursor-pointer">
                                <Linkedin className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-bold uppercase tracking-widest">
                    <p>© 2026 LifeLink AI Systems. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
