import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';

const CartItem = ({ item, updateQuantity, removeItem }) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 border-b border-gray-100 gap-4">
            <div className="flex items-center gap-4 flex-1">
                <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2 border border-gray-100">
                    <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-sm md:text-base">{item.name}</h3>
                    <p className="text-gray-500 text-xs md:text-sm mt-0.5">{item.description}</p>
                </div>
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto sm:gap-8">
                {/* Quantity Control */}
                <div className="flex items-center bg-[#F3EFE6] rounded-full px-3 py-1.5 gap-4">
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="text-gray-500 hover:text-gray-900 disabled:opacity-50 transition-colors"
                    >
                        <Minus size={14} />
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <Plus size={14} />
                    </button>
                </div>

                {/* Price */}
                <div className="font-bold text-gray-900 text-base sm:text-lg w-20 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                </div>

                {/* Delete Button */}
                <button
                    onClick={() => removeItem(item.id)}
                    className="text-[#B8860B] hover:text-red-500 transition-colors p-2"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default CartItem;