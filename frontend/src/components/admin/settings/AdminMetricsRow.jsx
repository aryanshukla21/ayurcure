import React from 'react';
import { ShieldCheck, Users, Activity } from 'lucide-react';

const AdminMetricsRow = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      {/* Total Admins */}
      <div className="bg-white rounded-[24px] p-6 border border-[#EFEBE1] shadow-sm flex items-center gap-5">
        <div className="w-12 h-12 rounded-full bg-[#E7F3EB] flex items-center justify-center text-[#3A6447] shrink-0">
          <Users size={24} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Admins</p>
          <h3 className="text-2xl font-extrabold text-gray-900">12</h3>
        </div>
      </div>

      {/* Security Score */}
      <div className="bg-[#FAF7F2] rounded-[24px] p-6 border border-[#EFEBE1] shadow-sm flex items-center gap-5">
        <div className="w-12 h-12 rounded-full bg-[#E7F3EB] flex items-center justify-center text-[#3A6447] shrink-0">
          <ShieldCheck size={24} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Security Score</p>
          <h3 className="text-2xl font-extrabold text-[#3A6447]">94%</h3>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-[24px] p-6 border border-[#EFEBE1] shadow-sm flex items-center gap-5">
        <div className="w-12 h-12 rounded-full bg-[#FEF5D3] flex items-center justify-center text-[#A67C00] shrink-0">
          <Activity size={24} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active Sessions</p>
          <h3 className="text-2xl font-extrabold text-gray-900">05</h3>
        </div>
      </div>

    </div>
  );
};

export default AdminMetricsRow;