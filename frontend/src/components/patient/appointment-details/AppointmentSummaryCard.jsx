import React from 'react';
import { Calendar, Clock, Video, MapPin, CheckCircle2, XCircle } from 'lucide-react';

const AppointmentSummaryCard = ({ appointment }) => {
  if (!appointment) return null;

  const isVideo = appointment.type === 'video';
  const isCancelled = appointment.status === 'cancelled';
  const isCompleted = appointment.status === 'completed';

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#EFEBE1] h-full flex flex-col justify-between">
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-[#EAE5D9] flex items-center justify-center text-[#4A7C59] text-2xl font-bold border border-[#EFEBE1] shrink-0 object-cover overflow-hidden">
            {/* Fallback to initials if no image */}
            {appointment.doctorName?.charAt(4) || 'D'}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-gray-900">{appointment.doctorName}</h2>
              {isCompleted ? (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1"><CheckCircle2 size={12} /> Completed</span>
              ) : isCancelled ? (
                <span className="px-3 py-1 bg-red-100 text-red-800 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1"><XCircle size={12} /> Cancelled</span>
              ) : (
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider rounded-full">Upcoming</span>
              )}
            </div>
            <p className="text-green-700 font-medium">{appointment.specialty}</p>
            <p className="text-xs text-gray-400 mt-1 font-semibold">{appointment.appointmentId}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#EFEBE1]">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Date</p>
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
            <Calendar size={16} className="text-[#4A7C59]" />
            {appointment.date}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Time</p>
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
            <Clock size={16} className="text-[#4A7C59]" />
            {appointment.time}
          </div>
        </div>
        <div className="col-span-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Location / Mode</p>
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900 truncate">
            {isVideo ? <Video size={16} className="text-[#4A7C59]" /> : <MapPin size={16} className="text-[#4A7C59]" />}
            {appointment.clinic}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSummaryCard;