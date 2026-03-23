import React from 'react';
import { Printer } from 'lucide-react';

const OrderSummaryHeader = ({ order }) => {
  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
      
      <div className="flex flex-col md:flex-row md:items-center gap-8">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order Reference</p>
          <h2 className="text-2xl font-extrabold text-gray-900">{order.id}</h2>
        </div>
        
        <div className="hidden md:block w-px h-10 bg-[#EFEBE1]"></div>
        
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Placed On</p>
          <h2 className="text-base font-bold text-gray-900">{order.date}</h2>
        </div>

        <div className="hidden md:block w-px h-10 bg-[#EFEBE1]"></div>

        <div className="flex items-center gap-3">
          <span className="px-4 py-1.5 bg-[#E7F3EB] text-[#3A6447] text-[10px] font-extrabold uppercase tracking-widest rounded-full shadow-sm">
            {order.orderStatus}
          </span>
          <span className="px-4 py-1.5 bg-[#E7F3EB] text-[#3A6447] text-[10px] font-extrabold uppercase tracking-widest rounded-full shadow-sm">
            {order.paymentStatus}
          </span>
        </div>
      </div>

      <button className="bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-3.5 px-8 rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm text-sm w-full md:w-auto">
        <Printer size={18} /> Print Invoice
      </button>

    </div>
  );
};

export default OrderSummaryHeader;