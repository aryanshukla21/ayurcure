import React from 'react';
import { AlertCircle } from 'lucide-react';

const CancelAppointmentModal = ({ isOpen, appointment, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-[#FDF9EE] w-full max-w-[400px] rounded-[32px] shadow-2xl p-8 flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        <h2 className="text-xl font-bold text-gray-900 mb-3 text-center">
          Cancel Appointment
        </h2>
        <p className="text-sm text-gray-500 font-medium text-center mb-6 px-2">
          Are you sure you want to cancel this appointment?
        </p>

        {/* Appointment Details Box */}
        <div className="bg-white rounded-[24px] p-5 border border-[#EFEBE1] shadow-sm mb-6 space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-gray-500">Doctor</span>
            <span className="font-bold text-gray-900">Dr. {appointment?.doctorName || 'Ananya Sharma'}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-gray-500">Date</span>
            <span className="font-bold text-gray-900">{appointment?.date || 'Oct 28, 2023'}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-gray-500">Time</span>
            <span className="font-bold text-gray-900">{appointment?.time || '10:30 AM'}</span>
          </div>
        </div>

        {/* Warning Text */}
        <div className="flex gap-2 items-start mb-8 px-2">
          <AlertCircle size={16} className="text-[#D9774B] shrink-0 mt-0.5" />
          <p className="text-xs font-semibold text-[#D9774B] leading-relaxed">
            A cancellation fee may apply depending on the consultation policy.
          </p>
        </div>

        {/* Action Buttons (Rounded Full) */}
        <div className="flex flex-col gap-3">
          <button 
            onClick={onConfirm}
            className="w-full bg-[#E88B60] hover:bg-[#D9774B] text-white font-bold py-3.5 rounded-full transition-colors text-sm shadow-sm"
          >
            Confirm Cancellation
          </button>
          
          <button 
            onClick={onClose}
            className="w-full bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-3.5 rounded-full transition-colors text-sm shadow-sm"
          >
            Keep Appointment
          </button>
        </div>

      </div>
    </div>
  );
};

export default CancelAppointmentModal;