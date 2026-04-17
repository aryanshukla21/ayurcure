import React from 'react';
import { Star } from 'lucide-react';

const DoctorSelectionCard = ({ doctor, isSelected, onSelect, isLoading }) => {
  if (isLoading) {
    return (
      <div className="rounded-[24px] p-6 border border-[#EFEBE1] bg-white shadow-sm min-w-[300px] md:min-w-[320px] shrink-0 animate-pulse h-[220px] flex flex-col justify-between">
        <div className="flex gap-4 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gray-100 shrink-0"></div>
          <div className="flex-1 space-y-3 mt-2">
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
            <div className="h-3 bg-gray-100 rounded w-1/3"></div>
          </div>
        </div>
        <div className="flex justify-between items-end pt-5 border-t border-[#EFEBE1]">
          <div className="h-8 bg-gray-100 rounded w-16"></div>
          <div className="h-10 bg-gray-200 rounded-full w-28"></div>
        </div>
      </div>
    );
  }

  // Safe mapping for dynamic backend properties
  const docId = doctor?.id || doctor?._id;
  const docName = doctor?.name || doctor?.full_name || 'Practitioner';
  const nameParts = docName.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  const specialty = doctor?.specialty || doctor?.specialization || 'Specialist';
  const fee = doctor?.fee || doctor?.consultation_fee || '50';

  return (
    <div
      onClick={() => onSelect(docId)}
      className={`rounded-[24px] p-6 border min-w-[300px] md:min-w-[320px] shrink-0 cursor-pointer transition-all duration-300 ${isSelected
          ? 'bg-white border-[#4A7C59] shadow-md relative'
          : 'bg-[#F4F1EB] border-[#EFEBE1] shadow-sm hover:border-[#D1CFC8] hover:shadow-md'
        }`}
    >
      <div className="flex gap-4 mb-6">
        <div className="w-20 h-20 rounded-2xl bg-[#EFEBE1] overflow-hidden shrink-0 flex items-center justify-center text-[#4A7C59] text-2xl font-bold">
          {/* Using a clean initial instead of calling external avatar APIs which might delay loading */}
          {firstName.charAt(0)}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            Dr. {firstName}<br />{lastName}
          </h3>
          <p className="text-xs text-gray-500 font-medium leading-tight mt-1">
            {specialty.split(' ').map((word, i) => i === 1 ? <React.Fragment key={i}><br />{word}</React.Fragment> : ` ${word}`)}
          </p>
          <div className="flex items-center gap-1 mt-2">
            <Star size={12} className="fill-[#D9774B] text-[#D9774B]" />
            <span className="text-xs font-bold text-gray-900">{doctor?.rating || '4.8'}</span>
            <span className="text-[10px] text-gray-400 font-medium">({doctor?.reviews || '124'} reviews)</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-5 border-t border-[#EFEBE1]">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Consultation<br />Fee</p>
          <p className="text-lg font-bold text-gray-900">₹{fee}</p>
        </div>
        <button
          className={`px-6 py-2.5 rounded-full font-bold text-sm transition-colors ${isSelected
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