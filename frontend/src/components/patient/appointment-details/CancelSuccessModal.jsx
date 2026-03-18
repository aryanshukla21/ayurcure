import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

const CancelSuccessModal = ({ isOpen, onGoDashboard, onScheduleNew }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-[#FDF9EE] w-full max-w-[400px] rounded-[32px] shadow-2xl p-8 md:p-10 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">

        {/* Success Checkmark */}
        <div className="w-16 h-16 rounded-full bg-[#EAE5D9] flex items-center justify-center mb-6">
          <div className="w-10 h-10 rounded-full bg-[#4A7C59] flex items-center justify-center shadow-sm">
            <Check size={20} className="text-white" strokeWidth={3} />
          </div>
        </div>

        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          Appointment Cancelled
        </h2>
        <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8 px-2">
          Your appointment has been successfully cancelled. We hope to see you again soon.
        </p>

        {/* Action Buttons (Rounded Full) */}
        <div className="w-full flex flex-col gap-4">
          <button
            onClick={onGoDashboard}
            className="w-full bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-3.5 rounded-full transition-colors text-sm shadow-sm flex items-center justify-center gap-2"
          >
            Go to Dashboard <ArrowRight size={16} />
          </button>

          <button
            onClick={onScheduleNew}
            className="w-full text-amber-900 hover:text-amber-700 font-bold py-3.5 rounded-full transition-colors text-xs uppercase tracking-widest"
          >
            SCHEDULE NEW VISIT
          </button>
        </div>

      </div>
    </div>
  );
};

export default CancelSuccessModal;