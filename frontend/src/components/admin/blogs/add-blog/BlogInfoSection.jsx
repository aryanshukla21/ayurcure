import React from 'react';
import { Info, ChevronDown } from 'lucide-react';

const BlogInfoSection = ({ formData, onChange }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 mb-2">
        <Info size={18} className="text-[#3A6447]" />
        <h3 className="text-lg font-bold text-gray-900">Blog Information</h3>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Blog Title</label>
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={onChange} 
          placeholder="Enter a compelling title..." 
          className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5 relative">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
          <select 
            name="category" 
            value={formData.category} 
            onChange={onChange} 
            className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#4A7C59] cursor-pointer"
          >
            <option value="Ayurveda Insights">Ayurveda Insights</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Nutrition">Nutrition</option>
            <option value="Yoga">Yoga</option>
          </select>
          <ChevronDown size={16} className="absolute right-4 top-[34px] text-gray-500 pointer-events-none" />
        </div>
        
        <div className="flex flex-col gap-1.5 relative">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target Audience</label>
          <select 
            name="audience" 
            value={formData.audience} 
            onChange={onChange} 
            className="w-full bg-white border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#4A7C59] cursor-pointer"
          >
            <option value="General Public">General Public</option>
            <option value="Patients">Existing Patients</option>
            <option value="Practitioners">Medical Practitioners</option>
          </select>
          <ChevronDown size={16} className="absolute right-4 top-[34px] text-gray-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default BlogInfoSection;