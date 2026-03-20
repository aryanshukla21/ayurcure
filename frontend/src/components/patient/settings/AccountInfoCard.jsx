import React, { useState } from 'react';
import { User } from 'lucide-react';

const AccountInfoCard = () => {
  const [formData, setFormData] = useState({
    fullName: 'Arun Varma',
    mobile: '+91 98765 43210',
    email: 'arun.varma@ayurcare.com'
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <User size={20} className="text-[#3A6447]" />
        <h3 className="text-xl font-bold text-gray-900">Account Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 flex-1">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mobile Number</label>
          <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
        </div>
      </div>

      <button className="bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-3.5 px-8 rounded-full transition-colors text-sm shadow-sm w-fit">
        Update Information
      </button>
    </div>
  );
};

export default AccountInfoCard;