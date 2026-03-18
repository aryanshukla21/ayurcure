import React from 'react';
import { Shield, Languages, Star } from 'lucide-react';

const DoctorInfoCard = ({ info }) => {
  if (!info) return null;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#EFEBE1] h-full">
      <h3 className="text-sm font-bold text-gray-900 mb-6">Practitioner Info</h3>
      
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <Shield size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Experience</p>
            <p className="text-sm font-bold text-gray-900">{info.experience}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
            <Languages size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Languages</p>
            <p className="text-sm font-bold text-gray-900">{info.languages}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
            <Star size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Rating</p>
            <p className="text-sm font-bold text-gray-900">{info.rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoCard;