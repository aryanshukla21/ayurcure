import React, { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderSummaryPanel = ({ subtotal, taxes, total }) => {
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState('AYUR20');

    return (
        <div className="w-full">
            {/* Summary Box */}
            <div className="bg-[#F9F7F2] rounded-3xl p-6 md:p-8 border border-[#E8E3D8] mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Estimated Taxes</span>
                        <span className="font-bold text-gray-900">${taxes.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-end text-xs text-gray-500 italic mt-1 text-right">
                        Shipping Calculated at next step
                    </div>
                </div>

                <div className="flex justify-between items-center border-t border-[#E8E3D8] pt-6 mb-8">
                    <span className="font-bold text-gray-900">Total<br />Amount</span>
                    <span className="text-2xl font-bold text-[#2D5A27]">${total.toFixed(2)}</span>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => navigate('/patient/checkout')}
                        className="w-full bg-[#2D5A27] text-white py-3.5 rounded-2xl font-bold flex items-center justify-between px-6 hover:bg-[#1E4620] transition-colors shadow-sm"
                    >
                        Proceed to Checkout
                        <ArrowRight size={18} />
                    </button>
                    <button
                        onClick={() => navigate('/patient/pharmacy-store')}
                        className="w-full bg-white text-gray-700 py-3.5 rounded-2xl font-medium border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        Continue Shopping
                    </button>
                </div>

                <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-500">
                    <Lock size={14} />
                    <span>Secure encrypted checkout<br />powered by AyurPay</span>
                </div>
            </div>

            {/* Promo Code Box */}
            <div className="bg-[#F3EFE6] rounded-2xl p-6 border border-[#E8E3D8]">
                <span className="text-xs font-bold tracking-wider text-gray-500 mb-3 block uppercase">APPLY PROMO CODE</span>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 bg-white rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B6A47]/30 uppercase"
                    />
                    <button className="bg-[#8B6A47] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#705538] transition-colors shadow-sm">
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSummaryPanel;