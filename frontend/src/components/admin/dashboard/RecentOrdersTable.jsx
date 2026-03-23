import React from 'react';
import { SlidersHorizontal, Download } from 'lucide-react';

const ORDERS = [
  { id: '#ORD-9421', patient: 'Wade Warren', amount: '$1,240.00', status: 'PAID' },
  { id: '#ORD-9388', patient: 'Jane Cooper', amount: '$450.00', status: 'COD' },
  { id: '#ORD-9350', patient: 'Guy Hawkins', amount: '$3,100.00', status: 'PENDING' },
  { id: '#ORD-9312', patient: 'Kristin Watson', amount: '$89.00', status: 'PAID' },
];

const getStatusColor = (status) => {
  switch(status) {
    case 'PAID': return 'bg-[#E7F3EB] text-[#3A6447]';
    case 'COD': return 'bg-[#FEF5D3] text-[#A67C00]';
    case 'PENDING': return 'bg-[#FDF1E8] text-[#D9774B]';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const RecentOrdersTable = () => {
  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Pharmacy & Equipment</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2.5 rounded-full bg-white border border-[#EFEBE1] text-gray-600 hover:bg-gray-50 shadow-sm transition-colors">
            <SlidersHorizontal size={16} />
          </button>
          <button className="p-2.5 rounded-full bg-white border border-[#EFEBE1] text-gray-600 hover:bg-gray-50 shadow-sm transition-colors">
            <Download size={16} />
          </button>
        </div>
      </div>

      <div className="flex text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-4 border-b border-[#EFEBE1]">
        <div className="w-[20%] pl-2">Order ID</div>
        <div className="w-[30%]">Patient</div>
        <div className="w-[25%]">Amount</div>
        <div className="w-[25%] text-right pr-2">Payment Status</div>
      </div>

      <div className="space-y-1 mt-3">
        {ORDERS.map((order, i) => (
          <div key={i} className="flex items-center py-4 hover:bg-[#FDF9EE] rounded-2xl transition-colors px-2 cursor-pointer">
            <div className="w-[20%] text-sm font-bold text-gray-900">{order.id}</div>
            <div className="w-[30%] text-sm font-medium text-gray-500">{order.patient}</div>
            <div className="w-[25%] text-sm font-extrabold text-gray-900">{order.amount}</div>
            <div className="w-[25%] text-right">
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrdersTable;