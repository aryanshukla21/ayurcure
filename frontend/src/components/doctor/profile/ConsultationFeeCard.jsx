import React from 'react';
import { Lock, Timer } from 'lucide-react';

const ConsultationFeeCard = ({ logistics }) => {
    if (!logistics) return null;

    // A simple helper to format availability if it's stored as JSON
    const formatAvailability = (schedule) => {
        if (!schedule) return 'Schedule not set';
        // Basic fallback if stringified
        if (typeof schedule === 'string') return schedule;

        // If it's an object with days
        return "Check schedule in settings";
    };

    return (
        <div className="lg:col-span-1 bg-[#4A7C59] rounded-3xl p-8 shadow-sm text-white flex flex-col justify-between relative overflow-hidden h-64">
            <div className="absolute top-0 right-0 p-6 opacity-10">
                <Lock size={120} />
            </div>
            <div className="flex items-center justify-between relative z-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center py-6">
                    <Lock size={20} />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest bg-white/20 px-5 py-1 rounded-full">Consultation</span>
            </div>
            <div className="relative z-8">
                <h2 className="text-2xl font-black mb-2">₹{Number(logistics.consultation_fee || 0).toFixed(2)}</h2>
                <p className="text-white/80 text-sm mb-6 mt-2">Standard Consultation Fee</p>

                <div className="flex items-center gap-3 bg-[#4A7C59] p-3 rounded-2xl">
                    <div className="p-2 rounded-lg"><Timer size={16} /></div>
                    <div>
                        <p className="text-sm text-white/70 font-bold uppercase tracking-wider">Availability</p>
                        <p className="font-semibold text-sm">{formatAvailability(logistics.availability_schedule)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultationFeeCard;