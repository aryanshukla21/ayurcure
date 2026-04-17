import React from 'react';
import { Video, Calendar as CalendarIcon, XCircle } from 'lucide-react';

const PatientActionSidebar = ({ actions, onCancelClick, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-[#3A6447] rounded-[32px] p-8 h-full shadow-md animate-pulse flex flex-col justify-center gap-4">
        <div className="h-14 bg-white/20 rounded-2xl w-full"></div>
        <div className="h-14 bg-white/20 rounded-2xl w-full"></div>
        <div className="h-14 bg-white/20 rounded-2xl w-full"></div>
      </div>
    );
  }

  // Default to an 'upcoming' state if actions object is malformed
  const status = actions?.status || 'upcoming';
  const isVideo = actions?.type === 'video' || actions?.mode === 'video';

  if (status === 'completed' || status === 'cancelled') {
    return (
      <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm h-full flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <CalendarIcon size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Book Follow-up</h3>
        <p className="text-sm text-gray-500 mb-6">Schedule your next session to continue your wellness journey.</p>
        <button className="w-full bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-3.5 rounded-2xl transition-colors shadow-sm">
          Schedule Now
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#3A6447] rounded-[32px] p-8 h-full text-white shadow-md relative overflow-hidden flex flex-col justify-center gap-4">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>

      {isVideo && (
        <button className="w-full bg-white hover:bg-gray-50 text-[#3A6447] font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-sm">
          <Video size={18} /> Join Consultation
        </button>
      )}

      <button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors border border-white/10">
        <CalendarIcon size={18} /> Reschedule
      </button>

      <button
        onClick={onCancelClick}
        className="w-full bg-transparent hover:bg-red-500/20 text-white/70 hover:text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors"
      >
        <XCircle size={18} /> Cancel Appointment
      </button>
    </div>
  );
};

export default PatientActionSidebar;