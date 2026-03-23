import React from 'react';

const PatientProfileCard = ({ patient }) => {
  return (
    <div className="bg-[#FAF7F2] rounded-[32px]  md:p-10 border border-[#EFEBE1] shadow-sm h-full flex flex-col">
      
      {/* Top Section: Avatar, Name, and Badges */}
      <div className="flex items-center gap-6 mb-10">
        <div className="w-28 h-28 rounded-3xl overflow-hidden bg-[#789D9E] shrink-0 shadow-sm">
          <img 
            src={patient.img || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'} 
            alt={patient.name} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
            {patient.name}
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-4 py-1.5 bg-[#4A7C59] text-white text-[10px] font-extrabold uppercase tracking-widest rounded-full shadow-sm">
              Primary Patient
            </span>
            <span className="px-4 py-1.5 bg-[#D49A44] text-gray-900 text-[10px] font-extrabold uppercase tracking-widest rounded-full shadow-sm">
              VIP Member
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section: 3-Column Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6">
        
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold text-[#8C7A6B] uppercase tracking-widest">
            Full Name
          </p>
          <p className="text-base font-bold text-gray-900">{patient.name}</p>
        </div>
        
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold text-[#8C7A6B] uppercase tracking-widest">
            Age
          </p>
          <p className="text-base font-bold text-gray-900">{patient.age} Years</p>
        </div>
        
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold text-[#8C7A6B] uppercase tracking-widest">
            Gender
          </p>
          <p className="text-base font-bold text-gray-900">{patient.gender}</p>
        </div>
        
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold text-[#8C7A6B] uppercase tracking-widest">
            Contact Number
          </p>
          <p className="text-base font-bold text-gray-900">{patient.phone}</p>
        </div>
        
        <div className="flex flex-col gap-2 md:col-span-2">
          <p className="text-[11px] font-bold text-[#8C7A6B] uppercase tracking-widest">
            Email Address
          </p>
          <p className="text-base font-bold text-gray-900">{patient.email}</p>
        </div>

      </div>

    </div>
  );
};

export default PatientProfileCard;