import React from 'react';

export const AppointmentDetailsCard = () => {
    return (
        <div className="bg-gray-50 rounded-[24px] p-8 w-full text-left mb-8 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-lg">
                <span className="text-ayur-orange">📅</span> Appointment Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-8">
                <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Service</div>
                    <div className="font-bold text-gray-900">Ayurvedic Full Body Detox</div>
                </div>

                <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Practitioner</div>
                    <div className="font-bold text-gray-900">Dr. Ananya Sharma</div>
                </div>

                <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Date</div>
                    <div className="font-bold text-gray-900">Monday, Oct 24, 2023</div>
                </div>

                <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Time</div>
                    <div className="font-bold text-gray-900">10:30 AM - 12:00 PM</div>
                </div>
            </div>

            <div className="pt-6 border-t border-gray-200 flex gap-4 items-start">
                <div className="text-ayur-orange text-xl mt-0.5">📍</div>
                <div>
                    <div className="font-bold text-gray-900">AyurCure Wellness Plaza</div>
                    <div className="text-sm text-gray-500 mt-1 leading-relaxed">
                        123 Healing Way, Suite 400, San Francisco, CA
                    </div>
                </div>
            </div>
        </div>
    );
};