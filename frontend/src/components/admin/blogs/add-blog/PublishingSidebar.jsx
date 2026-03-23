import React from 'react';
import { CheckCircle2, Globe, Search, PlusCircle } from 'lucide-react';

const PublishingSidebar = ({ formData, onChange, setFormData }) => {
  return (
    <div className="flex flex-col gap-8 h-full">
      
      {/* Publishing Status Card */}
      <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle2 size={18} className="text-[#3A6447]" />
          <h3 className="text-lg font-bold text-gray-900">Publishing Status</h3>
        </div>
        
        <div className="space-y-3">
          {/* Draft Option */}
          <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${formData.status === 'Draft' ? 'border-[#3A6447] bg-[#FDF9EE]' : 'border-[#EFEBE1] hover:bg-gray-50'}`}>
            <input type="radio" name="status" value="Draft" checked={formData.status === 'Draft'} onChange={onChange} className="mt-0.5" />
            <div>
              <p className="text-sm font-bold text-gray-900">Draft</p>
              <p className="text-xs font-medium text-gray-500">Only visible to administrators</p>
            </div>
          </label>
          
          {/* Published Option */}
          <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${formData.status === 'Published' ? 'border-[#3A6447] bg-[#FDF9EE]' : 'border-[#EFEBE1] hover:bg-gray-50'}`}>
            <input type="radio" name="status" value="Published" checked={formData.status === 'Published'} onChange={onChange} className="mt-0.5" />
            <div>
              <p className="text-sm font-bold text-gray-900">Published</p>
              <p className="text-xs font-medium text-gray-500">Visible immediately on the website</p>
            </div>
          </label>
          
          {/* Scheduled Option */}
          <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${formData.status === 'Scheduled' ? 'border-[#3A6447] bg-[#FDF9EE]' : 'border-[#EFEBE1] hover:bg-gray-50'}`}>
            <input type="radio" name="status" value="Scheduled" checked={formData.status === 'Scheduled'} onChange={onChange} className="mt-0.5" />
            <div>
              <p className="text-sm font-bold text-gray-900">Scheduled</p>
              <p className="text-xs font-medium text-gray-500">Select a future date and time</p>
            </div>
          </label>
        </div>
      </div>

      {/* Tags Card */}
      <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1.5 bg-[#E7F3EB] text-[#3A6447] text-[10px] font-extrabold uppercase tracking-widest rounded-full">
              {tag}
            </span>
          ))}
          <button className="p-1.5 text-gray-400 hover:text-[#3A6447] transition-colors rounded-full border border-dashed border-gray-300">
            <PlusCircle size={16} />
          </button>
        </div>
      </div>

      {/* SEO Configuration Card */}
      <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Globe size={18} className="text-[#3A6447]" />
          <h3 className="text-lg font-bold text-gray-900">SEO Configuration</h3>
        </div>
        
        <div className="flex flex-col gap-1.5 mb-6">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Focus Keyword</label>
          <input 
            type="text" 
            name="focusKeyword" 
            value={formData.focusKeyword} 
            onChange={onChange} 
            className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" 
          />
        </div>

        {/* SEO Preview Box */}
        <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EFEBE1]">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Search Preview</p>
          <h4 className="text-sm font-bold text-[#1a0dab] mb-1">{formData.title || 'Blog Title'} - Ayurcare360</h4>
          <p className="text-[10px] text-[#006621] mb-1">ayurcare360.com/blog/article-slug</p>
          <p className="text-xs text-[#545454] line-clamp-2 leading-relaxed">
            {formData.shortDescription || 'Write a short description to see how this post will appear in search results...'}
          </p>
        </div>
      </div>

      {/* Need Help Card */}
      <div className="bg-[#3A6447] rounded-[32px] p-8 shadow-sm text-white border border-[#2C4D36] mt-auto">
        <h3 className="text-lg font-bold mb-3">Need Help?</h3>
        <p className="text-sm font-medium text-white/80 leading-relaxed mb-6">
          Our editorial guidelines help maintain the high quality of Ayurcare360 content.
        </p>
        <button className="text-xs font-bold text-white hover:text-gray-200 transition-colors flex items-center gap-1">
          View Editorial Policy <span className="text-[10px]">→</span>
        </button>
      </div>

    </div>
  );
};

export default PublishingSidebar;