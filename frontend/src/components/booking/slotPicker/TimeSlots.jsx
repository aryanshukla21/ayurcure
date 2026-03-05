import React from 'react';

export const TimeSlots = ({ selectedTime, setSelectedTime }) => {
    const timeCategories = [
        {
            title: 'Morning',
            icon: '☀️',
            slots: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM']
        },
        {
            title: 'Afternoon',
            icon: '🌤️',
            slots: ['01:00 PM', '02:00 PM', '03:30 PM']
        },
        {
            title: 'Evening',
            icon: '🌙',
            slots: ['05:00 PM', '06:00 PM', '07:30 PM']
        }
    ];

    return (
        <div className="space-y-8">
            {timeCategories.map((category, index) => (
                <div key={index}>
                    <div className="flex items-center gap-2 mb-4 text-sm font-bold text-gray-900">
                        <span>{category.icon}</span> {category.title}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {category.slots.map(time => (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-3 rounded-xl text-sm font-medium transition-all ${selectedTime === time
                                    ? 'bg-orange-50 border-2 border-ayur-orange text-ayur-orange'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:border-ayur-orange hover:text-ayur-orange'
                                    }`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};