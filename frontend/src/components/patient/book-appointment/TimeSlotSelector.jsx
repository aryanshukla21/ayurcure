import React from 'react';
import { Calendar } from 'lucide-react';

const TimeSlotSelector = ({ date, slots, selectedTime, onSelectTime, isLoading }) => {
  if (isLoading) {
    return (
      <>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Available Time Slots</h3>
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
          <Calendar size={16} className="text-gray-400" />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="py-6 rounded-xl bg-gray-100 animate-pulse"></div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <h3 className="text-xl font-bold text-gray-900 mb-6">Available Time Slots</h3>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-600">{date}</span>
        <Calendar size={16} className="text-gray-400" />
      </div>

      {slots && slots.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 mb-10">
          {slots.map((time) => (
            <button
              key={time}
              onClick={() => onSelectTime(time)}
              className={`py-3 rounded-xl text-sm font-bold transition-all ${selectedTime === time
                  ? 'bg-[#3A6447] text-white shadow-md'
                  : 'bg-[#FDF9EE] text-gray-700 hover:bg-[#F4F1EB]'
                }`}
            >
              {time}
            </button>
          ))}
        </div>
      ) : (
        <div className="mb-10 text-sm font-medium text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
          No available slots for this date.
        </div>
      )}
    </>
  );
};

export default TimeSlotSelector;