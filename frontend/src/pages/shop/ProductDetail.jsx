import React from 'react';
import { Button } from '../../components/common/Button';

export const ProductDetail = () => {
  const ingredients = [
    { name: "Bacopa Monnieri (Brahmi)", desc: "Known for rejuvenating brain cells and supporting nervous system function." },
    { name: "Centella Asiatica (Gotu Kola)", desc: "Enhances alertness and healthy circulation to the brain." },
    { name: "Withania Somnifera (Ashwagandha)", desc: "An adaptogen that helps the body manage stress." }
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left: Product Images & Core Info */}
        <div className="space-y-8">
          <div className="aspect-square bg-ayur-green-light rounded-[40px] overflow-hidden border border-gray-100 shadow-inner flex items-center justify-center">
            <span className="text-gray-300 font-bold">Product Image Placeholder</span>
          </div>

          <div className="bg-ayur-beige p-8 rounded-3xl border border-gray-100">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-ayur-green mb-4">Our Quality Promise</h3>
            <ul className="grid grid-cols-2 gap-4 text-xs font-bold text-gray-600">
              <li className="flex items-center gap-2">🌱 GMP Certified</li>
              <li className="flex items-center gap-2">🔬 Heavy Metal Tested</li>
              <li className="flex items-center gap-2">🚫 No Preservatives</li>
              <li className="flex items-center gap-2">🌍 Ethically Sourced</li>
            </ul>
          </div>
        </div>

        {/* Right: Storytelling & Selection */}
        <div className="flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            <span className="bg-ayur-orange/10 text-ayur-orange px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">Premium Formula</span>
            <div className="text-yellow-400 text-xs">★★★★★ <span className="text-gray-400 ml-1">(120 Reviews)</span></div>
          </div>

          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Brahmi Brain Booster</h1>
          <p className="text-lg text-gray-500 mb-8 leading-relaxed">Pure Ayurvedic formula for cognitive excellence & mental clarity.</p>

          <div className="mb-8">
            <span className="text-3xl font-black text-ayur-green">$24.99</span>
          </div>

          <div className="space-y-6 mb-10">
            <div>
              <p className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Quantity</p>
              <div className="flex gap-3">
                {["30 Caps", "60 Caps", "90 Caps"].map(size => (
                  <button key={size} className={`px-6 py-3 rounded-xl border-2 font-bold text-sm transition-all ${size === "60 Caps" ? "border-ayur-orange bg-orange-50 text-ayur-orange" : "border-gray-100 text-gray-400"}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Button variant="primary" className="w-full py-5 rounded-2xl text-lg font-black shadow-xl shadow-ayur-orange/20">
              Add to Cart
            </Button>
          </div>

          {/* Ancient Ingredients Section */}
          <div className="border-t border-gray-100 pt-10">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Ancient Ingredients</h3>
            <div className="space-y-6">
              {ingredients.map((ing) => (
                <div key={ing.name} className="flex gap-4 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-ayur-green-light flex-shrink-0 flex items-center justify-center group-hover:bg-ayur-green group-hover:text-white transition-colors">🌿</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{ing.name}</h4>
                    <p className="text-sm text-gray-500">{ing.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};