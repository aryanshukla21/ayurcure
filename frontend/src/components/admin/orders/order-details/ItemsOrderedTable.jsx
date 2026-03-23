import React from 'react';

const ItemsOrderedTable = ({ items }) => {
  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm mb-8">
      <h3 className="text-lg font-bold text-green-700 mb-6">Items Ordered</h3>

      <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-4 border-b border-[#EFEBE1]">
        <div className="w-[45%] pl-2">Product Name</div>
        <div className="w-[15%] text-center">Qty</div>
        <div className="w-[20%] text-right">Price</div>
        <div className="w-[20%] text-right pr-2">Subtotal</div>
      </div>

      <div className="mt-2 space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center py-4 border-b border-[#EFEBE1] last:border-0 px-2">
            <div className="w-[45%] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FDF9EE] flex items-center justify-center border border-[#EFEBE1]">
                 <span className="text-[10px] font-extrabold text-[#3A6447]">AYU</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{item.name}</span>
            </div>
            <div className="w-[15%] text-sm font-bold text-gray-900 text-center">{item.qty}</div>
            <div className="w-[20%] text-sm font-medium text-gray-600 text-right">₹{item.price}</div>
            <div className="w-[20%] text-sm font-extrabold text-green-700 text-right pr-2">₹{item.subtotal}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsOrderedTable;