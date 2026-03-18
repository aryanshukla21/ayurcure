import React from 'react';
import { UploadCloud, Info } from 'lucide-react';

const UploadReportCard = () => {
  return (
    <div className="bg-white rounded-[24px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Upload New Report</h3>
        <span className="text-[10px] font-extrabold text-[#4A7C59] bg-[#E7F3EB] px-3 py-1 rounded-full uppercase tracking-widest">
          Secure Cloud
        </span>
      </div>

      {/* Drag & Drop Zone */}
      <div className="border-2 border-dashed border-[#EFEBE1] rounded-2xl bg-[#FAF7F2] p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#F4F1EB] transition-colors mb-6 group">
        <div className="w-14 h-14 bg-[#3A6447] rounded-full flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-105 transition-transform">
          <UploadCloud size={24} />
        </div>
        <p className="text-sm font-bold text-gray-900 mb-1">Click to upload or drag & drop</p>
        <p className="text-xs font-medium text-gray-400">PDF, JPG or PNG (MAX. 20MB)</p>
      </div>

      {/* Info Box */}
      <div className="flex gap-3 bg-[#FDF9EE] p-4 rounded-xl border border-[#EFEBE1]">
        <Info size={18} className="text-[#D9774B] shrink-0 mt-0.5" />
        <p className="text-xs font-medium text-gray-600 leading-relaxed">
          Uploaded reports are automatically categorized by our Ayur AI to categorize and extract key metrics for your vitality trends.
        </p>
      </div>
    </div>
  );
};

export default UploadReportCard;