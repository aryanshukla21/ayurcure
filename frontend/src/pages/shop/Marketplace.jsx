import React from 'react';
import { ShopSidebar } from '../../components/ecommerce/ShopSidebar';
import { ProductCard } from '../../components/ecommerce/ProductCard';

export const Marketplace = () => {
  const products = [
    { name: "Organic Ashwagandha Root Powder", price: "24.00", rating: "124", doshaTag: "Pitta" },
    { name: "Triphala Digestion Support Caps", price: "32.00", rating: "89", doshaTag: "Vata" },
    { name: "Brahmi Mind & Clarity Elixir", price: "45.00", rating: "210", doshaTag: "Kapha" },
    { name: "Pure Cow Ghee (A2) - 500ml", price: "18.50", rating: "312", doshaTag: "Pitta" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Ayurvedic Supplements</h1>
          <p className="text-gray-500 mt-2">124 products found for your constitution.</p>
        </header>

        <div className="flex gap-12">
          <ShopSidebar />
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <div className="flex gap-4">
                <select className="bg-transparent border-none text-sm font-bold text-gray-500 outline-none">
                  <option>Sort by: Best Selling</option>
                  <option>Price: Low to High</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((p, i) => (
                <ProductCard key={i} {...p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};