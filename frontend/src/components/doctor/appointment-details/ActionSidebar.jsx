import React from 'react';
import { Video, Calendar as CalendarIcon, XCircle } from 'lucide-react';

const ActionSidebar = () => {
    return (
        <div className="flex flex-col gap-4 bg-[#f4eedd] p-10 rounded-3xl h-64">
            <button className="w-full text-sm bg-[#4A7C59] hover:bg-[#3a6146] text-white py-4 px-6 rounded-full font-bold transition-colors flex items-center justify-center gap-3 shadow-sm">
                <Video size={12} />
                <span>Start Video Consultation</span>
            </button>

            <button className="w-full text-sm bg-[#8A79AF] hover:bg-[#726394] text-white py-4 px-6 rounded-full font-bold transition-colors flex items-center justify-center gap-3 shadow-sm">
                <CalendarIcon size={12} />
                <span>Reschedule</span>
            </button>

            <button className="w-full text-sm bg-orange-50/50 border border-orange-100 text-orange-600 hover:bg-orange-100 py-4 px-6 rounded-full font-bold transition-colors flex items-center justify-center gap-3 shadow-sm">
                <XCircle size={12} />
                <span>Cancel Appointment</span>
            </button>
        </div>
    );
};
export default ActionSidebar;