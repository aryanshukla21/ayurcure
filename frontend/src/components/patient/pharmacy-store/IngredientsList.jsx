import React from 'react';

const IngredientsList = ({ ingredients }) => {
    if (!ingredients || ingredients.length === 0) return null;

    return (
        <div className="bg-green-800 rounded-3xl p-8 text-white flex flex-col justify-between shadow-md h-full">
            <div>
                <span className="text-[10px] font-bold tracking-wider text-[#A5C1A7] mb-2 block uppercase">ACTIVE COMPOSITION</span>
                <h3 className="text-xl font-bold mb-8">Ethically Sourced Ingredients</h3>

                <div className="space-y-4 mb-8">
                    {ingredients.map((ing, idx) => (
                        <div key={idx} className="flex justify-between items-center border-b border-[#3E6E38] pb-3">
                            <span className="text-[#E8F0E9] text-sm">{ing.name}</span>
                            <span className="font-bold">{ing.percentage}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-green-900 p-4 rounded-xl text-xs text-[#A5C1A7] leading-relaxed border border-[#3E6E38]">
                Free from GMOs, gluten, and synthetic fillers. Laboratory tested for heavy metals and purity.
            </div>
        </div>
    );
};

export default IngredientsList;