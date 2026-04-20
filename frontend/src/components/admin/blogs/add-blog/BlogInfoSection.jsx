import React from 'react';

const BlogInfoSection = ({ formData, onChange }) => {
  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm">
      <h2 className="text-xl font-extrabold text-gray-900 mb-6">Basic Information</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Blog Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl py-3.5 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 transition-all"
            placeholder="Enter blog title"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={onChange}
              className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl py-3.5 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 transition-all cursor-pointer"
            >
              <option value="Ayurveda Insights">Ayurveda Insights</option>
              <option value="Wellness & Lifestyle">Wellness & Lifestyle</option>
              <option value="Diet & Nutrition">Diet & Nutrition</option>
              <option value="Case Studies">Case Studies</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Target Audience</label>
            <select
              name="audience"
              value={formData.audience}
              onChange={onChange}
              className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl py-3.5 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 transition-all cursor-pointer"
            >
              <option value="General Public">General Public</option>
              <option value="Patients">Patients</option>
              <option value="Medical Professionals">Medical Professionals</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Short Description</label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={onChange}
            rows="3"
            className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl py-3.5 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 transition-all"
            placeholder="Brief summary of the article..."
          />
        </div>
      </div>
    </div>
  );
};
export default BlogInfoSection;