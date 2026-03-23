import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const AppointmentHistoryTable = ({ appointments }) => {
  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Appointment History</h3>
        <button className="text-xs font-bold text-[#3A6447] hover:text-[#2C4D36] flex items-center gap-1 transition-colors">
          View Full History <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-4 border-b border-[#EFEBE1]">
        <div className="w-[30%] pl-2">Doctor Name</div>
        <div className="w-[25%]">Specialization</div>
        <div className="w-[30%]">Date & Time</div>
        <div className="w-[15%] text-right pr-2">Status</div>
      </div>

      <div className="mt-2 space-y-1">
        {appointments.map((apt, i) => (
          <div key={i} className="flex items-center py-4 border-b border-transparent hover:border-[#EFEBE1] hover:bg-[#FDF9EE]/50 rounded-2xl transition-colors px-2 -mx-2">
            <div className="w-[30%] text-sm font-bold text-gray-900">{apt.doctor}</div>
            <div className="w-[25%] text-sm font-medium text-gray-500">{apt.specialization}</div>
            <div className="w-[30%] text-sm font-bold text-gray-900">{apt.datetime}</div>
            <div className="w-[15%] text-right">
              <span className={`px-3 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${
                apt.status === 'ACTIVE' ? 'bg-[#E7F3EB] text-[#3A6447]' : 'bg-[#FDF1E8] text-[#D9774B]'
              }`}>
                {apt.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentHistoryTable;