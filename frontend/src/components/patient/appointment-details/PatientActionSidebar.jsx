import React from 'react';
import { Video, CalendarPlus, X, MessageSquare } from 'lucide-react';

// 1. Accept the onCancelClick prop here
const PatientActionSidebar = ({ appointment, onCancelClick }) => {
  if (!appointment) return null;

  const status = appointment.status;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#EFEBE1] h-full flex flex-col">
      <h3 className="text-sm font-bold text-gray-900 mb-6">Actions</h3>

      <div className="space-y-3 flex-1">
        {status === 'upcoming' && (
          <>
            <button className="w-full bg-[#4A7C59] hover:bg-[#3d6649] text-white font-bold py-3.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm">
              <Video size={18} />
              Join Consultation
            </button>
            <button className="w-full bg-white border border-[#EFEBE1] hover:bg-[#FDF9EE] text-gray-700 font-bold py-3.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors">
              <CalendarPlus size={18} />
              Reschedule
            </button>
            
            {/* 2. Attach the onClick handler here */}
            <button 
              onClick={onCancelClick} 
              className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors mt-auto cursor-pointer"
            >
              <X size={18} />
              Cancel Appointment
            </button>
          </>
        )}

        {status === 'completed' && (
          <>
            <button className="w-full bg-[#4A7C59] hover:bg-[#3d6649] text-white font-bold py-3.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm">
              <CalendarPlus size={18} />
              Book Follow-up
            </button>
            <button className="w-full bg-white border border-[#EFEBE1] hover:bg-[#FDF9EE] text-gray-700 font-bold py-3.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors">
              <MessageSquare size={18} />
              Message Doctor
            </button>
          </>
        )}

        {status === 'cancelled' && (
          <button className="w-full bg-[#4A7C59] hover:bg-[#3d6649] text-white font-bold py-3.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm">
            <CalendarPlus size={18} />
            Book New Appointment
          </button>
        )}
      </div>
    </div>
  );
};

export default PatientActionSidebar;