import React, { useState } from 'react';
import { Navbar } from '../../components/landing/Navbar';
import { Footer } from '../../components/landing/Footer';
import { Button } from '../../components/common/Button';

export const DoctorProfile = () => {
    const [activeTab, setActiveTab] = useState('About');
    const [selectedDate, setSelectedDate] = useState('26');
    const [selectedTime, setSelectedTime] = useState('10:30 AM');

    const tabs = ["About", "Expertise", "Reviews", "Availability"];
    const dates = ["25", "26", "27", "28", "29"];
    const times = ["09:00 AM", "10:30 AM", "11:00 AM", "04:00 PM", "05:30 PM", "06:00 PM"];

    return (
        <div className="min-h-screen bg-gray-50 font-sans selection:bg-ayur-green selection:text-white">


            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Breadcrumb / Top Header */}
                <div className="text-sm font-bold text-gray-400 tracking-wider mb-8 uppercase">
                    AyurCure / Doctors / Dr. Ananya Sharma
                </div>

                {/* Profile Header Card */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 mb-8">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        {/* Doctor Image Placeholder */}
                        <div className="w-40 h-40 bg-ayur-green-light rounded-3xl flex-shrink-0 flex items-center justify-center text-5xl">
                            👩‍⚕️
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Dr. Ananya Sharma </h1>
                                    <p className="text-ayur-green font-bold mb-4">BAMS, MD in Ayurveda • 12 years exp.</p>
                                    <p className="text-gray-600 leading-relaxed max-w-2xl">
                                        Specialist in Panchakarma & Holistic Wellness. Dedicated to restoring balance through traditional Vedic healing practices combined with modern diagnostics
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline">Follow </Button>
                                    <Button variant="primary">Book Consultation </Button>
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-100 mt-6">
                                <div>
                                    <p className="text-2xl font-black text-gray-800">4.8 </p>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Rating </p>
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-gray-800">1500+</p>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Consultations</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-gray-800">1.2k</p>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Reviews</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-ayur-orange">₹800</p>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Fee</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Details & Reviews */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Tabs */}
                        <div className="flex gap-8 border-b border-gray-200">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-4 font-bold text-lg transition-colors ${activeTab === tab ? 'border-b-2 border-ayur-orange text-ayur-orange' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            {activeTab === 'About' && (
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Professional Bio</h3>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        Dr. Ananya Sharma is a distinguished Ayurvedic practitioner with over 12 years of clinical experience. She holds a Master's degree in Ayurveda (MD) from the prestigious National Institute of Ayurveda, Jaipur.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        Her approach integrates traditional Ayurvedic principles with a deep understanding of modem lifestyle disorders. She specializes in chronic digestive issues, stress-related ailments, and skin disorders using specialized Panchakarma therapies.
                                    </p>
                                </div>
                            )}

                            {/* Areas of Expertise */}
                            <div className="mt-10">
                                <h3 className="text-xl font-bold text-gray-800 mb-6">Areas of Expertise</h3>
                                <div className="flex flex-wrap gap-3">
                                    {["Panchakarma", "Dietary Therapy", "Pulse Diagnosis (Nadi Pariksha)", "Stress Management", "Herbal Pharmacology", "Joint & Bone Health"].map(skill => (
                                        <span key={skill} className="px-4 py-2 bg-ayur-green-light text-ayur-green font-bold rounded-full text-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Patient Reviews Section */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-bold text-gray-800">Patient Reviews</h3>
                                <button className="text-ayur-orange font-bold text-sm hover:underline">View All 1.2k Reviews</button>
                            </div>

                            <div className="space-y-6">
                                <div className="border-b border-gray-100 pb-6">
                                    <div className="flex justify-between mb-2">
                                        <h4 className="font-bold text-gray-900">Rohan Kapoor </h4>
                                        <span className="text-xs text-gray-400 font-bold uppercase">24 hours ago </span>
                                    </div>
                                    <div className="text-yellow-400 text-sm mb-3">★★★★★ </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        "Extremely knowledgeable and patient. Her dietary recommendations helped me manage my acidity issues which I had for years. Truly life-changing!"
                                    </p>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <h4 className="font-bold text-gray-900">Meera Arya</h4>
                                        <span className="text-xs text-gray-400 font-bold uppercase">1 week ago</span>
                                    </div>
                                    <div className="text-yellow-400 text-sm mb-3">★★★★★</div>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        "The clinic atmosphere is very peaceful. Dr. Sharma explains the 'why' behind every treatment. Highly recommend her for Panchakarma sessions.""
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Booking Widget */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 sticky top-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Book a Slot</h3>

                            {/* Calendar Strip */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-bold text-gray-600">October 2023</span>
                                    <div className="flex gap-2">
                                        <button className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center text-gray-400">&lt;</button>
                                        <button className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center text-gray-600">&gt;</button>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    {dates.map((date) => (
                                        <div
                                            key={date}
                                            onClick={() => setSelectedDate(date)}
                                            className={`flex flex-col items-center justify-center w-12 h-14 rounded-xl cursor-pointer transition-colors ${selectedDate === date ? 'bg-ayur-green text-white shadow-md' : 'hover:bg-ayur-green-light text-gray-600'}`}
                                        >
                                            <span className="text-[10px] uppercase font-bold opacity-70 mb-1">MON</span>
                                            <span className="font-black text-lg">{date}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Time Slots */}
                            <div className="mb-8">
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Available Times</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {times.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`py-3 rounded-xl border text-sm font-bold transition-all ${selectedTime === time ? 'border-ayur-orange bg-orange-50 text-ayur-orange' : 'border-gray-200 text-gray-600 hover:border-ayur-orange hover:text-ayur-orange'}`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Button variant="primary" className="w-full py-4 text-lg shadow-xl shadow-ayur-orange/20 mb-6">
                                Confirm Booking
                            </Button>

                            {/* Location Info */}
                            <div className="pt-6 border-t border-gray-100">
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Location</p>
                                <div className="flex gap-3 items-start">
                                    <span className="text-ayur-orange mt-0.5">📍</span>
                                    <p className="text-sm font-medium text-gray-600 leading-relaxed">
                                        Ayur Care Wellness Hub, Suite 402, Lotus Square, Mumbai
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};