import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const AppointmentSummaryPanel = ({ fee, tax }) => {
  const total = (parseFloat(fee) + parseFloat(tax)).toFixed(2);

  return (
    <>
      <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-5">Appointment Summary</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-sm font-medium text-gray-600">
          <span>Consultation</span>
          <span className="text-gray-900 font-bold">${parseFloat(fee).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm font-medium text-gray-600">
          <span>Tax & Fees</span>
          <span className="text-gray-900 font-bold">${parseFloat(tax).toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-[#EFEBE1] mb-8">
        <span className="text-base font-bold text-gray-900">Total Amount</span>
        <span className="text-2xl font-extrabold text-gray-900">${total}</span>
      </div>

      <button className="w-full bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-colors">
        <CheckCircle2 size={18} />
        Confirm Appointment
      </button>
      <p className="text-[10px] text-gray-400 text-center mt-4 px-4 leading-relaxed">
        By confirming, you agree to our cancellation policy.
      </p>
    </>
  );
};

export default AppointmentSummaryPanel;