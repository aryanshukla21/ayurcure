import React from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, quantity = 0, onAddToCart, onUpdateQuantity }) => {
    const navigate = useNavigate();

    // Navigate to product details page when the card is clicked
    const handleCardClick = () => {
        navigate(`/patient/pharmacy-store/${product.id}`);
    };

    // Prevent navigation if the user clicks the "Add to Cart" button directly
    const handleInitialAdd = (e) => {
        e.stopPropagation();
        onAddToCart(product);
    };

    const handleIncrease = (e) => {
        e.stopPropagation();
        onUpdateQuantity(product.id, quantity + 1);
    };

    const handleDecrease = (e) => {
        e.stopPropagation();
        onUpdateQuantity(product.id, quantity - 1);
    };

    return (
        <div
            onClick={handleCardClick}
            className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full border border-gray-100 group cursor-pointer"
        >
            <div className="relative h-48 rounded-xl bg-gray-50 mb-4 overflow-hidden shrink-0 flex items-center justify-center p-4">
                {product.tag && (
                    <span className="absolute top-3 left-3 bg-[#4A3B2C] text-white text-[10px] font-bold px-2 py-1 rounded z-10">
                        {product.tag}
                    </span>
                )}
                <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{product.name}</h3>
            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>

            <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50 h-14">
                <span className="font-bold text-lg text-gray-900">${Number(product.price).toFixed(2)}</span>

                {/* Check if the item is already in the cart */}
                {quantity > 0 ? (
                    <div
                        className="flex items-center justify-between bg-[#E7F3EB] rounded-full border border-[#4A7C59]/30 px-1 py-1 w-24 h-10 shadow-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={handleDecrease}
                            className="w-8 h-8 rounded-full bg-white text-[#4A7C59] flex items-center justify-center hover:bg-[#4A7C59] hover:text-white transition-colors"
                        >
                            <Minus size={14} strokeWidth={3} />
                        </button>

                        <span className="text-[#2D5A27] font-bold text-sm w-4 text-center">
                            {quantity}
                        </span>

                        <button
                            onClick={handleIncrease}
                            className="w-8 h-8 rounded-full bg-[#4A7C59] text-white flex items-center justify-center hover:bg-[#3d6649] transition-colors"
                        >
                            <Plus size={14} strokeWidth={3} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleInitialAdd}
                        className="bg-[#2D5A27] text-white p-2.5 rounded-full hover:bg-[#1E4620] transition-colors shadow-sm"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;