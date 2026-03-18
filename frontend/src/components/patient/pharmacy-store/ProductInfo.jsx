import React, { useState } from 'react';
import { ShoppingCart, Heart, ShieldCheck } from 'lucide-react';

const ProductInfo = ({ product }) => {
    const [selectedDosage, setSelectedDosage] = useState(product.availableDosages?.[1] || '');

    return (
        <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-[#2D5A27]" />
                <span className="text-xs font-bold text-green-900 bg-green-100 py-1 px-2 rounded-full tracking-wider">{product.tag}</span>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">{product.name}</h2>
            <p className="text-amber-800 leading-relaxed mb-8">{product.description}</p>

            {/* Pricing */}
            <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-bold text-green-700">${Number(product.price).toFixed(2)}</span>
                {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">${Number(product.originalPrice).toFixed(2)}</span>
                )}
                {product.discountPercentage && (
                    <span className="bg-[#FDF3E1] text-[#B8860B] text-xs font-bold px-3 py-1.5 rounded-md">
                        Save {product.discountPercentage}%
                    </span>
                )}
            </div>

            {/* Dosage Selection */}
            {product.availableDosages && product.availableDosages.length > 0 && (
                <div className="mb-8">
                    <span className="text-xs font-bold tracking-wider text-gray-400 mb-3 block uppercase">DOSAGE</span>
                    <div className="flex gap-3">
                        {product.availableDosages.map(dose => (
                            <button
                                key={dose}
                                onClick={() => setSelectedDosage(dose)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${selectedDosage === dose
                                    ? 'bg-green-800 text-white shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-[#F3EFE6]'
                                    }`}
                            >
                                {dose}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
                <button className="flex-1 bg-green-800 text-white py-3.5 px-6 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#1E4620] transition-colors shadow-sm">
                    <ShoppingCart size={18} />
                    Add to Pharmacy Cart
                </button>
                <button className="w-14 h-14 bg-white border border-gray-200 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-colors shadow-sm">
                    <Heart size={20} />
                </button>
            </div>
        </div>
    );
};

export default ProductInfo;