import React from 'react';
import { ShoppingCart } from 'lucide-react';

const FloatingCart = ({ cartTotal }) => {
    if (cartTotal <= 0) return null;

    return (
        <div className="fixed bottom-8 right-8 bg-[#1E231E] text-white rounded-2xl p-3 shadow-2xl flex items-center gap-5 border border-gray-700 animate-fade-in-up z-50 hover:scale-105 transition-transform cursor-pointer">
            <div className="flex items-center gap-3 pl-2">
                <div className="relative">
                    <ShoppingCart className="w-5 h-5 text-gray-300" />
                    <span className="absolute -top-2 -right-2 bg-[#2D5A27] text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">2</span>
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 font-medium tracking-wider mb-0.5">YOUR CART</p>
                    <p className="font-bold text-sm leading-none">${cartTotal.toFixed(2)}</p>
                </div>
            </div>
            <button className="bg-[#2D5A27] hover:bg-[#1E4620] px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
                Checkout
            </button>
        </div>
    );
};

export default FloatingCart;