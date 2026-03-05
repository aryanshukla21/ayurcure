import React from 'react';

export const SearchAndFilter = () => {
    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-10 flex flex-wrap lg:flex-nowrap items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[250px]">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                <input
                    type="text"
                    placeholder="Search doctors by name or specialty"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-ayur-green transition-all"
                />
            </div>

            {/* Filters */}
            <select className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:ring-2 focus:ring-ayur-green cursor-pointer">
                <option>Treatments</option>
                <option>Panchakarma</option>
                <option>Yoga Therapy</option>
            </select>

            <select className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:ring-2 focus:ring-ayur-green cursor-pointer">
                <option>Specialty</option>
                <option>Digestive Health</option>
                <option>Stress Management</option>
            </select>

            <select className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:ring-2 focus:ring-ayur-green cursor-pointer">
                <option>Experience</option>
                <option>5+ Years</option>
                <option>10+ Years</option>
            </select>

            <select className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:ring-2 focus:ring-ayur-green cursor-pointer">
                <option>Rating</option>
                <option>4.5 & Above</option>
                <option>5.0 Only</option>
            </select>

            {/* Toggle */}
            <label className="flex items-center gap-3 cursor-pointer pl-2">
                <div className="relative">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ayur-green"></div>
                </div>
                <span className="text-sm font-medium text-gray-700">Available Today</span>
            </label>
        </div>
    );
};