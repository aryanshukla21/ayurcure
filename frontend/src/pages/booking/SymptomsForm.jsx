import React from 'react';
import { BookingProgress } from '../../components/booking/symptomsForm/BookingProgress';
import { IntakeForm } from '../../components/booking/symptomsForm/IntakeForm';

export const SymptomsForm = () => {
    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans flex flex-col">
            {/* Simplified Header for Booking Flow */}
            <header className="bg-white px-8 py-4 flex justify-between items-center border-b border-gray-100">
                <div className="text-2xl font-bold text-ayur-green flex items-center gap-2">
                    <span>🌿</span> AyurCure
                </div>
                <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
                    <a href="/" className="hover:text-ayur-green transition-colors">Home</a>
                    <a href="/dashboard/appointments" className="hover:text-ayur-green transition-colors">Appointments</a>
                    <a href="/consultations" className="hover:text-ayur-green transition-colors">Consultations</a>
                </nav>
                <div className="flex gap-4">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors text-xl">🔔</button>
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">👤</div>
                </div>
            </header>

            <main className="flex-1 w-full max-w-3xl mx-auto p-6 md:p-12">
                <BookingProgress step={3} totalSteps={4} title="Symptoms Details" percentage={75} />

                <IntakeForm />

                {/* Security & Privacy Notice */}
                <div className="mt-8 flex items-start gap-4 p-5 bg-[#FFF4ED]/50 rounded-2xl border border-orange-100/50">
                    <span className="text-ayur-orange text-xl">🛡️</span>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Your health data is encrypted and secure. We comply with medical privacy standards to ensure your consultation remains confidential.
                    </p>
                </div>

                {/* Support Link */}
                <div className="text-center mt-8 pb-8">
                    <button className="text-sm text-gray-500 hover:text-ayur-orange transition-colors">
                        Need help with the form? <span className="font-bold text-ayur-orange">Chat with Support</span>
                    </button>
                </div>
            </main>
        </div>
    );
};