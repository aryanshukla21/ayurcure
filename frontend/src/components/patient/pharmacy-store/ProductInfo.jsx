import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingCart, Heart, ShieldCheck, Plus, Minus } from 'lucide-react';
import { useCart } from '../../../context/CartContext';

const ProductInfo = ({ product, onAddToCart }) => {
    // Default to the first available dosage on load
    const [selectedDosage, setSelectedDosage] = useState('');

    useEffect(() => {
        if (product?.availableDosages?.length > 0) {
            setSelectedDosage(product.availableDosages[0]);
        }
    }, [product]);

    // Generate dynamic pricing based on dosage selections
    const dosagePricing = useMemo(() => {
        if (!product.availableDosages) return null;

        return product.availableDosages.reduce((acc, dose, index) => {
            // Mock multipliers: Base (50g) = 1x, Mid (100g) = 1.8x, Large (250g) = 4.2x
            let multiplier = 1;
            if (index === 1) multiplier = 1.8;
            if (index === 2) multiplier = 4.2;

            acc[dose] = {
                price: product.price * multiplier,
                originalPrice: product.originalPrice ? product.originalPrice * multiplier : null
            };
            return acc;
        }, {});
    }, [product]);

    const currentPrice = dosagePricing && selectedDosage ? dosagePricing[selectedDosage].price : product.price;
    const currentOriginalPrice = dosagePricing && selectedDosage ? dosagePricing[selectedDosage].originalPrice : product.originalPrice;

    // We make a unique Cart ID based on selected dosage so Cart separates "50g" from "250g" 
    const variantId = selectedDosage ? `${product.id}-${selectedDosage}` : product.id;

    // Check the global cart for the CURRENT variant selected to dictate UI buttons
    const { cartItems, updateQuantity } = useCart();
    const cartItem = cartItems.find(item => item.id === variantId);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAddClick = () => {
        const variantProduct = {
            ...product,
            id: variantId, // Override ID
            price: currentPrice, // Override Price
            originalPrice: currentOriginalPrice,
            name: selectedDosage ? `${product.name} (${selectedDosage})` : product.name,
            dosage: selectedDosage
        };
        onAddToCart(variantProduct, 1);
    };

    return (
        <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-[#2D5A27]" />
                <span className="text-xs font-bold text-green-900 bg-green-100 py-1 px-2 rounded-full tracking-wider">{product.tag}</span>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">{product.name}</h2>
            <p className="text-amber-800 leading-relaxed mb-8">{product.description}</p>

            {/* Dynamic Pricing */}
            <div className="flex items-center gap-4 mb-8 h-10">
                <span className="text-4xl font-bold text-green-700">${Number(currentPrice).toFixed(2)}</span>
                {currentOriginalPrice && (
                    <span className="text-lg text-gray-400 line-through">${Number(currentOriginalPrice).toFixed(2)}</span>
                )}
                {product.discountPercentage && (
                    <span className="bg-[#FDF3E1] text-[#B8860B] text-xs font-bold px-3 py-1.5 rounded-md transition-all">
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
                                    ? 'bg-green-800 text-white shadow-md scale-105'
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
                {/* Dynamically swaps if the current variation is in the cart */}
                {quantity > 0 ? (
                    <div className="flex-1 flex items-center justify-between bg-[#E7F3EB] rounded-full border border-[#4A7C59]/30 px-2 py-1 max-w-[200px] h-[52px] shadow-sm transition-all duration-300">
                        <button
                            onClick={() => updateQuantity(variantId, quantity - 1)}
                            className="w-10 h-10 rounded-full bg-white text-[#4A7C59] flex items-center justify-center hover:bg-[#4A7C59] hover:text-white transition-colors shadow-sm"
                        >
                            <Minus size={18} strokeWidth={3} />
                        </button>

                        <span className="text-[#2D5A27] font-bold text-lg w-8 text-center">
                            {quantity}
                        </span>

                        <button
                            onClick={() => updateQuantity(variantId, quantity + 1)}
                            className="w-10 h-10 rounded-full bg-[#4A7C59] text-white flex items-center justify-center hover:bg-[#3d6649] transition-colors shadow-sm"
                        >
                            <Plus size={18} strokeWidth={3} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleAddClick}
                        className="flex-1 bg-green-800 text-white py-3.5 px-6 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#1E4620] transition-colors shadow-sm max-w-[250px]"
                    >
                        <ShoppingCart size={18} />
                        Add to Cart
                    </button>
                )}

                <button className="w-[52px] h-[52px] shrink-0 bg-white border border-gray-200 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-colors shadow-sm">
                    <Heart size={20} />
                </button>
            </div>
        </div>
    );
};

export default ProductInfo;