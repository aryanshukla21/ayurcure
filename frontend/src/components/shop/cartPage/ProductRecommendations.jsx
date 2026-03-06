import React from 'react';

export const ProductRecommendations = () => {
    const recommendedProducts = [
        { id: 1, name: 'Organic Triphala', price: '$12.00', imageBg: 'bg-yellow-600' },
        { id: 2, name: 'Neem Skin Care', price: '$19.90', imageBg: 'bg-green-800' },
        { id: 3, name: 'Shatavari Root', price: '$16.50', imageBg: 'bg-[#4A3B2C]' },
        { id: 4, name: 'Ayurvedic Mat Spray', price: '$14.00', imageBg: 'bg-orange-200' },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedProducts.map(product => (
                    <div key={product.id} className="group cursor-pointer">
                        {/* Image Placeholder */}
                        <div className={`w-full aspect-[4/5] rounded-[24px] ${product.imageBg} mb-4 relative overflow-hidden flex items-center justify-center text-4xl shadow-sm group-hover:shadow-md transition-shadow`}>
                            🌿
                        </div>

                        <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-ayur-orange transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-ayur-orange font-bold">{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};