import React from 'react';

export const CategoryFilters = () => {
    return (
        <div className="flex flex-wrap lg:flex-nowrap gap-4 mb-8">
            <div className="relative flex-1 min-w-[300px]">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                <input
                    type="text"
                    placeholder="Search by name, specialty or condition..."
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ayur-orange transition-all shadow-sm"
                />
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 lg:pb-0">
                <button className="bg-ayur-orange text-white px-6 py-3.5 rounded-2xl font-bold shadow-md shadow-ayur-orange/20 whitespace-nowrap flex items-center gap-2">
                    <span>⊞</span> All Specialists
                </button>
                <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3.5 rounded-2xl font-bold hover:bg-gray-50 transition-colors whitespace-nowrap flex items-center gap-2 shadow-sm">
                    <span>🌿</span> Ayurveda
                </button>
                <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3.5 rounded-2xl font-bold hover:bg-gray-50 transition-colors whitespace-nowrap flex items-center gap-2 shadow-sm">
                    <span>💆</span> Panchakarma
                </button>
                <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3.5 rounded-2xl font-bold hover:bg-gray-50 transition-colors whitespace-nowrap flex items-center gap-2 shadow-sm">
                    <span>🧘</span> Yoga Therapy
                </button>
            </div>
        </div>
    );
};