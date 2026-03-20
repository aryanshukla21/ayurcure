import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // <-- Added this import

// Extended dummy data for pagination
const ORDERS_DATA = [
  { id: '#AY-98321', date: 'Oct 24, 2023', status: 'SHIPPED', amount: '$145.20', statusColor: 'bg-[#F3E8FF] text-[#9333EA]' },
  { id: '#AY-98104', date: 'Oct 22, 2023', status: 'PROCESSING', amount: '$89.00', statusColor: 'bg-[#FEF5D3] text-[#A67C00]' },
  { id: '#AY-97992', date: 'Oct 15, 2023', status: 'DELIVERED', amount: '$210.50', statusColor: 'bg-[#E7F3EB] text-[#3A6447]' },
  { id: '#AY-97554', date: 'Sep 28, 2023', status: 'DELIVERED', amount: '$65.00', statusColor: 'bg-[#E7F3EB] text-[#3A6447]' },
  { id: '#AY-97121', date: 'Sep 12, 2023', status: 'DELIVERED', amount: '$312.40', statusColor: 'bg-[#E7F3EB] text-[#3A6447]' },
  { id: '#AY-96880', date: 'Aug 30, 2023', status: 'DELIVERED', amount: '$45.00', statusColor: 'bg-[#E7F3EB] text-[#3A6447]' },
  { id: '#AY-96542', date: 'Aug 15, 2023', status: 'DELIVERED', amount: '$120.00', statusColor: 'bg-[#E7F3EB] text-[#3A6447]' },
  { id: '#AY-96112', date: 'Jul 28, 2023', status: 'DELIVERED', amount: '$89.50', statusColor: 'bg-[#E7F3EB] text-[#3A6447]' },
];

const ITEMS_PER_PAGE = 5;

const OrderHistoryList = () => {
  const navigate = useNavigate(); // <-- Initialize navigation
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination Logic
  const totalPages = Math.ceil(ORDERS_DATA.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = ORDERS_DATA.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm flex flex-col h-full">

      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-xl font-bold text-gray-900">Order History</h2>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-white border border-[#EFEBE1] hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-full flex items-center gap-2 transition-colors shadow-sm">
            <SlidersHorizontal size={16} /> Filter
          </button>
          <button className="px-5 py-2.5 bg-white border border-[#EFEBE1] hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-full flex items-center gap-2 transition-colors shadow-sm">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Table Headers */}
      <div className="flex items-center text-[11px] font-bold text-gray-400 uppercase tracking-widest pb-4 border-b border-[#EFEBE1]">
        <div className="w-[20%] pl-2">Order ID</div>
        <div className="w-[25%]">Date</div>
        <div className="w-[20%]">Status</div>
        <div className="w-[15%]">Amount</div>
        <div className="w-[20%] text-right pr-2">Action</div>
      </div>

      {/* List Rows */}
      <div className="flex-1 space-y-2 mt-4 min-h-[340px]">
        {currentItems.map((order) => (
          <div key={order.id} className="flex items-center py-4 border-b border-transparent hover:border-[#EFEBE1] transition-colors group">

            <div className="w-[20%] pl-2 font-bold text-gray-900 text-sm">
              {order.id}
            </div>

            <div className="w-[25%] text-sm font-medium text-gray-500">
              {order.date}
            </div>

            <div className="w-[20%]">
              <span className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${order.statusColor}`}>
                {order.status}
              </span>
            </div>

            <div className="w-[15%] text-sm font-bold text-gray-900">
              {order.amount}
            </div>

            <div className="w-[20%] text-right">
              {/* <-- Navigation applied to this button --> */}
              <button
                onClick={() => navigate(`/patient/pharmacy-orders/${order.id.replace('#', '')}`)}
                className="bg-[#3A6447] hover:bg-[#2C4D36] text-white text-xs font-bold py-2.5 px-5 rounded-full transition-colors shadow-sm cursor-pointer"
              >
                View Details
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-6 border-t border-[#EFEBE1] gap-4">
        <p className="text-xs font-semibold text-gray-500">
          Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, ORDERS_DATA.length)} of {ORDERS_DATA.length} orders
        </p>

        <div className="flex items-center gap-1 text-sm font-bold">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`p-1.5 rounded-full transition-colors ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${currentPage === pageNumber ? 'bg-[#3A6447] text-white shadow-sm' : 'text-gray-600 hover:bg-[#EFEBE1]'
                  }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`p-1.5 rounded-full transition-colors ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default OrderHistoryList;