import React, { useState } from 'react';
import { CalendarWidget } from '../../components/booking/CalendarWidget';
import { TimeSlots } from '../../components/booking/TimeSlots';
import { SlotPickerFooter } from '../../components/booking/slotPicker/SlotPickerFooter';

export const SlotPicker = () => {
  const [selectedDate, setSelectedDate] = useState(8); // Defaulting to Nov 8th as per design
  const [selectedTime, setSelectedTime] = useState('10:00 AM');

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6 font-sans">
      <div className="bg-white w-full max-w-5xl rounded-[32px] shadow-sm border border-gray-100 flex flex-col overflow-hidden">

        {/* Header & Progress */}
        <div className="p-8 border-b border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 text-xl font-bold text-ayur-green">
              <span>🌿</span> AyurCure
            </div>
            <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
              ✕
            </button>
          </div>

          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-gray-900 font-bold text-lg">Step 2 of 4: Select Date & Time</h2>
            </div>
            <div className="text-ayur-orange font-bold text-sm">50%</div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-4">
            <div className="w-[50%] h-full bg-ayur-orange rounded-full"></div>
          </div>
          <p className="text-gray-500 text-sm">Almost there! Your wellness journey is just a few clicks away.</p>
        </div>

        {/* Main Content: Calendar and Slots */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 flex-1">
          {/* Left Column: Calendar */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Choose a Date</h3>
            <CalendarWidget selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </div>

          {/* Right Column: Time Slots */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Available Slots</h3>
            <TimeSlots selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
          </div>
        </div>

        {/* Footer Action Bar */}
        <SlotPickerFooter selectedDate={selectedDate} selectedTime={selectedTime} />
      </div>
    </div>
  );
};