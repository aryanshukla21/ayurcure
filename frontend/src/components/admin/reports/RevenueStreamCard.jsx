import React from 'react';

const RevenueStreamCard = () => {
  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm mb-8">
      <h3 className="text-lg font-bold text-gray-900 mb-8">Revenue Stream Analysis</h3>
      
      <div className="flex flex-col md:flex-row items-center gap-10">
        
        {/* CSS Donut Chart */}
        <div className="relative w-40 h-40 shrink-0">
          <div className="w-full h-full rounded-full" style={{ background: 'conic-gradient(#6D5E7B 0% 35%, #D49A44 35% 100%)' }}></div>
          {/* Inner white circle to make it a donut */}
          <div className="absolute inset-4 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</span>
            <span className="text-xl font-extrabold text-gray-900 leading-none">100%</span>
          </div>
        </div>

        {/* Breakdown Cards */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          
          {/* Product Revenue */}
          <div className="bg-[#FAF7F2] rounded-2xl p-6 border-l-4 border-l-[#D49A44] border border-y-[#EFEBE1] border-r-[#EFEBE1]">
            <p className="text-[10px] font-bold text-[#D49A44] uppercase tracking-widest mb-1.5">Product Revenue</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-1">₹3,14,000</h3>
            <p className="text-xs font-medium text-gray-500">~ 65% of total income</p>
          </div>

          {/* Consultation Revenue */}
          <div className="bg-[#FAF7F2] rounded-2xl p-6 border-l-4 border-l-[#6D5E7B] border border-y-[#EFEBE1] border-r-[#EFEBE1]">
            <p className="text-[10px] font-bold text-[#6D5E7B] uppercase tracking-widest mb-1.5">Consultation Revenue</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-1">₹1,68,900</h3>
            <p className="text-xs font-medium text-gray-500">~ 35% of total income</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RevenueStreamCard;