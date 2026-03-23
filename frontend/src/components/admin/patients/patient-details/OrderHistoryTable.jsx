import React from 'react';

const OrderHistoryTable = ({ orders }) => {
  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Order History</h3>

      <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-4 border-b border-[#EFEBE1]">
        <div className="w-[20%] pl-2">Order ID</div>
        <div className="w-[35%]">Item</div>
        <div className="w-[20%]">Date</div>
        <div className="w-[10%]">Amount</div>
        <div className="w-[15%] text-right pr-2">Payment Status</div>
      </div>

      <div className="mt-2 space-y-1">
        {orders.map((order, i) => (
          <div key={i} className="flex items-center py-4 border-b border-transparent hover:border-[#EFEBE1] hover:bg-[#FDF9EE]/50 rounded-2xl transition-colors px-2 -mx-2">
            <div className="w-[20%] text-sm font-bold text-gray-900">{order.id}</div>
            <div className="w-[35%] text-sm font-medium text-gray-500">{order.item}</div>
            <div className="w-[20%] text-sm font-medium text-gray-600">{order.date}</div>
            <div className="w-[10%] text-sm font-extrabold text-gray-900">{order.amount}</div>
            <div className="w-[15%] text-right">
              <span className="px-3 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest bg-[#E7F3EB] text-[#3A6447]">
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryTable;