import React from 'react';

export const OrderSummaryDetails = () => {
    return (
        <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                <span className="text-gray-400">📄</span> Order Details
            </h3>

            <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Order Number</span>
                    <span className="font-bold text-gray-900">#AC-88291</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200/60">
                    <span className="text-gray-500 font-medium">Order Date</span>
                    <span className="font-bold text-gray-900">Oct 18, 2023</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200/60">
                    <span className="text-gray-500 font-medium">Expected Delivery</span>
                    <span className="font-bold text-ayur-orange flex items-center gap-2">
                        <span>📅</span> Oct 24, 2023
                    </span>
                </div>
            </div>
        </div>
    );
};