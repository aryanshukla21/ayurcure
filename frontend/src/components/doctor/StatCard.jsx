import React from 'react';

const StatCard = ({ icon, label, value, badge, badgeColor }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                {icon}
            </div>
            {badge && (
                <span className={`text-xs font-semibold px-2 py-1 rounded-md ${badgeColor || 'bg-orange-50 text-orange-600'}`}>
                    {badge}
                </span>
            )}
        </div>
        <div>
            <p className="text-xs text-gray-400 font-medium tracking-wider mb-1 uppercase">{label}</p>
            <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
        </div>
    </div>
);

export default StatCard;