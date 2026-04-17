import React from 'react';
import { Activity, TrendingDown, TrendingUp } from 'lucide-react';

const WeightTracker = ({ weightData, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm animate-pulse h-64 flex flex-col">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="flex-1 bg-gray-50 rounded-2xl"></div>
      </div>
    );
  }

  // Safe destructuring
  const {
    currentWeight = '--',
    unit = 'kg',
    trend = 'down',
    trendValue = '0',
    labels = []
  } = weightData || {};

  const isTrendDown = trend === 'down';

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#E7F3EB] p-2.5 rounded-xl text-[#4A7C59]">
            <Activity size={20} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Body Weight</h3>
        </div>
      </div>

      <div className="flex items-end gap-4 mb-6">
        <div className="flex items-baseline">
          <span className="text-4xl font-extrabold text-gray-900">{currentWeight}</span>
          <span className="text-lg font-bold text-gray-500 ml-1">{unit}</span>
        </div>

        {currentWeight !== '--' && (
          <div className={`flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-lg mb-1.5 ${isTrendDown ? 'bg-[#E7F3EB] text-[#4A7C59]' : 'bg-[#FEE2E2] text-[#EF4444]'}`}>
            {isTrendDown ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
            {trendValue}{unit}
          </div>
        )}
      </div>

      {/* Custom Tailwind Bar Chart Representation */}
      <div className="flex-1 mt-4 flex items-end justify-between gap-2 h-32 relative">
        {/* Background Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between z-0">
          <div className="border-b border-gray-100 w-full h-0"></div>
          <div className="border-b border-gray-100 w-full h-0"></div>
          <div className="border-b border-gray-100 w-full h-0"></div>
        </div>

        {labels.length > 0 ? (
          labels.map((label, index) => {
            // Simulated heights for the visual based on index
            const heights = ['h-[60%]', 'h-[75%]', 'h-[45%]'];
            const heightClass = heights[index % heights.length];

            return (
              <div key={index} className="flex flex-col items-center gap-2 flex-1 z-10 group">
                <div className={`w-full max-w-[40px] bg-[#E7F3EB] group-hover:bg-[#4A7C59] transition-colors rounded-t-lg ${heightClass}`}></div>
                <span className="text-xs font-semibold text-gray-400">{label}</span>
              </div>
            );
          })
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-400 z-10">
            No weight data logged yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default WeightTracker;