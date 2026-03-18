import React from 'react';
import { FileText } from 'lucide-react';

const PrescriptionPlaceholder = () => {
  return (
    <div className="bg-white rounded-[24px] p-8 border border-[#EFEBE1] shadow-sm h-full flex flex-col items-center justify-center text-center min-h-[250px]">
      
      {/* Icon Container */}
      <div className="w-14 h-14 bg-[#F4F1EB] rounded-2xl flex items-center justify-center text-[#A39D8F] mb-5">
        <FileText size={28} strokeWidth={1.5} />
      </div>
      
      {/* Text */}
      <h3 className="text-lg font-bold text-gray-900 mb-2">Doctor Prescription</h3>
      <p className="text-sm text-gray-500 font-medium max-w-[200px] leading-relaxed">
        Prescription will appear here after the consultation.
      </p>
      
    </div>
  );
};

export default PrescriptionPlaceholder;