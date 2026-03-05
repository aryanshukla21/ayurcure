import React from 'react';

export const SelectDoctorCard = ({ doctor }) => {
    return (
        <div className={`bg-white p-6 rounded-[28px] border transition-all ${doctor.active ? 'border-ayur-orange shadow-md' : 'border-gray-100 shadow-sm hover:shadow-md'}`}>
            <div className="flex gap-4 items-start mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl">
                    {doctor.avatar}
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{doctor.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{doctor.title}</p>
                    <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                        <span className="text-green-500">★</span> {doctor.rating}
                        <span className="text-gray-400 font-normal ml-1">({doctor.reviews} reviews)</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-2xl">
                <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <span className="text-gray-400">💼</span> {doctor.exp} experience
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <span className="text-gray-400">🗣️</span> {doctor.langs}
                </div>
            </div>

            <button className={`w-full py-3.5 rounded-2xl font-bold transition-all ${doctor.active
                ? 'bg-ayur-orange text-white shadow-lg shadow-ayur-orange/20'
                : 'bg-white border-2 border-ayur-orange text-ayur-orange hover:bg-orange-50'
                }`}>
                {doctor.active ? 'Selected' : 'Select Doctor →'}
            </button>
        </div>
    );
};