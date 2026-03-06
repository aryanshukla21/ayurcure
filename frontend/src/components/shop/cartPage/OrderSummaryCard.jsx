import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../common/Button';

export const OrderSummaryCard = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">$73.49</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-bold text-green-500">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Estimated Tax</span>
                    <span className="font-bold text-gray-900">$4.50</span>
                </div>
            </div>

            <div className="pt-6 border-t border-gray-100 mb-8 flex justify-between items-end">
                <span className="font-bold text-gray-900 text-lg">Total</span>
                <span className="text-3xl font-bold text-ayur-orange">$77.99</span>
            </div>

            <Button
                variant="primary"
                onClick={() => navigate('/shop/checkout')}
                className="w-full bg-ayur-orange text-white py-4 rounded-xl font-bold shadow-lg shadow-ayur-orange/20 hover:bg-orange-600 transition-colors flex justify-center items-center gap-2"
            >
                Proceed to Checkout →
            </Button>

            <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="text-green-500">🔒</span> Secure checkout guaranteed
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="text-ayur-orange">🚚</span> Fast delivery in 3-5 business days
                </div>
            </div>
        </div>
    );
};