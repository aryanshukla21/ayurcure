import React from 'react';

const QuickInsightsCard = () => {
  return (
    <div className="bg-white rounded-[24px] p-6 border border-[#EFEBE1] shadow-sm">
      <h3 className="text-[11px] font-bold text-amber-800 uppercase tracking-widest mb-4">Quick Insights</h3>

      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-bold text-gray-900">Storage Used</span>
        <span className="text-sm font-bold text-[#4A7C59]">45%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#EFEBE1] rounded-full h-2.5 mb-4 overflow-hidden">
        <div className="bg-[#4A7C59] h-2.5 rounded-full" style={{ width: '45%' }}></div>
      </div>

      <p className="text-[10px] font-medium text-gray-400">Next scheduled tests: Oct 28, 2023</p>
    </div>
  );
};

export default QuickInsightsCard;