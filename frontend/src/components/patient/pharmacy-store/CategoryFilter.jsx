import React from 'react';

const CATEGORIES = ['All', 'Herbal Supplements', 'Digestive Care', 'Immunity Boosters', 'Skin Care', 'Wellness Products'];

const CategoryFilter = ({ activeCategory, setActiveCategory }) => {
    return (
        <div className="flex overflow-x-auto hide-scrollbar gap-3 mb-8 pb-2">
            {CATEGORIES.map(category => (
                <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category
                            ? 'bg-[#2D5A27] text-white shadow-sm'
                            : 'bg-[#F3EFE6] text-gray-700 hover:bg-[#E8E3D8]'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;