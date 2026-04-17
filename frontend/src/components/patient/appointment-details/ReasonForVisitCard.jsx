import React from 'react';
import { HelpCircle } from 'lucide-react';

const ReasonForVisitCard = ({ reason, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm animate-pulse h-full">
        <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
        <div className="h-20 bg-gray-100 rounded-2xl w-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#FEF5D3] p-2.5 rounded-xl text-[#A67C00]">
          <HelpCircle size={20} />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Reason for Visit</h3>
      </div>

      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
        <p className="text-sm text-gray-700 font-medium italic">
          "{reason || 'No reason provided by the patient.'}"
        </p>
      </div>
    </div>
  );
};

export default ReasonForVisitCard;