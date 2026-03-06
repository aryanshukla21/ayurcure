import React from 'react';

export const CouponCode = () => {
    return (
        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-4">
            <div className="font-bold text-gray-900 whitespace-nowrap">
                Have a coupon code?
            </div>
            <div className="flex w-full relative">
                <input
                    type="text"
                    placeholder="Enter code"
                    className="w-full pl-6 pr-24 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-ayur-orange transition-all"
                />
                <button className="absolute right-1 top-1 bottom-1 bg-gray-900 text-white px-6 rounded-lg font-bold hover:bg-gray-800 transition-colors text-sm">
                    Apply
                </button>
            </div>
        </div>
    );
};