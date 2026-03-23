import React from 'react';
import { GraduationCap, ChevronDown } from 'lucide-react';

const ProfessionalSection = ({ formData, onChange }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 mb-2">
        <GraduationCap size={18} className="text-[#9333EA]" />
        <h3 className="text-lg font-bold text-gray-900">Professional Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5 relative">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Specialization</label>
          <select name="specialization" value={formData.specialization} onChange={onChange} className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#4A7C59] cursor-pointer">
            <option value="Ayurvedic General Medicine">Ayurvedic General Medicine</option>
            <option value="Pancha-Karma Expert">Pancha-Karma Expert</option>
            <option value="Yoga Therapy">Yoga Therapy</option>
          </select>
          <ChevronDown size={16} className="absolute right-4 top-[34px] text-gray-500 pointer-events-none" />
        </div>
        
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Registration Number</label>
          <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={onChange} placeholder="AYU-2023-XXXX" className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
        </div>
        
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Qualifications</label>
          <input type="text" name="qualifications" value={formData.qualifications} onChange={onChange} placeholder="BAMS, MD (Ayurveda)" className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
        </div>
        
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Years of Experience</label>
          <input type="number" name="experience" value={formData.experience} onChange={onChange} placeholder="10" className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSection;