import React from 'react';

const WeightTracker = ({ weightData }) => {
  // Safe fallbacks if backend data is missing
  const {
    currentWeight = 0,
    unit = 'kg',
    trend = 'down', // 'up' or 'down'
    trendValue = 0,
    labels = ['Aug', 'Sep', 'Oct']
  } = weightData || {};

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EFEBE1] h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Body Weight Tracker</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {currentWeight > 0 ? currentWeight : '--'}
              <span className="text-lg text-gray-500 font-medium"> {unit}</span>
            </span>
            {currentWeight > 0 && (
              <span className={`text-sm font-semibold flex items-center ${trend === 'down' ? 'text-green-600' : 'text-red-500'}`}>
                {trend === 'down' ? '↓' : '↑'} {trendValue}{unit}
              </span>
            )}
          </div>
        </div>
        {/* Simple legend */}
        <div className="flex gap-1 items-end h-8">
           <div className="w-1 bg-gray-300 h-full rounded-t-sm"></div>
           <div className="w-1 bg-gray-800 h-3/4 rounded-t-sm"></div>
        </div>
      </div>

      {/* Mocked SVG Line Chart */}
      <div className="flex-1 w-full relative mt-4 min-h-[120px]">
        <svg viewBox="0 0 400 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="20" x2="400" y2="20" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="50" x2="400" y2="50" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="80" x2="400" y2="80" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
          
          {/* The Data Line - In a real app with dynamic data, you'd calculate this path string based on history array */}
          <path 
            d="M 0 80 Q 40 80, 80 60 T 160 50 T 240 70 T 280 40 T 320 10 T 400 40" 
            fill="none" 
            stroke="#5B59B5" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>

        {/* X-Axis Labels */}
        <div className="absolute bottom-0 left-0 w-full flex justify-between text-[10px] font-bold text-gray-400 uppercase mt-2 transform translate-y-full">
          {labels.map((label, idx) => (
            <span key={idx}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeightTracker;