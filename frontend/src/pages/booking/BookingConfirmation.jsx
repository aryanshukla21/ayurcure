import React from 'react';
import { ConfirmationHeader } from '../../components/booking/confirmation/ConfirmationHeader';
import { AppointmentDetailsCard } from '../../components/booking/confirmation/AppointmentDetailsCard';
import { ConfirmationActions } from '../../components/booking/confirmation/ConfirmationActions';

export const BookingConfirmation = () => {
    return (
        <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6 font-sans">
            <div className="bg-white w-full max-w-3xl rounded-[32px] shadow-sm border border-gray-100 flex flex-col overflow-hidden relative">

                {/* Top Navbar / Close */}
                <div className="px-8 py-6 flex justify-between items-center absolute top-0 w-full z-10">
                    <div className="flex items-center gap-2 text-xl font-bold text-ayur-green bg-white/80 px-4 py-2 rounded-xl backdrop-blur-sm">
                        <span>🌿</span> AyurCure
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white/80 shadow-sm backdrop-blur-sm flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                        ✕
                    </button>
                </div>

                <div className="pt-24 pb-12 px-8 md:px-16 flex flex-col items-center text-center">

                    <ConfirmationHeader />

                    <p className="text-gray-600 mt-8 mb-8 text-lg">
                        Your appointment with <span className="font-bold text-gray-900">AyurCure Holistic Center</span> has been successfully scheduled.
                    </p>

                    <AppointmentDetailsCard />

                    <ConfirmationActions />

                </div>
            </div>
        </div>
    );
};