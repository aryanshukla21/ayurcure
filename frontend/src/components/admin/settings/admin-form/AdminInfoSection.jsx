import React from 'react';
import { Contact, ChevronDown } from 'lucide-react';

const AdminInfoSection = ({ formData, onChange }) => {
  return (
    <div className="flex flex-col gap-6 mb-10">
      <div className="flex items-center gap-3 mb-2">
        <Contact size={20} className="text-[#3A6447]" />
        <h3 className="text-lg font-bold text-gray-900">Admin Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
          <input 
            type="text" 
            name="fullName" 
            value={formData.fullName} 
            onChange={onChange} 
            placeholder="e.g. Dr. Sarah Jenkins" 
            className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 shadow-sm transition-all" 
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={onChange} 
            placeholder="sarah.j@ayurcare.com" 
            className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 shadow-sm transition-all" 
          />
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2 relative">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Role</label>
          <select 
            name="role" 
            value={formData.role} 
            onChange={onChange} 
            className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 shadow-sm cursor-pointer transition-all"
          >
            <option value="System Administrator">System Administrator</option>
            <option value="Content Admin">Content Admin</option>
            <option value="Finance Admin">Finance Admin</option>
          </select>
          <ChevronDown size={18} className="absolute right-4 top-[36px] text-gray-400 pointer-events-none" />
        </div>

      </div>
    </div>
  );
};

export default AdminInfoSection;