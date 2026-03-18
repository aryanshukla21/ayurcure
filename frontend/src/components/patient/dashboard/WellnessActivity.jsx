import React from 'react';

const WellnessActivity = ({ activityData }) => {
  // Default fallback if backend data is empty or missing
  const defaultData = [
    { day: 'Mon', yoga: 0, meditation: 0 },
    { day: 'Tue', yoga: 0, meditation: 0 },
    { day: 'Wed', yoga: 0, meditation: 0 },
    { day: 'Thu', yoga: 0, meditation: 0 },
    { day: 'Fri', yoga: 0, meditation: 0 },
    { day: 'Sat', yoga: 0, meditation: 0 },
    { day: 'Sun', yoga: 0, meditation: 0 },
  ];

  const dataToRender = activityData && activityData.length > 0 ? activityData : defaultData;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EFEBE1] h-full flex flex-col">
      <div className="flex justify-between items-start mb-8">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Weekly Wellness Activity</h3>
        <div className="flex items-center gap-4 text-xs font-semibold text-gray-600">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#2C5F44]"></div>
            Yoga
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#A88B5D]"></div>
            Meditation
          </div>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="flex-1 flex items-end justify-between gap-2 mt-4">
        {dataToRender.map((data, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="w-full flex justify-center gap-1 h-24 items-end mb-3">
              {/* Yoga Bar */}
              <div 
                className="w-3 rounded-t-sm bg-[#2C5F44] transition-all hover:opacity-80" 
                style={{ height: `${data.yoga}%` }}
              ></div>
              {/* Meditation Bar */}
              <div 
                className="w-3 rounded-t-sm bg-[#A88B5D] transition-all hover:opacity-80" 
                style={{ height: `${data.meditation}%` }}
              ></div>
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">{data.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WellnessActivity;