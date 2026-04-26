import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';

const ProfileCompletionPage = () => {
    return (
        <div className="bg-[#FAF7F2] text-gray-900 min-h-screen font-sans">
            <header className="flex flex-col items-center justify-center w-full py-8 px-4">
                <div className="text-2xl font-extrabold text-[#3A6447] tracking-tight">AyurCare360</div>
            </header>

            <main className="min-h-[calc(100vh-180px)] flex items-center justify-center px-6 py-12">
                <div className="max-w-xl w-full">
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 overflow-hidden border border-[#EFEBE1] shadow-sm">
                            <img alt="AyurCare360 Logo" className="w-full h-full object-cover p-2" src="/Favicon_up.png" />
                        </div>

                        <div className="flex flex-col items-center gap-2 mb-4">
                            <span className="text-[10px] font-bold tracking-widest uppercase text-[#3A6447]">Step 03</span>
                            <div className="flex gap-1">
                                <div className="h-1.5 w-4 rounded-full bg-[#3A6447] opacity-30"></div>
                                <div className="h-1.5 w-4 rounded-full bg-[#3A6447] opacity-30"></div>
                                <div className="h-1.5 w-8 rounded-full bg-[#3A6447]"></div>
                                <div className="h-1.5 w-4 rounded-full bg-[#EFEBE1]"></div>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 text-center">Complete your profile</h1>
                        <p className="mt-4 text-gray-500 font-medium text-sm text-center max-w-sm">This helps us personalize your Ayurvedic care</p>
                    </div>

                    <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-[#EFEBE1]">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="space-y-2 col-span-full">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                                    <input className="w-full h-12 bg-white border border-[#EFEBE1] rounded-xl px-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:border-[#3A6447] focus:ring-1 focus:ring-[#3A6447]/30 transition-all outline-none" placeholder="Aarav Sharma" type="text" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Email</label>
                                    <input className="w-full h-12 bg-white border border-[#EFEBE1] rounded-xl px-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:border-[#3A6447] focus:ring-1 focus:ring-[#3A6447]/30 transition-all outline-none" placeholder="aarav@example.com" type="email" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Password</label>
                                    <input className="w-full h-12 bg-white border border-[#EFEBE1] rounded-xl px-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:border-[#3A6447] focus:ring-1 focus:ring-[#3A6447]/30 transition-all outline-none" placeholder="••••••••" type="password" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Gender</label>
                                    <div className="relative">
                                        <select defaultValue="" className="w-full h-12 bg-white border border-[#EFEBE1] rounded-xl px-4 text-sm font-medium text-gray-900 appearance-none focus:border-[#3A6447] focus:ring-1 focus:ring-[#3A6447]/30 transition-all outline-none">
                                            <option disabled value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Non-binary">Non-binary</option>
                                            <option value="Prefer not to say">Prefer not to say</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            <ChevronDown size={18} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Age</label>
                                    <input className="w-full h-12 bg-white border border-[#EFEBE1] rounded-xl px-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:border-[#3A6447] focus:ring-1 focus:ring-[#3A6447]/30 transition-all outline-none" placeholder="28" type="number" />
                                </div>

                                <div className="space-y-2 col-span-full">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Address</label>
                                    <input className="w-full h-12 bg-white border border-[#EFEBE1] rounded-xl px-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:border-[#3A6447] focus:ring-1 focus:ring-[#3A6447]/30 transition-all outline-none" placeholder="123 Wellness Lane, Green Park" type="text" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">State</label>
                                    <input className="w-full h-12 bg-white border border-[#EFEBE1] rounded-xl px-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:border-[#3A6447] focus:ring-1 focus:ring-[#3A6447]/30 transition-all outline-none" placeholder="Maharashtra" type="text" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Pincode</label>
                                    <input className="w-full h-12 bg-white border border-[#EFEBE1] rounded-xl px-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:border-[#3A6447] focus:ring-1 focus:ring-[#3A6447]/30 transition-all outline-none" placeholder="400001" type="text" />
                                </div>
                            </div>

                            <div className="pt-6">
                                <button className="w-full bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold h-12 rounded-full shadow-sm transition-colors flex items-center justify-center gap-2 group" type="submit">
                                    Continue
                                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                </button>
                                <p className="text-center mt-6 text-[10px] text-gray-400 uppercase tracking-widest font-bold">Secure & Confidential</p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <footer className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 w-full py-8 px-4 bg-[#FAF7F2]">
                <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">© {new Date().getFullYear()} AYURCARE360</span>
                <div className="flex gap-6">
                    <Link className="text-[10px] font-bold text-gray-400 tracking-widest uppercase hover:text-[#3A6447] transition-colors" to="/privacy">PRIVACY POLICY</Link>
                    <Link className="text-[10px] font-bold text-gray-400 tracking-widest uppercase hover:text-[#3A6447] transition-colors" to="/terms">TERMS & CONDITIONS</Link>
                </div>
            </footer>
        </div>
    );
};

export default ProfileCompletionPage;