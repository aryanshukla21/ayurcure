import React from 'react';
import { Lock, Timer } from 'lucide-react';

const ConsultationFeeCard = ({ profile }) => {
    return (
        <div className="lg:col-span-1 bg-[#4A7C59] rounded-3xl p-8 shadow-sm text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
                <Lock size={120} />
            </div>
            <div className="flex items-center justify-between relative z-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center py-6">
                    <Lock size={72} />
                </div>
                <span className="text-lg font-bold uppercase tracking-widest bg-white/20 px-5 py-1 rounded-full">Consultation</span>
            </div>
            <div className="relative z-8">
                <h2 className="text-5xl font-black mb-2">${Number(profile.consultation_fee).toFixed(2)}</h2>
                <p className="text-white/80 text-xl mb-6 mt-2">Standard Tele-Consultation Fee</p>

                <div className="flex items-center gap-3 bg-[#4A7C59]  p-3 rounded-2xl">
                    <div className="p-2 rounded-lg"><Timer size={24} /></div>
                    <div>
                        <p className="text-lg text-white/70 font-bold uppercase tracking-wider">Availability</p>
                        <p className="font-semibold text-lg">{profile.availability_summary}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultationFeeCard;