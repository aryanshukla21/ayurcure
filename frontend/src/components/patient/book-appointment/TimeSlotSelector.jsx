import React from 'react';
import { Calendar } from 'lucide-react';

const TimeSlotSelector = ({ date, slots, selectedTime, onSelectTime }) => {
  return (
    <>
      <h3 className="text-xl font-bold text-gray-900 mb-6">Available Time Slots</h3>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-600">{date}</span>
        <Calendar size={16} className="text-gray-400" />
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-10">
        {slots.map((time) => (
          <button
            key={time}
            onClick={() => onSelectTime(time)}
            className={`py-3 rounded-xl text-sm font-bold transition-all ${
              selectedTime === time 
                ? 'bg-[#3A6447] text-white shadow-md' 
                : 'bg-[#FDF9EE] text-gray-700 hover:bg-[#F4F1EB]'
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </>
  );
};

export default TimeSlotSelector;