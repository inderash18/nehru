import { useState } from 'react';
import { ShieldCheck, XCircle, Info, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EligibilityChecker = () => {
    const [step, setStep] = useState(0);
    const questions = [
        { q: "Are you between 18 and 65 years old?", id: 'age' },
        { q: "Do you weigh at least 50kg (110 lbs)?", id: 'weight' },
        { q: "Have you donated blood in the last 3 months?", id: 'recent', invert: true },
        { q: "Are you feeling healthy and well today?", id: 'healthy' }
    ];

    const handleNext = () => setStep(step + 1);

    return (
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-50 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-medical-blue/10 rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="text-medical-blue w-7 h-7" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-medical-navy">Eligibility Quiz</h3>
                    <p className="text-sm text-gray-500">Quick check before you book</p>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step < questions.length ? (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <p className="text-2xl font-medium text-medical-navy leading-tight">{questions[step].q}</p>
                        <div className="flex gap-4">
                            <button
                                onClick={handleNext}
                                className="flex-1 py-4 bg-gray-50 hover:bg-green-500 hover:text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                            >
                                Yes <Check className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="flex-1 py-4 bg-gray-50 hover:bg-red-500 hover:text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                            >
                                No <XCircle className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-6"
                    >
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="text-green-600 w-10 h-10" />
                        </div>
                        <h4 className="text-2xl font-bold text-medical-navy mb-4">You're likely eligible!</h4>
                        <p className="text-gray-500 mb-8">Final medical screening will be done at the donation center.</p>
                        <button className="px-8 py-4 bg-blood text-white rounded-2xl font-bold hover:bg-blood-dark transition-all shadow-lg shadow-blood/20">
                            Book Appointment Now
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-10 pt-8 border-t border-gray-50 flex justify-between items-center">
                <div className="flex gap-2">
                    {questions.map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all ${i <= step ? 'w-8 bg-medical-blue' : 'w-2 bg-gray-100'}`}></div>
                    ))}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <Info className="w-4 h-4" /> Medical Privacy Secure
                </div>
            </div>
        </div>
    );
};

export default EligibilityChecker;
