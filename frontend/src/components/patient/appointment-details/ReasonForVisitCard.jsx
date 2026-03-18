import React from 'react';
import { AlignLeft } from 'lucide-react';

const ReasonForVisitCard = ({ text, tags = [] }) => {
  return (
    <div className="bg-white rounded-[24px] p-8 border border-[#EFEBE1] shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <AlignLeft className="text-gray-400" size={20} />
        <h3 className="text-lg font-bold text-gray-900">Reason for Visit</h3>
      </div>
      
      {/* Quote Box */}
      <div className="bg-[#FAF7F2] border-l-4 border-[#4A7C59] p-6 rounded-r-2xl mb-6 flex-grow">
        <p className="text-gray-700 italic font-medium leading-relaxed">
          "{text || 'Experiencing persistent fatigue and digestive issues. Seeking dietary recommendations and herbal remedies.'}"
        </p>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-4 py-1.5 bg-[#F0F4F1] text-[#4A7C59] text-[10px] font-extrabold uppercase tracking-widest rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReasonForVisitCard;