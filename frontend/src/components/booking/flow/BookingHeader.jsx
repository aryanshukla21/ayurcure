import React from 'react';

export const BookingHeader = () => {
    return (
        <div className="mb-8">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <p className="text-ayur-orange font-bold text-sm tracking-wider uppercase mb-1">Appointment Booking</p>
                    <h1 className="text-3xl font-bold text-gray-900">Select Your Doctor</h1>
                </div>
                <div className="text-right">
                    <p className="text-gray-500 text-sm">Step 1 of 4</p>
                    <p className="text-ayur-orange font-bold">25% Complete</p>
                </div>
            </div>

            {/* Progress Bar Container */}
            <div className="relative mb-8">
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-[16%] h-full bg-ayur-orange rounded-full"></div>
                </div>

                {/* Step Indicators */}
                <div className="flex justify-between mt-4 text-xs font-bold text-gray-400">
                    <span className="text-ayur-orange">Doctor</span>
                    <span>Schedule</span>
                    <span>Patient Info</span>
                    <span>Symptoms</span>
                    <span>Review</span>
                    <span>Confirm</span>
                </div>
            </div>
        </div>
    );
};