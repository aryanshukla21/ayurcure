import React from 'react';
import { OrderSuccessHeader } from '../../components/shop/orderConfirmation/OrderSuccessHeader';
import { OrderSummaryDetails } from '../../components/shop/orderConfirmation/OrderSummaryDetails';
import { ShippingAddressDetails } from '../../components/shop/orderConfirmation/ShippingAddressDetails';
import { ReceiptNotice } from '../../components/shop/orderConfirmation/ReceiptNotice';

export const OrderConfirmation = () => {
    return (
        <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center p-6 font-sans">
            {/* Top Navbar / Header */}
            <div className="w-full max-w-5xl flex justify-between items-center py-6 mb-4">
                <div className="flex items-center gap-2 text-xl font-bold text-ayur-green">
                    <span>🌿</span> AyurCure
                </div>
                <div className="flex gap-4">
                    <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                        🔔
                    </button>
                    <button className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-ayur-orange font-bold">
                        SJ
                    </button>
                </div>
            </div>

            {/* Main Confirmation Card */}
            <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-sm border border-gray-100 p-8 md:p-12 flex flex-col items-center">

                <OrderSuccessHeader />

                <div className="w-full space-y-8 mt-10">
                    <OrderSummaryDetails />
                    <ShippingAddressDetails />
                </div>

                <div className="w-full mt-10">
                    <ReceiptNotice />
                </div>

            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-gray-400">
                © 2023 AyurCure Wellness. All rights reserved.
            </div>
        </div>
    );
};