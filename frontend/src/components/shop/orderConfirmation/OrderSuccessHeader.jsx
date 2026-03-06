import React from 'react';
import { Button } from '../../common/Button';
import { useNavigate } from 'react-router-dom';

export const OrderSuccessHeader = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center text-center">
            {/* Checkmark Icon */}
            <div className="w-16 h-16 bg-ayur-orange rounded-full flex items-center justify-center text-white text-3xl shadow-lg shadow-ayur-orange/30 mb-6">
                ✓
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>

            <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
                Your Ayurvedic wellness journey is about to begin. We've sent a confirmation email with all the details to your inbox.
            </p>

            <div className="flex gap-4">
                <Button
                    variant="primary"
                    className="bg-ayur-orange text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                    <span>🚚</span> Track Order
                </Button>
                <Button
                    variant="outline"
                    onClick={() => navigate('/shop')}
                    className="bg-[#FFF4ED] text-ayur-orange border-none px-8 py-3 rounded-xl font-bold hover:bg-orange-100 transition-colors flex items-center gap-2"
                >
                    <span>🛍️</span> Back to Shop
                </Button>
            </div>
        </div>
    );
};