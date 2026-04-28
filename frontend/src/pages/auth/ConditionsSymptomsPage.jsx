import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, X, Star, GraduationCap, Languages } from 'lucide-react';

const ConditionsSymptomsPage = () => {
    const navigate = useNavigate();
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [showRecommendations, setShowRecommendations] = useState(false);

    const commonSymptoms = [
        "Sleep Issues", "Anxiety & Stress", "Digestion/Gut Health",
        "Hair Fall", "Skin Issues", "Joint Pain",
        "Weight Management", "Low Immunity"
    ];

    const toggleSymptom = (symptom) => {
        if (selectedSymptoms.includes(symptom)) {
            setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
        } else {
            setSelectedSymptoms([...selectedSymptoms, symptom]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Trigger the popup instead of navigating away
        setShowRecommendations(true);
    };

    const closePopupAndFinish = () => {
        setShowRecommendations(false);
        navigate('/patient/dashboard');
    };

    return (
        <div className="bg-[#FAF7F2] text-gray-900 min-h-screen font-sans relative">

            {/* --- BACKGROUND PAGE (SYMPTOMS FORM) --- */}
            <header className="flex flex-col items-center justify-center w-full py-8 px-4">
                <div className="text-2xl font-extrabold text-[#3A6447] tracking-tight">AyurCare360</div>
            </header>

            <main className="min-h-[calc(100vh-180px)] flex items-center justify-center px-6 py-12">
                <div className="max-w-xl w-full">
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 overflow-hidden border border-[#EFEBE1] shadow-sm">
                            <img alt="AyurCare360 Logo" className="w-full h-full object-cover p-2 rounded-full" src="/Favicon_up.png" />
                        </div>

                        <div className="flex flex-col items-center gap-2 mb-4">
                            <span className="text-[10px] font-bold tracking-widest uppercase text-[#3A6447]">Step 04</span>
                            <div className="flex gap-1">
                                <div className="h-1.5 w-4 rounded-full bg-[#3A6447] opacity-30"></div>
                                <div className="h-1.5 w-4 rounded-full bg-[#3A6447] opacity-30"></div>
                                <div className="h-1.5 w-4 rounded-full bg-[#3A6447] opacity-30"></div>
                                <div className="h-1.5 w-8 rounded-full bg-[#3A6447]"></div>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 text-center">Health Profile</h1>
                        <p className="mt-4 text-gray-500 font-medium text-sm text-center max-w-md">Select your primary concerns so we can match you with the right Ayurvedic practitioners.</p>
                    </div>

                    <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-[#EFEBE1]">
                        <form className="space-y-8" onSubmit={handleSubmit}>

                            <div className="space-y-4">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Select Symptoms & Goals</label>
                                <div className="flex flex-wrap gap-3">
                                    {commonSymptoms.map((symptom) => (
                                        <button
                                            key={symptom}
                                            type="button"
                                            onClick={() => toggleSymptom(symptom)}
                                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${selectedSymptoms.includes(symptom)
                                                ? 'bg-[#3A6447] text-white border-[#3A6447] shadow-sm'
                                                : 'bg-white text-gray-600 border-[#EFEBE1] hover:border-[#3A6447]/50 hover:bg-[#FAF7F2]'
                                                }`}
                                        >
                                            {symptom}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1" htmlFor="details">
                                    Any known existing diseases? (Optional)
                                </label>
                                <textarea
                                    id="details"
                                    className="w-full bg-white border border-[#EFEBE1] focus:border-[#3A6447] focus:ring-1 focus:ring-[#3A6447]/30 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-900 placeholder:text-gray-400 resize-none outline-none transition-all"
                                    placeholder="E.g., Diabetes, Hypertension, Thyroid..."
                                    rows="3"
                                ></textarea>
                            </div>

                            <div className="pt-6 border-t border-[#EFEBE1]">
                                <button className="w-full bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold h-14 rounded-full shadow-sm transition-colors flex items-center justify-center gap-2 group" type="submit">
                                    Find My Experts
                                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <footer className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 w-full py-8 px-4 bg-[#FAF7F2] mt-auto">
                <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">© {new Date().getFullYear()} AYURCARE360</span>
            </footer>

            {/* --- POPUP / MODAL (DOCTOR RECOMMENDATIONS) --- */}
            {showRecommendations && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-300">

                    <div className="bg-[#FAF7F2] rounded-[40px] w-full max-w-5xl max-h-[90vh] overflow-y-auto relative shadow-2xl border border-white/20">

                        {/* Close Cross Button */}
                        <button
                            onClick={closePopupAndFinish}
                            className="absolute top-6 right-6 md:top-8 md:right-8 p-3 bg-white hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full shadow-sm transition-colors z-10"
                            aria-label="Close"
                        >
                            <X size={24} />
                        </button>

                        {/* Modal Content - Reusing the Doctors Page UI */}
                        <div className="px-6 py-12 md:p-16">
                            <section className="text-center mb-12 max-w-2xl mx-auto">
                                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">Recommended for you</h2>
                                <p className="text-gray-600 font-medium text-lg mb-4">
                                    Based on your symptoms <span className="text-[#3A6447] font-bold">({selectedSymptoms.join(', ') || 'General Wellness'})</span>, we've matched you with the most suitable Ayurvedic experts.
                                </p>
                            </section>

                            {/* Featured Doctor */}
                            <section className="mb-8">
                                <div className="bg-white rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-sm border border-[#EFEBE1]">
                                    <div className="md:w-2/5 relative h-72 md:h-auto">
                                        <img className="w-full h-full object-cover" alt="Dr. Ananya Sharma" src="https://images.unsplash.com/photo-1594824416965-4f51e06d2036?auto=format&fit=crop&q=80&w=400" />
                                        <div className="absolute top-4 left-4 bg-white text-[#3A6447] border border-[#EFEBE1] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">Featured Expert</div>
                                    </div>

                                    <div className="p-8 flex flex-col justify-between md:w-3/5">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Dr. Ananya Sharma</h3>
                                                <div className="flex items-center text-yellow-500 bg-yellow-50 px-2 py-1 rounded-lg">
                                                    <Star size={14} className="fill-current" />
                                                    <span className="ml-1 text-sm font-bold text-yellow-700">4.9</span>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 font-bold text-sm mb-4">Stress & Sleep Management</p>
                                            <div className="flex flex-wrap gap-y-3 gap-x-6 mb-8 text-sm text-gray-500 font-medium">
                                                <div className="flex items-center gap-2">
                                                    <GraduationCap size={18} className="text-[#3A6447]" />
                                                    <span>15+ years experience</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Languages size={18} className="text-[#3A6447]" />
                                                    <span>English, Hindi, Sanskrit</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-[#EFEBE1] gap-4">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Consultation Fee</p>
                                                <p className="text-xl md:text-2xl font-extrabold text-[#3A6447]">₹1200</p>
                                            </div>
                                            {/* UPDATED NAVIGATION HERE */}
                                            <button onClick={() => navigate('/patient/book-appointment?doctor=ananya')} className="w-full sm:w-auto bg-[#3A6447] hover:bg-[#2C4D36] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-colors shadow-sm">
                                                Book Consult
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Other Doctors */}
                            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-white rounded-[32px] p-6 flex flex-col border border-[#EFEBE1] shadow-sm">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-[#FAF7F2]">
                                            <img className="w-full h-full object-cover" alt="Dr. Vikram Mehra" src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900">Dr. Vikram Mehra</h4>
                                            <p className="text-[10px] text-[#3A6447] font-bold uppercase tracking-widest mt-1">Internal Medicine</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#EFEBE1]">
                                        <span className="font-extrabold text-[#3A6447]">₹1000</span>
                                        {/* UPDATED NAVIGATION HERE */}
                                        <button
                                            onClick={() => navigate('/patient/book-appointment?doctor=vikram')}
                                            className="text-sm font-bold text-gray-900 hover:text-[#3A6447] flex items-center gap-1 group"
                                        >
                                            Book <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white rounded-[32px] p-6 flex flex-col border border-[#EFEBE1] shadow-sm">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-[#FAF7F2]">
                                            <img className="w-full h-full object-cover" alt="Dr. Priya Iyer" src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900">Dr. Priya Iyer</h4>
                                            <p className="text-[10px] text-[#3A6447] font-bold uppercase tracking-widest mt-1">Holistic Wellness</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#EFEBE1]">
                                        <span className="font-extrabold text-[#3A6447]">₹900</span>
                                        {/* UPDATED NAVIGATION HERE */}
                                        <button
                                            onClick={() => navigate('/patient/book-appointment?doctor=priya')}
                                            className="text-sm font-bold text-gray-900 hover:text-[#3A6447] flex items-center gap-1 group"
                                        >
                                            Book <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                        </button>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConditionsSymptomsPage;