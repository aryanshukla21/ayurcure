import React from 'react';
import { AlertCircle, XCircle } from 'lucide-react';

const CancellationPolicyCard = ({ onCancelClick }) => {
  return (
    <div className="bg-[#FAF7F2] rounded-[24px] p-6 md:p-8 border border-[#EFEBE1] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      
      <div className="flex gap-4">
        <div className="mt-1">
          <AlertCircle size={24} className="text-[#D9774B]" />
        </div>
        <div>
          <h4 className="text-base font-bold text-gray-900 mb-1">Cancellation Policy</h4>
          <p className="text-sm text-gray-500 font-medium max-w-2xl leading-relaxed">
            Cancellations made less than 24 hours before the appointment may incur a charge of $25. Please review our full policy for more details.
          </p>
        </div>
      </div>

      <button 
        onClick={onCancelClick}
        className="shrink-0 w-full md:w-auto bg-[#E88B60] hover:bg-[#D9774B] text-white font-bold py-3.5 px-8 rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
      >
        <XCircle size={18} />
        Cancel Appointment
      </button>

    </div>
  );
};

export default CancellationPolicyCard;