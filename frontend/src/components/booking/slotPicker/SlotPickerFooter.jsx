import React from 'react';
import { Button } from '../../common/Button';

export const SlotPickerFooter = ({ selectedDate, selectedTime }) => {
    return (
        <div>
            <div className="bg-[#FFF4ED] px-8 py-6 flex flex-wrap md:flex-nowrap items-center justify-between gap-6 border-t border-orange-100">

                {/* Left Action & Doctor Info */}
                <div className="flex items-center gap-8">
                    <button className="text-gray-500 font-bold hover:text-gray-800 transition-colors whitespace-nowrap">
                        ← Back to Services
                    </button>


                </div>

                {/* Right Actions: Selected Slot & Confirm */}
                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Selected Appointment</div>
                        <div className="font-bold text-gray-900">Nov {selectedDate}, 2023 at {selectedTime}</div>
                    </div>

                    <Button variant="primary" className="bg-ayur-orange text-white px-8 py-3.5 rounded-xl font-bold shadow-md hover:bg-orange-600 transition-colors whitespace-nowrap">
                        Review Details →
                    </Button>
                </div>


            </div>

            <div className="flex justify-between md:flex items-center gap-4 bg-white/60 p-3 rounded-2xl">
                <div className='hidden md:flex items-center gap-4 bg-white/60 p-3 rounded-2xl'>
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                        👩‍⚕️
                    </div>
                    <div>
                        <div className="font-bold text-gray-900 leading-tight">Dr. Ananya Sharma</div>
                        <div className="text-xs text-gray-500">Senior Ayurvedic Practitioner • 12 years exp</div>
                    </div>
                </div>
                <div className="ml-4 flex items-center gap-1 text-sm font-bold text-gray-900 bg-white px-2 py-1 rounded-lg shadow-sm">
                    <span className="text-ayur-orange">★</span> 4.9
                </div>
            </div>
        </div>
    );
};