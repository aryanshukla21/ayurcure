import React from 'react';
import { Clock } from 'lucide-react';

const ConsultationSection = ({ formData, onChange }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 mb-2">
        <Clock size={18} className="text-[#D9774B]" />
        <h3 className="text-lg font-bold text-gray-900">Consultation Details</h3>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Consultation Fees (INR)</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
          <input type="number" name="fees" value={formData.fees} onChange={onChange} placeholder="500" className="w-full bg-white border border-[#EFEBE1] rounded-xl py-3 pl-8 pr-4 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Start Time</label>
          <input type="time" name="startTime" value={formData.startTime} onChange={onChange} className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">End Time</label>
          <input type="time" name="endTime" value={formData.endTime} onChange={onChange} className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
        </div>
      </div>

      <p className="text-xs font-medium text-gray-500 leading-relaxed">
        Note: These hours will be displayed on the patient facing booking portal.
      </p>
    </div>
  );
};

export default ConsultationSection;