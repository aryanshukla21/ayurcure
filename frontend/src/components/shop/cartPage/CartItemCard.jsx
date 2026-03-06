import React from 'react';

export const CartItemCard = ({ item }) => {
    return (
        <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
            {/* Product Image Placeholder */}
            <div className="w-24 h-24 bg-orange-50 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
                {item.icon}
            </div>

            <div className="flex-1 flex flex-col sm:flex-row justify-between items-center sm:items-start w-full gap-4">
                {/* Product Details */}
                <div className="text-center sm:text-left">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{item.variant}</p>
                    <div className="font-bold text-ayur-orange text-lg">{item.price}</div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                        <button className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-ayur-orange transition-colors">−</button>
                        <span className="px-4 py-1.5 font-bold text-gray-900 text-sm border-x border-gray-200">{item.quantity}</span>
                        <button className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-ayur-orange transition-colors">+</button>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Remove item">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};