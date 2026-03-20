import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

const PasswordChangeCard = () => {
  const [passwords, setPasswords] = useState({
    current: '••••••••',
    new: '••••••••',
    confirm: '••••••••'
  });

  const handleChange = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

  return (
    <div className="bg-[#FAF7F2] rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <ShieldCheck size={20} className="text-gray-500" />
        <h3 className="text-xl font-bold text-gray-900">Password Change</h3>
      </div>

      <div className="flex flex-col gap-5 mb-8 flex-1">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Current Password</label>
          <input type="password" name="current" value={passwords.current} onChange={handleChange} className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8C6239]" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">New Password</label>
          <input type="password" name="new" value={passwords.new} onChange={handleChange} className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8C6239]" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Confirm Password</label>
          <input type="password" name="confirm" value={passwords.confirm} onChange={handleChange} className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8C6239]" />
        </div>
      </div>

      <button className="bg-[#8C6239] hover:bg-[#734F2D] text-white font-bold py-3.5 px-8 rounded-full transition-colors text-sm shadow-sm w-full">
        Update Password
      </button>
    </div>
  );
};

export default PasswordChangeCard;