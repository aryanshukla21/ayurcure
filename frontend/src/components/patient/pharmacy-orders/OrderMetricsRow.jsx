import React from 'react';
import { Package, Truck, ShoppingBag } from 'lucide-react';

const OrderMetricsRow = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      {/* In Progress */}
      <div className="bg-white rounded-[24px] p-6 border border-[#EFEBE1] shadow-sm flex items-center gap-5">
        <div className="w-12 h-12 rounded-2xl bg-[#FFF4EB] flex items-center justify-center text-[#D9774B] shrink-0">
          <Package size={24} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">In Progress</p>
          <h3 className="text-xl font-extrabold text-gray-900">02 Orders</h3>
        </div>
      </div>

      {/* Shipped Today */}
      <div className="bg-white rounded-[24px] p-6 border border-[#EFEBE1] shadow-sm flex items-center gap-5">
        <div className="w-12 h-12 rounded-2xl bg-[#E7F3EB] flex items-center justify-center text-[#4A7C59] shrink-0">
          <Truck size={24} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Shipped Today</p>
          <h3 className="text-xl font-extrabold text-gray-900">01 Order</h3>
        </div>
      </div>

      {/* Total Spent */}
      <div className="bg-white rounded-[24px] p-6 border border-[#EFEBE1] shadow-sm flex items-center gap-5">
        <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] flex items-center justify-center text-[#9333EA] shrink-0">
          <ShoppingBag size={24} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Spent</p>
          <h3 className="text-xl font-extrabold text-gray-900">$1,240.50</h3>
        </div>
      </div>

    </div>
  );
};

export default OrderMetricsRow;