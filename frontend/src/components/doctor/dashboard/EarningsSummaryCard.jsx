import React from 'react';
import { MoreVertical } from 'lucide-react';

const EarningsSummaryCard = ({ earnings }) => {
    return (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 h-4/5 flex flex-col">
            <div className="flex justify-between items-center mb-10">
                <h3 className="text-lg font-extrabold text-gray-900">Earnings Summary</h3>
                <button className="text-gray-400 hover:text-gray-700 p-2 hover:bg-gray-50 rounded-full transition-colors">
                    <MoreVertical size={24} />
                </button>
            </div>

            <div className="mb-2 flex-1">
                <p className="text-sm text-gray-500 font-bold tracking-widest uppercase mb-4">Total Earnings</p>
                <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
                    ${earnings.total.toLocaleString()}
                </h2>
            </div>

            <div className="pt-2 border-t border-gray-100">
                <p className="text-sm text-gray-500 font-bold tracking-widest uppercase mb-4">Monthly Earnings</p>
                <h2 className="text-3xl font-extrabold text-[#4A7C59]">
                    ${earnings.monthly.toLocaleString()}
                </h2>
            </div>
        </div>
    );
};

export default EarningsSummaryCard;