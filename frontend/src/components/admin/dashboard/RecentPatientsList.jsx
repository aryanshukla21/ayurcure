import React from 'react';

const PATIENTS = [
  { name: 'Eleanor Pena', phone: '(555) 012-3456', lastActive: '2 hours ago' },
  { name: 'Arlene McCoy', phone: '(555) 011-9876', lastActive: '5 hours ago' },
  { name: 'Albert Flores', phone: '(555) 010-4433', lastActive: 'Yesterday' },
];

const RecentPatientsList = () => {
  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Recent Patients</h3>
        <button className="text-xs font-bold text-gray-500 hover:text-[#3A6447] uppercase tracking-widest transition-colors">View All</button>
      </div>

      <div className="flex text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-4 border-b border-[#EFEBE1]">
        <div className="w-[40%]">Patient Name</div>
        <div className="w-[35%]">Contact</div>
        <div className="w-[25%] text-right">Last Activity</div>
      </div>

      <div className="flex-1 space-y-1 mt-3">
        {PATIENTS.map((pat, i) => (
          <div key={i} className="flex items-center py-4 border-b border-transparent hover:border-[#EFEBE1] transition-colors group cursor-pointer">
            <div className="w-[40%]">
              <span className="text-sm font-bold text-gray-900 group-hover:text-[#3A6447] transition-colors">{pat.name}</span>
            </div>
            <div className="w-[35%] text-xs font-medium text-gray-500">{pat.phone}</div>
            <div className="w-[25%] text-right text-xs font-semibold text-gray-600">{pat.lastActive}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPatientsList;