import React from 'react';

export const CalendarWidget = ({ selectedDate, setSelectedDate }) => {
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    // Generating a mock array for November 2023 to match the UI
    // Nov 2023 starts on a Wednesday.
    const blanks = Array.from({ length: 3 });
    const days = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm max-w-sm">
            {/* Month Navigation */}
            <div className="flex justify-between items-center mb-6">
                <button className="text-gray-400 hover:text-gray-900 transition-colors">❮</button>
                <h4 className="font-bold text-gray-900">November 2023</h4>
                <button className="text-gray-400 hover:text-gray-900 transition-colors">❯</button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-2 mb-4 text-center text-xs font-bold text-gray-400">
                {daysOfWeek.map((day, index) => (
                    <div key={`dow-${index}`}>{day}</div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-sm">
                {blanks.map((_, index) => (
                    <div key={`blank-${index}`} className="text-transparent">0</div>
                ))}

                {days.map(day => (
                    <button
                        key={day}
                        onClick={() => setSelectedDate(day)}
                        className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center font-medium transition-all ${selectedDate === day
                            ? 'bg-ayur-orange text-white shadow-md shadow-ayur-orange/30'
                            : 'text-gray-700 hover:bg-orange-50 hover:text-ayur-orange'
                            }`}
                    >
                        {day}
                    </button>
                ))}
            </div>
        </div>
    );
};