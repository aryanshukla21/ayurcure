import React from 'react';

export const ShopSidebar = () => {
  const categories = ["Supplements", "Oils", "Personal Care", "Herbal Teas"];
  const doshas = ["Vata", "Pitta", "Kapha"];

  return (
    <aside className="w-64 space-y-8">
      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Categories</h4>
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center justify-between cursor-pointer group">
              <span className="text-gray-600 group-hover:text-ayur-orange transition-colors">{cat}</span>
              <span className="w-2 h-2 rounded-full bg-transparent group-hover:bg-ayur-orange"></span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Filter by Dosha</h4>
        <div className="flex flex-wrap gap-2">
          {doshas.map((dosha) => (
            <button
              key={dosha}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${dosha === "Pitta"
                  ? 'bg-ayur-orange border-ayur-orange text-white shadow-md'
                  : 'bg-white border-gray-200 text-gray-500 hover:border-ayur-orange'
                }`}
            >
              {dosha}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Price Range</h4>
        <input type="range" className="w-full accent-ayur-orange" min="10" max="200" />
        <div className="flex justify-between mt-2 text-xs font-bold text-gray-400">
          <span>$10</span>
          <span>$200</span>
        </div>
      </div>
    </aside>
  );
};
