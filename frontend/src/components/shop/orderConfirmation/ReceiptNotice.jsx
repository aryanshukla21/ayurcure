import React from 'react';

export const ReceiptNotice = () => {
    return (
        <div className="bg-[#FFF4ED] border border-orange-100 rounded-2xl p-5 flex items-start gap-4">
            <div className="text-ayur-orange text-xl mt-0.5">
                ℹ️
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
                A copy of this receipt has been sent to <span className="font-medium text-gray-900">sarah@example.com</span>. If you have any questions please contact our <span className="font-medium text-ayur-orange cursor-pointer hover:underline">24/7 support team</span>.
            </p>
        </div>
    );
};