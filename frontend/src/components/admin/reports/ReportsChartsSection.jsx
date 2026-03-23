import React from 'react';
import { MoreVertical } from 'lucide-react';

const ReportsChartsSection = () => {
  const barData = [40, 65, 85, 45, 70, 95, 55];
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      
      {/* Orders Trend - CSS Bar Chart */}
      <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-bold text-gray-900">Orders Trend</h3>
          <button className="text-gray-400 hover:text-gray-900 transition-colors"><MoreVertical size={20} /></button>
        </div>
        
        <div className="h-48 flex items-end justify-between gap-2 md:gap-4 px-2">
          {barData.map((height, i) => (
            <div key={i} className="flex flex-col items-center gap-3 w-full group">
              <div className="w-full bg-[#FDF9EE] rounded-t-lg relative h-full flex items-end">
                <div 
                  className={`w-full rounded-t-lg transition-all duration-500 ${i === 2 ? 'bg-[#3A6447]' : 'bg-[#EFEBE1] group-hover:bg-[#C2D1C7]'}`}
                  style={{ height: `${height}%` }}
                ></div>
              </div>
              <span className="text-[10px] font-bold text-gray-400">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Growth - SVG Line Chart */}
      <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-bold text-gray-900">Revenue Growth</h3>
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
             <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#3A6447]"></div>This Week</span>
             <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#EFEBE1]"></div>Last Week</span>
          </div>
        </div>

        <div className="flex-1 w-full relative min-h-[192px]">
          {/* Custom SVG Line Chart */}
          <svg viewBox="0 0 400 150" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            {/* Last Week Line */}
            <path d="M 0,100 C 50,120 150,40 200,80 C 250,120 350,60 400,90" fill="none" stroke="#EFEBE1" strokeWidth="3" strokeLinecap="round" />
            {/* This Week Line */}
            <path d="M 0,130 C 80,130 150,10 220,50 C 280,90 350,120 400,20" fill="none" stroke="#3A6447" strokeWidth="4" strokeLinecap="round" />
            {/* Data Point Dot */}
            <circle cx="400" cy="20" r="5" fill="#fff" stroke="#3A6447" strokeWidth="3" />
          </svg>
          
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] font-bold text-gray-400 mt-4 px-2">
            <span>10 AM</span>
            <span>12 PM</span>
            <span>02 PM</span>
            <span>04 PM</span>
            <span>06 PM</span>
            <span>08 PM</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ReportsChartsSection;