import React from 'react';

const OrderSummaryHeaderCard = ({ orderId, orderDate, estimatedDelivery }) => {
  return (
    <div className="bg-[#FAF7F2] rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Order ID */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">ORDER ID</p>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">{orderId}</h2>
        </div>

        {/* Order Date */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">ORDER DATE</p>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">{orderDate}</h2>
        </div>

        {/* Estimated Delivery / Status */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">ESTIMATED DELIVERY</p>
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-extrabold text-[#A67C00] tracking-tight">{estimatedDelivery}</h2>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#F3E8FF] text-[#9333EA]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#9333EA]"></div>
              SHIPPED
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderSummaryHeaderCard;