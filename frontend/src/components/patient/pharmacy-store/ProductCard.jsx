import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    // Navigate to product details page when the card is clicked
    const handleCardClick = () => {
        navigate(`/patient/pharmacy-store/${product.id}`);
    };

    // Prevent navigation if the user clicks the "Add to Cart" button directly
    const handleAddToCart = (e) => {
        e.stopPropagation();
        console.log("Added to cart:", product.name);
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
            <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                <span className="font-bold text-lg text-gray-900">${Number(product.price).toFixed(2)}</span>
                <button
                    onClick={handleAddToCart}
                    className="bg-[#2D5A27] text-white p-2 rounded-full hover:bg-[#1E4620] transition-colors shadow-sm"
                >
                    <ShoppingCart className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;