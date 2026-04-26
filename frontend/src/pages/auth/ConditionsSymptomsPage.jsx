import React from 'react';
import { Link } from 'react-router-dom';

const ConditionsSymptomsPage = () => {
    return (
        <div className="bg-[#F5F1E8] text-[#1d1b16] min-h-screen flex flex-col font-['Manrope']">
            {/* TopAppBar Branding Layer */}
            <header className="flex flex-col items-center justify-center w-full py-8 px-4">
                <div className="text-2xl font-['Noto_Serif'] font-bold text-[#376645] tracking-tighter mb-4">
                    AyurCare360
                </div>
                <div>
                    <img alt="AyurCare360 Logo" className="w-16 h-16 rounded-full object-cover shadow-sm ring-1 ring-[#c1c9bf]/20 bg-white p-2" src="/Favicon_up.png" />
                </div>
            </header>

            {/* Main Content Canvas */}
            <main className="flex-grow flex flex-col items-center justify-start px-6 pb-24 relative overflow-hidden">

                {/* Step Indicator */}
                <div className="w-full max-w-2xl mt-4 mb-8 flex flex-col items-center">
                    <div className="flex items-center space-x-3 mb-2">
                        <span className="text-[10px] font-['Manrope'] font-extrabold uppercase tracking-[0.2em] text-[#717971]">Step 04 of 04</span>
                        <div className="flex space-x-1">
                            <div className="w-8 h-1 rounded-full bg-[#5C7F63]/20"></div>
                            <div className="w-8 h-1 rounded-full bg-[#5C7F63]/20"></div>
                            <div className="w-8 h-1 rounded-full bg-[#5C7F63]/20"></div>
                            <div className="w-12 h-1 rounded-full bg-[#5C7F63] shadow-[0_0_8px_rgba(92,127,99,0.3)]"></div>
                        </div>
                    </div>
                </div>

                {/* The Ritual Intake Card */}
                <div className="w-full max-w-2xl bg-[#ffffff] rounded-xl p-8 md:p-12 transition-all relative z-10">
                    <section className="mb-12 text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-['Noto_Serif'] italic tracking-tight text-[#5C7F63] mb-4">
                            Tell us what you're experiencing
                        </h1>
                        <p className="text-[#414941] font-['Manrope'] text-sm leading-relaxed max-w-md">
                            Select all that apply to help us understand your condition
                        </p>
                    </section>

                    {/* Section 1: Conditions Grid */}
                    <fieldset className="mb-12">
                        <legend className="text-xs font-['Manrope'] font-bold uppercase tracking-widest text-[#717971] mb-6">Common Conditions</legend>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                            <label className="group relative cursor-pointer">
                                <input className="peer sr-only" name="condition" type="checkbox" value="Skin Issues" />
                                <div className="h-full px-4 py-6 bg-[#f9f3e9] rounded-lg transition-all duration-300 peer-checked:bg-[#5C7F63] peer-checked:text-[#ffffff] hover:bg-[#ede7de] group-active:scale-95 flex flex-col items-center text-center justify-center">
                                    <span className="material-symbols-outlined mb-2 text-[#5C7F63] peer-checked:text-[#ffffff]">spa</span>
                                    <span className="text-xs font-semibold font-['Manrope'] leading-tight">Skin Issues</span>
                                </div>
                            </label>

                            <label className="group relative cursor-pointer">
                                <input className="peer sr-only" name="condition" type="checkbox" value="Sleep / Anxiety" />
                                <div className="h-full px-4 py-6 bg-[#f9f3e9] rounded-lg transition-all duration-300 peer-checked:bg-[#5C7F63] peer-checked:text-[#ffffff] hover:bg-[#ede7de] group-active:scale-95 flex flex-col items-center text-center justify-center">
                                    <span className="material-symbols-outlined mb-2 text-[#5C7F63] peer-checked:text-[#ffffff]">bedtime</span>
                                    <span className="text-xs font-semibold font-['Manrope'] leading-tight">Sleep / Anxiety</span>
                                </div>
                            </label>

                            <label className="group relative cursor-pointer">
                                <input className="peer sr-only" name="condition" type="checkbox" value="Diabetes" />
                                <div className="h-full px-4 py-6 bg-[#f9f3e9] rounded-lg transition-all duration-300 peer-checked:bg-[#5C7F63] peer-checked:text-[#ffffff] hover:bg-[#ede7de] group-active:scale-95 flex flex-col items-center text-center justify-center">
                                    <span className="material-symbols-outlined mb-2 text-[#5C7F63] peer-checked:text-[#ffffff]">monitor_heart</span>
                                    <span className="text-xs font-semibold font-['Manrope'] leading-tight">Diabetes</span>
                                </div>
                            </label>

                            <label className="group relative cursor-pointer">
                                <input className="peer sr-only" name="condition" type="checkbox" value="Joint Pain" />
                                <div className="h-full px-4 py-6 bg-[#f9f3e9] rounded-lg transition-all duration-300 peer-checked:bg-[#5C7F63] peer-checked:text-[#ffffff] hover:bg-[#ede7de] group-active:scale-95 flex flex-col items-center text-center justify-center">
                                    <span className="material-symbols-outlined mb-2 text-[#5C7F63] peer-checked:text-[#ffffff]">accessibility_new</span>
                                    <span className="text-xs font-semibold font-['Manrope'] leading-tight">Joint Pain</span>
                                </div>
                            </label>

                            <label className="group relative cursor-pointer">
                                <input className="peer sr-only" name="condition" type="checkbox" value="Digestion" />
                                <div className="h-full px-4 py-6 bg-[#f9f3e9] rounded-lg transition-all duration-300 peer-checked:bg-[#5C7F63] peer-checked:text-[#ffffff] hover:bg-[#ede7de] group-active:scale-95 flex flex-col items-center text-center justify-center">
                                    <span className="material-symbols-outlined mb-2 text-[#5C7F63] peer-checked:text-[#ffffff]">nutrition</span>
                                    <span className="text-xs font-semibold font-['Manrope'] leading-tight">Digestion</span>
                                </div>
                            </label>

                            <label className="group relative cursor-pointer">
                                <input className="peer sr-only" name="condition" type="checkbox" value="PCOS / PCOD" />
                                <div className="h-full px-4 py-6 bg-[#f9f3e9] rounded-lg transition-all duration-300 peer-checked:bg-[#5C7F63] peer-checked:text-[#ffffff] hover:bg-[#ede7de] group-active:scale-95 flex flex-col items-center text-center justify-center">
                                    <span className="material-symbols-outlined mb-2 text-[#5C7F63] peer-checked:text-[#ffffff]">female</span>
                                    <span className="text-xs font-semibold font-['Manrope'] leading-tight">PCOS / PCOD</span>
                                </div>
                            </label>

                            <label className="group relative cursor-pointer">
                                <input className="peer sr-only" name="condition" type="checkbox" value="Hypertension" />
                                <div className="h-full px-4 py-6 bg-[#f9f3e9] rounded-lg transition-all duration-300 peer-checked:bg-[#5C7F63] peer-checked:text-[#ffffff] hover:bg-[#ede7de] group-active:scale-95 flex flex-col items-center text-center justify-center">
                                    <span className="material-symbols-outlined mb-2 text-[#5C7F63] peer-checked:text-[#ffffff]">heart_broken</span>
                                    <span className="text-xs font-semibold font-['Manrope'] leading-tight">Hypertension</span>
                                </div>
                            </label>

                            <label className="group relative cursor-pointer">
                                <input className="peer sr-only" name="condition" type="checkbox" value="High Cholesterol" />
                                <div className="h-full px-4 py-6 bg-[#f9f3e9] rounded-lg transition-all duration-300 peer-checked:bg-[#5C7F63] peer-checked:text-[#ffffff] hover:bg-[#ede7de] group-active:scale-95 flex flex-col items-center text-center justify-center">
                                    <span className="material-symbols-outlined mb-2 text-[#5C7F63] peer-checked:text-[#ffffff]">bloodtype</span>
                                    <span className="text-xs font-semibold font-['Manrope'] leading-tight">High Cholesterol</span>
                                </div>
                            </label>

                            <label className="group relative cursor-pointer">
                                <input className="peer sr-only" name="condition" type="checkbox" value="Obesity" />
                                <div className="h-full px-4 py-6 bg-[#f9f3e9] rounded-lg transition-all duration-300 peer-checked:bg-[#5C7F63] peer-checked:text-[#ffffff] hover:bg-[#ede7de] group-active:scale-95 flex flex-col items-center text-center justify-center">
                                    <span className="material-symbols-outlined mb-2 text-[#5C7F63] peer-checked:text-[#ffffff]">scale</span>
                                    <span className="text-xs font-semibold font-['Manrope'] leading-tight">Obesity</span>
                                </div>
                            </label>

                            <label className="group relative cursor-pointer">
                                <input className="peer sr-only" name="condition" type="checkbox" value="Hair Fall" />
                                <div className="h-full px-4 py-6 bg-[#f9f3e9] rounded-lg transition-all duration-300 peer-checked:bg-[#5C7F63] peer-checked:text-[#ffffff] hover:bg-[#ede7de] group-active:scale-95 flex flex-col items-center text-center justify-center">
                                    <span className="material-symbols-outlined mb-2 text-[#5C7F63] peer-checked:text-[#ffffff]">face_6</span>
                                    <span className="text-xs font-semibold font-['Manrope'] leading-tight">Hair Fall</span>
                                </div>
                            </label>

                            <label className="group relative cursor-pointer">
                                <input className="peer sr-only" name="condition" type="checkbox" value="Asthma" />
                                <div className="h-full px-4 py-6 bg-[#f9f3e9] rounded-lg transition-all duration-300 peer-checked:bg-[#5C7F63] peer-checked:text-[#ffffff] hover:bg-[#ede7de] group-active:scale-95 flex flex-col items-center text-center justify-center">
                                    <span className="material-symbols-outlined mb-2 text-[#5C7F63] peer-checked:text-[#ffffff]">air</span>
                                    <span className="text-xs font-semibold font-['Manrope'] leading-tight">Asthma</span>
                                </div>
                            </label>
                        </div>
                    </fieldset>

                    {/* Section 2: Symptoms Textarea */}
                    <div className="mb-12">
                        <label className="text-xs font-['Manrope'] font-bold uppercase tracking-widest text-[#717971] block mb-4" htmlFor="symptoms">
                            Describe your symptoms
                        </label>
                        <textarea
                            className="w-full bg-[#ffffff] border-none ring-1 ring-[#c1c9bf]/30 rounded-lg p-4 font-['Manrope'] text-sm text-[#1d1b16] focus:ring-[#5C7F63] focus:ring-opacity-20 transition-all placeholder:text-[#c1c9bf]/60 outline-none"
                            id="symptoms"
                            placeholder="Describe any specific sensations, patterns, or triggers you've noticed..."
                            rows="4"
                        ></textarea>
                    </div>

                    {/* Section 3: Upload Reports */}
                    <div className="mb-12">
                        <label className="text-xs font-['Manrope'] font-bold uppercase tracking-widest text-[#717971] block mb-4">
                            Upload Medical Reports (Optional)
                        </label>
                        <div className="relative group">
                            <input accept=".pdf,.jpg,.jpeg,.png" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" type="file" />
                            <div className="border-2 border-dashed border-[#c1c9bf]/30 rounded-xl p-8 flex flex-col items-center justify-center bg-[#f9f3e9]/50 group-hover:bg-[#f9f3e9] transition-colors">
                                <span className="material-symbols-outlined text-[#c1c9bf] text-4xl mb-2">upload_file</span>
                                <p className="text-sm font-['Manrope'] text-[#414941]">Drop PDF, JPG or PNG files here</p>
                                <p className="text-[10px] text-[#717971] mt-1">Maximum file size: 10MB</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <button type="button" className="text-[#717971] text-sm font-['Manrope'] font-bold uppercase tracking-widest hover:text-[#5C7F63] transition-colors flex items-center group">
                            <span className="material-symbols-outlined mr-2 text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                            Previous
                        </button>
                        <button type="button" className="w-full md:w-auto px-10 py-4 bg-[#5C7F63] text-[#ffffff] rounded-full font-bold text-sm tracking-wide flex items-center justify-center shadow-lg shadow-[#5C7F63]/20 hover:scale-105 active:scale-95 transition-all">
                            Continue
                            <span className="material-symbols-outlined ml-2 text-lg">arrow_forward</span>
                        </button>
                    </div>
                </div>

                {/* Decorative Elements (You can replace the src links below if you have your own local assets) */}
                <div className="absolute top-40 left-10 opacity-10 pointer-events-none hidden lg:block z-0">
                    <img alt="botanical illustration" className="w-48 h-auto rotate-12" src="https://images.unsplash.com/photo-1605553911579-22db148fb0b3?auto=format&fit=crop&q=80&w=400&h=400&blend=000000&blend-mode=overlay&blend-alpha=80" />
                </div>
                <div className="absolute bottom-20 right-10 opacity-10 pointer-events-none hidden lg:block z-0">
                    <img alt="botanical illustration" className="w-56 h-auto -rotate-12" src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=400&h=400&blend=000000&blend-mode=overlay&blend-alpha=80" />
                </div>
            </main>

            {/* Minimal Footer */}
            <footer className="flex flex-col items-center justify-center w-full py-8 px-4 bg-[#F5F1E8] gap-4">
                <div className="flex space-x-6">
                    <Link className="text-[10px] font-['Manrope'] tracking-widest uppercase text-stone-500 hover:text-[#5C7F63] transition-colors duration-300" to="/privacy">Privacy Policy</Link>
                    <Link className="text-[10px] font-['Manrope'] tracking-widest uppercase text-stone-500 hover:text-[#5C7F63] transition-colors duration-300" to="/terms">Terms & Conditions</Link>
                </div>
                <span className="text-[10px] font-['Manrope'] tracking-widest uppercase text-stone-400">© {new Date().getFullYear()} AYURCARE360</span>
            </footer>
        </div>
    );
};

export default ConditionsSymptomsPage;