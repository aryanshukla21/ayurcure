import React from 'react';
import { User } from 'lucide-react';

const PersonalInfoSection = ({ formData, onChange }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 mb-2">
        <User size={18} className="text-[#3A6447]" />
        <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={onChange} placeholder="Dr. Rohan Sharma" className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={onChange} placeholder="rohan.s@ayurcare.com" className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={onChange} placeholder="+91 98765 43210" className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Emergency Contact</label>
          <input type="tel" name="emergencyContact" value={formData.emergencyContact} onChange={onChange} placeholder="+91 00000 00000" className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
        </div>
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Address</label>
          <input type="text" name="address" value={formData.address} onChange={onChange} placeholder="123 Ayurveda Lane, Green Valley, Kerala" className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Set Password</label>
          <input type="password" name="password" value={formData.password} onChange={onChange} placeholder="••••••••" className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;