import React from 'react';

export const PrescriptionsList = () => {
    const prescriptions = [
        { id: 1, name: 'Nadi Pariksha Report', doc: 'Dr. Anjali Sharma', date: 'Oct 12, 2023', icon: '💼' },
        { id: 2, name: 'Immunity Booster Plan', doc: 'Dr. Vikram Raj', date: 'Sep 28, 2023', icon: '💊' },
        { id: 3, name: 'Panchakarma Diet Chart', doc: 'Dr. Anjali Sharma', date: 'Sep 15, 2023', icon: '🥗' },
    ];

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                    <span className="text-ayur-orange text-xl">📄</span> My Prescriptions
                </h3>
                <button className="text-sm font-bold text-ayur-orange hover:text-orange-600 transition-colors">
                    View All
                </button>
            </div>

            <div className="space-y-8 flex-1">
                {prescriptions.map(item => (
                    <div key={item.id} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#FFF4ED] text-ayur-orange rounded-xl flex items-center justify-center text-xl">
                                {item.icon}
                            </div>
                            <div>
                                <div className="font-bold text-gray-900 mb-1">{item.name}</div>
                                <div className="text-sm text-gray-500">{item.doc} • {item.date}</div>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
                            <span className="text-lg">📥</span> PDF
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};