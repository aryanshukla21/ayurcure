import React from 'react';
import { Lock, ShieldAlert } from 'lucide-react';

const SecuritySection = ({ formData, onChange }) => {
  return (
    <div className="flex flex-col gap-6 mb-10">
      <div className="flex items-center gap-3 mb-2">
        <Lock size={20} className="text-[#3A6447]" />
        <h3 className="text-lg font-bold text-gray-900">Security</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        
        <div className="flex flex-col gap-1.5 relative">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Password</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={onChange} 
            placeholder="••••••••" 
            className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 shadow-sm transition-all tracking-widest" 
          />
        </div>

        <div className="flex flex-col gap-1.5 relative">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Confirm Password</label>
          <input 
            type="password" 
            name="confirmPassword" 
            value={formData.confirmPassword} 
            onChange={onChange} 
            placeholder="••••••••" 
            className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 shadow-sm transition-all tracking-widest" 
          />
        </div>

      </div>

      {/* Compliance Warning */}
      <div className="bg-[#FAF7F2] rounded-2xl p-4 flex items-start gap-3 border border-[#EFEBE1]">
        <ShieldAlert size={16} className="text-gray-500 shrink-0 mt-0.5" />
        <p className="text-xs font-medium text-gray-600 leading-relaxed">
          Passwords must be at least 12 characters long and include a mix of uppercase letters, numbers, and symbols for clinical data security compliance.
        </p>
      </div>

    </div>
  );
};

export default SecuritySection;