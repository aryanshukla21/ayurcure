import React from 'react';
import { ShieldCheck, Clock, FileWarning } from 'lucide-react';

const DoctorMetricsRow = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      
      {/* Verification Rate */}
      <div className="bg-white rounded-[24px] p-6 border border-[#EFEBE1] shadow-sm relative overflow-hidden">
        <div className="absolute top-6 right-6 bg-[#E7F3EB] text-[#3A6447] text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full">
          Verified
        </div>
        <div className="w-10 h-10 rounded-full bg-[#E7F3EB] flex items-center justify-center text-[#3A6447] mb-4">
          <ShieldCheck size={20} />
        </div>
        <h3 className="text-3xl font-extrabold text-gray-900 mb-1">98%</h3>
        <p className="text-sm font-medium text-gray-500">Verification Rate</p>
      </div>

      {/* Avg. Response Time */}
      <div className="bg-white rounded-[24px] p-6 border border-[#EFEBE1] shadow-sm">
        <div className="w-10 h-10 rounded-full bg-[#F3E8FF] flex items-center justify-center text-[#9333EA] mb-4">
          <Clock size={20} />
        </div>
        <h3 className="text-3xl font-extrabold text-gray-900 mb-1">14 min</h3>
        <p className="text-sm font-medium text-gray-500">Avg. Response Time</p>
      </div>

      {/* Pending Approvals */}
      <div className="bg-white rounded-[24px] p-6 border border-[#EFEBE1] shadow-sm">
        <div className="w-10 h-10 rounded-full bg-[#FFF4EB] flex items-center justify-center text-[#D9774B] mb-4">
          <FileWarning size={20} />
        </div>
        <h3 className="text-3xl font-extrabold text-[#D9774B] mb-1">4</h3>
        <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
      </div>

    </div>
  );
};

export default DoctorMetricsRow;