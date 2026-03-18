import React from 'react';
import { Star } from 'lucide-react';

const PractitionerModalCard = ({ doctor, onSelect }) => {
  return (
    <div className="bg-white rounded-[24px] p-6 border border-[#EFEBE1] shadow-sm hover:shadow-md hover:border-[#D1CFC8] transition-all flex flex-col h-full cursor-pointer" onClick={() => onSelect(doctor)}>
      <div className="flex justify-between items-start mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-[#EFEBE1] overflow-hidden">
            <img
              src={`https://ui-avatars.com/api/?name=${doctor.name.replace(' ', '+')}&background=EAE5D9&color=4A7C59&size=200`}
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border-2 border-white shadow-sm whitespace-nowrap">
            <Star size={10} className="fill-white" /> {doctor.rating}
          </div>
        </div>
        <div className="text-right">
          <p className="text-[13px] font-bold text-amber-700 uppercase tracking-widest leading-tight">Consultation</p>
          <p className="text-lg font-bold text-gray-900">${doctor.fee}</p>
        </div>
      </div>

      <div className="mb-6 flex-grow">
        <h3 className="text-lg font-bold text-gray-900">Dr. {doctor.name}</h3>
        <p className="text-sm text-gray-500 font-medium mb-4">{doctor.specialty}</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-[#FDF9EE] text-gray-600 text-xs font-semibold rounded-full">{doctor.experience}</span>
          <span className="px-3 py-1 bg-[#FDF9EE] text-gray-600 text-xs font-semibold rounded-full">{doctor.tag}</span>
        </div>
      </div>

      <button className="w-full bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-3 rounded-full transition-colors text-sm">
        Select
      </button>
    </div>
  );
};

export default PractitionerModalCard;