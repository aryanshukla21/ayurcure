import React from 'react';

export const BookingFooter = () => {
    return (
        <footer className="bg-white border-t border-gray-200 py-4 px-8 mt-auto sticky bottom-0 z-10">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <button className="text-gray-500 font-bold hover:text-gray-800 transition-colors flex items-center gap-2">
                    ← Cancel Booking
                </button>

                <div className="flex items-center gap-6">
                    <span className="text-sm font-medium text-gray-400 hidden md:block">
                        Choose a doctor to proceed to step 2
                    </span>
                    <button className="bg-gray-200 text-gray-500 px-8 py-3.5 rounded-2xl font-bold cursor-not-allowed">
                        Next: Choose Schedule
                    </button>
                </div>
            </div>
        </footer>
    );
};