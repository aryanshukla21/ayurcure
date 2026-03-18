import React from 'react';
import { Star } from 'lucide-react';

const DoctorSelectionCard = ({ doctor, isSelected, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(doctor.id)}
      className={`rounded-[24px] p-6 border min-w-[300px] md:min-w-[320px] shrink-0 cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'bg-white border-[#4A7C59] shadow-md relative' 
          : 'bg-[#F4F1EB] border-[#EFEBE1] shadow-sm hover:border-[#D1CFC8] hover:shadow-md'
      }`}
    >
      <div className="flex gap-4 mb-6">
        <div className="w-20 h-20 rounded-2xl bg-[#EFEBE1] overflow-hidden shrink-0">
          <img 
            src={`https://ui-avatars.com/api/?name=${doctor.name.replace(' ', '+')}&background=EAE5D9&color=4A7C59&size=200`} 
            alt={doctor.name} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            Dr. {doctor.name.split(' ')[0]}<br/>{doctor.name.split(' ')[1] || ''}
          </h3>
          <p className="text-xs text-gray-500 font-medium leading-tight mt-1">
            {doctor.specialty.split(' ').map((word, i) => i === 1 ? <React.Fragment key={i}><br/>{word}</React.Fragment> : ` ${word}`)}
          </p>
          <div className="flex items-center gap-1 mt-2">
            <Star size={12} className="fill-[#D9774B] text-[#D9774B]" />
            <span className="text-xs font-bold text-gray-900">{doctor.rating}</span>
            <span className="text-[10px] text-gray-400 font-medium">({doctor.reviews} reviews)</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-5 border-t border-[#EFEBE1]">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Consultation<br/>Fee</p>
          <p className="text-lg font-bold text-gray-900">${doctor.fee}</p>
        </div>
        <button 
          className={`px-6 py-2.5 rounded-full font-bold text-sm transition-colors ${
            isSelected 
              ? 'bg-[#3A6447] text-white' 
              : 'bg-white text-gray-500 border border-[#EFEBE1] hover:bg-gray-50'
          }`}
        >
          {isSelected ? 'Selected' : 'Select Doctor'}
        </button>
      </div>
    </div>
  );
};

export default DoctorSelectionCard;