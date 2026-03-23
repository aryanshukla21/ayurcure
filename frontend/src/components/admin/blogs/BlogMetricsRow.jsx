import React from 'react';
import { Sparkles, ClipboardEdit, Eye } from 'lucide-react';

const BlogMetricsRow = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      
      {/* Trending Category */}
      <div className="bg-[#FAF7F2] rounded-[24px] p-6 border border-[#EFEBE1] shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-[#9333EA]">
             <Sparkles size={20} />
          </div>
          <h3 className="text-sm font-bold text-gray-900">Trending Category</h3>
        </div>
        <p className="text-xs font-medium text-gray-600 leading-relaxed">
          <span className="font-bold text-gray-900">"Pitta Balancing"</span> diet searches are up 45% this week.
        </p>
      </div>

      {/* Review Required */}
      <div className="bg-[#FAF7F2] rounded-[24px] p-6 border border-[#EFEBE1] shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-[#D9774B]">
             <ClipboardEdit size={20} />
          </div>
          <h3 className="text-sm font-bold text-gray-900">Review Required</h3>
        </div>
        <p className="text-xs font-medium text-gray-600 leading-relaxed">
          <span className="font-bold text-gray-900">3 drafts</span> are awaiting clinical validation before publishing.
        </p>
      </div>

      {/* Blog Traffic */}
      <div className="bg-[#E7F3EB] rounded-[24px] p-6 border border-[#C2D1C7] shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-[#3A6447]">
             <Eye size={20} />
          </div>
          <h3 className="text-sm font-bold text-[#2C4D36]">Blog Traffic</h3>
        </div>
        <p className="text-xs font-medium text-[#3A6447] leading-relaxed">
          Total <span className="font-extrabold">12.4k views</span> this month across all wellness blogs.
        </p>
      </div>

    </div>
  );
};

export default BlogMetricsRow;