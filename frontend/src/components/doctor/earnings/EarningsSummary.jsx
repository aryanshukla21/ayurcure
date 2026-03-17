import React from 'react';
import { DollarSign, Wallet, TrendingUp } from 'lucide-react';

const EarningsSummary = ({ stats }) => {
    // Default safe values
    const safeStats = stats || { totalEarnings: 0, monthlyEarnings: 0 };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

            {/* Total Earnings Card - Height increased to h-56 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center h-72 transition-transform hover:-translate-y-1 duration-300">

                {/* Icon and Title in the same row */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3.5 rounded-2xl bg-[#FDF9EE] text-[#4A7C59] shadow-sm">
                        <DollarSign size={28} />
                    </div>
                    <p className="text-sm text-gray-500 font-bold tracking-widest uppercase">Total Earnings</p>
                </div>

                {/* Amount */}
                <h2 className="text-5xl font-black text-gray-900 tracking-tight mb-4">
                    ${safeStats.totalEarnings.toLocaleString()}
                </h2>

                {/* Rise in amount indicator */}
                <div className="flex items-center gap-2 text-sm font-bold mt-4">
                    <TrendingUp size={18} className="text-green-600" />
                    <span className="text-green-600">+12.5%</span>
                    <span className="text-gray-400 font-medium tracking-wide">from last month</span>
                </div>

            </div>

            {/* Monthly Earnings Card - Height increased to h-56 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center h-72 transition-transform hover:-translate-y-1 duration-300">

                {/* Icon and Title in the same row */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600 shadow-sm">
                        <Wallet size={28} />
                    </div>
                    <p className="text-sm text-gray-500 font-bold tracking-widest uppercase">Monthly Earnings</p>
                </div>

                {/* Amount */}
                <h2 className="text-5xl font-black text-gray-900 tracking-tight mb-4">
                    ${safeStats.monthlyEarnings.toLocaleString()}
                </h2>

                {/* Rise in amount indicator */}
                <div className="flex items-center gap-2 text-sm font-bold mt-4">
                    <TrendingUp size={18} className="text-green-600" />
                    <span className="text-green-600">+8.2%</span>
                    <span className="text-gray-400 font-medium tracking-wide">from last month</span>
                </div>

            </div>

        </div>
    );
};

export default EarningsSummary;