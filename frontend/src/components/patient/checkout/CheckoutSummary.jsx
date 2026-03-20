import React from 'react';
import { Lock } from 'lucide-react';

const CheckoutSummary = ({ subtotal, tax, total, onPayNow, isSubmitting }) => {
    return (
        <div className="bg-[#ebe7db] rounded-3xl p-6 md:p-8 border border-[#E8E3D8]">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

            <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Product Total</span>
                    <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Charges</span>
                    <span className="font-bold text-[#2D5A27]">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Platform Tax (5%)</span>
                    <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex justify-between items-center border-t border-[#E8E3D8] pt-6 mb-8">
                <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">FINAL AMOUNT</span>
                <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-gray-900">${total.toFixed(2)}</span>
                    <span className="bg-[#2D5A27] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Cart + Fee</span>
                </div>
            </div>

            <button
                onClick={onPayNow}
                disabled={isSubmitting}
                className="w-full bg-[#4A7C59] text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#3E6E38] transition-colors shadow-md disabled:opacity-70"
            >
                {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                    <>
                        <Lock size={16} />
                        Pay Now
                    </>
                )}
            </button>
            <p className="text-[10px] text-center text-gray-400 mt-4 leading-relaxed px-4">
                By clicking Pay Now, you agree to Ayurcare360's Terms of Service and Privacy Policy.
            </p>
        </div>
    );
};

export default CheckoutSummary;