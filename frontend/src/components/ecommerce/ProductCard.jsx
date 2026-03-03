import React from 'react';
import { Button } from '../common/Button';

export const ProductCard = ({ name, price, rating, doshaTag, image }) => (
  <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
    <div className="relative h-48 bg-gray-50 rounded-2xl overflow-hidden mb-5">
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-ayur-green shadow-sm">
        {doshaTag}
      </div>
      {/* Product Image Placeholder */}
      <div className="w-full h-full bg-gray-200 group-hover:scale-110 transition-transform duration-500" />
    </div>

    <div className="flex justify-between items-start mb-2">
      <h4 className="font-bold text-gray-800 leading-tight flex-1">{name}</h4>
      <span className="text-ayur-green font-black ml-2">${price}</span>
    </div>

    <div className="flex items-center gap-1 mb-6">
      <span className="text-yellow-400 text-xs">★★★★★</span>
      <span className="text-[10px] text-gray-400 font-bold">({rating})</span>
    </div>

    <Button variant="primary" className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
      <span>🛒</span> Add to Cart
    </Button>
  </div>
);