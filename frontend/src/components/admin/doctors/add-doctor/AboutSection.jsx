import React from 'react';
import { FileText } from 'lucide-react';

const AboutSection = ({ formData, onChange }) => {
  return (
    <div className="bg-[#EAE5D9] rounded-[24px] p-6 border border-[#DFD9CB] shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <FileText size={18} className="text-[#79563E]" />
        <h3 className="text-lg font-bold text-gray-900">About Doctor</h3>
      </div>

      <div className="flex flex-col gap-1.5 flex-1">
        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Professional Bio</label>
        <textarea 
          name="about" 
          value={formData.about} 
          onChange={onChange} 
          placeholder="Write a brief description of the doctor's journey, expertise, and philosophy..." 
          className="w-full bg-white border border-[#DFD9CB] rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#79563E] resize-none flex-1 min-h-[120px]" 
        />
      </div>
    </div>
  );
};

export default AboutSection;