import React, { useState } from 'react';

const ProductGallery = ({ images, name }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    return (
        <div>
            <div className="bg-white rounded-3xl p-6 aspect-[4/3] flex items-center justify-center shadow-sm border border-gray-100 mb-4">
                <img
                    src={images[activeImageIndex]}
                    alt={name}
                    className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-md"
                />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-4">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-20 h-20 rounded-xl bg-white flex items-center justify-center p-2 border-2 transition-all ${activeImageIndex === idx ? 'border-[#2D5A27] shadow-sm' : 'border-transparent shadow-sm hover:border-gray-200'
                            }`}
                    >
                        <img src={img} alt={`thumbnail-${idx}`} className="max-h-full object-contain mix-blend-multiply" />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductGallery;