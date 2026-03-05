import React from 'react';

export const ConfirmationHeader = () => {
    return (
        <div className="w-full flex flex-col items-center">
            {/* Checkmark Icon */}
            <div className="w-16 h-16 bg-ayur-orange rounded-full flex items-center justify-center text-white text-3xl shadow-lg shadow-ayur-orange/30 z-10 -mb-8 border-4 border-white">
                ✓
            </div>

            {/* Banner Card */}
            <div className="w-full bg-gradient-to-br from-[#8C5A35] to-[#B37B4D] rounded-3xl pt-14 pb-10 px-8 text-white shadow-md relative overflow-hidden">
                {/* Decorative Overlay */}
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Booking Confirmed!</h1>
                    <p className="text-white/80 font-medium tracking-wide">
                        Step 6 of 6: Your journey to wellness begins.
                    </p>
                </div>
            </div>
        </div>
    );
};