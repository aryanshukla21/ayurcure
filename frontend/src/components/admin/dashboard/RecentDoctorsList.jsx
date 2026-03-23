import React from 'react';

const DOCTORS = [
  { name: 'Dr. James Wilson', spec: 'Cardiology', status: 'ACTIVE', img: 'https://ui-avatars.com/api/?name=JW&background=FDF9EE&color=3A6447' },
  { name: 'Dr. Sarah Chen', spec: 'Pediatrics', status: 'ACTIVE', img: 'https://ui-avatars.com/api/?name=SC&background=FDF9EE&color=D9774B' },
  { name: 'Dr. Robert Fox', spec: 'Orthopedics', status: 'INACTIVE', img: 'https://ui-avatars.com/api/?name=RF&background=FDF9EE&color=A67C00' },
];

const RecentDoctorsList = () => {
  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Recent Doctors</h3>
        <button className="text-xs font-bold text-gray-500 hover:text-[#3A6447] uppercase tracking-widest transition-colors">View All</button>
      </div>

      <div className="flex text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-4 border-b border-[#EFEBE1]">
        <div className="w-[50%]">Name</div>
        <div className="w-[30%]">Specialization</div>
        <div className="w-[20%] text-right">Status</div>
      </div>

      <div className="flex-1 space-y-1 mt-3">
        {DOCTORS.map((doc, i) => (
          <div key={i} className="flex items-center py-3 border-b border-transparent hover:border-[#EFEBE1] transition-colors group cursor-pointer">
            <div className="w-[50%] flex items-center gap-3">
              <img src={doc.img} alt={doc.name} className="w-10 h-10 rounded-full border border-[#EFEBE1]" />
              <span className="text-sm font-bold text-gray-900 group-hover:text-[#3A6447] transition-colors">{doc.name}</span>
            </div>
            <div className="w-[30%] text-xs font-medium text-gray-500">{doc.spec}</div>
            <div className="w-[20%] text-right">
              <span className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${
                doc.status === 'ACTIVE' ? 'bg-[#E7F3EB] text-[#3A6447]' : 'bg-[#FDF1E8] text-[#D9774B]'
              }`}>
                {doc.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDoctorsList;