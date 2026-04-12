import React, { useState, useMemo } from 'react';
import { ShoppingBag, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

// Extended Dummy Data for Pagination
const INITIAL_ORDERS = [
  { id: '#ORD-9421', date: 'Oct 24, 2023', items: 3, amount: '$1,240.00', status: 'DELIVERED' },
  { id: '#ORD-9388', date: 'Sep 15, 2023', items: 1, amount: '$450.00', status: 'DELIVERED' },
  { id: '#ORD-9350', date: 'Aug 02, 2023', items: 5, amount: '$3,100.00', status: 'DELIVERED' },
  { id: '#ORD-9312', date: 'Jul 18, 2023', items: 2, amount: '$89.00', status: 'CANCELLED' },
  { id: '#ORD-9201', date: 'Jun 05, 2023', items: 4, amount: '$540.00', status: 'DELIVERED' },
  { id: '#ORD-9155', date: 'May 22, 2023', items: 1, amount: '$120.00', status: 'DELIVERED' },
  { id: '#ORD-9102', date: 'Apr 10, 2023', items: 2, amount: '$300.00', status: 'DELIVERED' },
];

const ITEMS_PER_PAGE = 4;

const OrderHistoryTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortAmount, setSortAmount] = useState('default');

  // Filter and Sort Logic
  const processedData = useMemo(() => {
    let data = [...INITIAL_ORDERS];

    // 1. Filter
    if (filterStatus !== 'All') {
      data = data.filter(order => order.status === filterStatus.toUpperCase());
    }

    // 2. Sort by Amount
    if (sortAmount === 'desc') {
      data.sort((a, b) => Number(b.amount.replace(/[^0-9.-]+/g, "")) - Number(a.amount.replace(/[^0-9.-]+/g, "")));
    } else if (sortAmount === 'asc') {
      data.sort((a, b) => Number(a.amount.replace(/[^0-9.-]+/g, "")) - Number(b.amount.replace(/[^0-9.-]+/g, "")));
    }

    return data;
  }, [filterStatus, sortAmount]);

  // Pagination Logic
  const totalPages = Math.max(1, Math.ceil(processedData.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = processedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

  // Reset to page 1 when filters change
  const handleFilterChange = (e) => { setFilterStatus(e.target.value); setCurrentPage(1); };
  const handleSortChange = (e) => { setSortAmount(e.target.value); setCurrentPage(1); };

  const getStatusColor = (status) => {
    switch (status) {
      case 'DELIVERED': return 'bg-[#E7F3EB] text-[#3A6447]';
      case 'PROCESSING': return 'bg-[#FEF5D3] text-[#A67C00]';
      case 'CANCELLED': return 'bg-[#FDF1E8] text-[#D9774B]';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm flex flex-col h-full mt-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Pharmacy Orders</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Purchase history</p>
        </div>

        {/* Filters & Sort */}
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-40">
            <select
              value={filterStatus} onChange={handleFilterChange}
              className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-full py-2.5 pl-4 pr-10 text-xs font-bold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Processing">Processing</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
          </div>
          <div className="relative flex-1 md:w-40">
            <select
              value={sortAmount} onChange={handleSortChange}
              className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-full py-2.5 pl-4 pr-10 text-xs font-bold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 cursor-pointer"
            >
              <option value="default">Sort by Amount</option>
              <option value="desc">Amount: High-Low</option>
              <option value="asc">Amount: Low-High</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
          </div>
        </div>
      </div>

      <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-4 border-b border-[#EFEBE1]">
        <div className="w-[25%] pl-2">Order ID</div>
        <div className="w-[25%]">Date</div>
        <div className="w-[15%]">Items</div>
        <div className="w-[20%]">Amount</div>
        <div className="w-[15%] text-right pr-2">Status</div>
      </div>

      <div className="flex-1 mt-2 space-y-1 min-h-[300px]">
        {currentItems.length > 0 ? currentItems.map((order, i) => (
          <div key={i} className="flex items-center py-4 border-b border-transparent hover:border-[#EFEBE1] hover:bg-[#FDF9EE]/50 rounded-2xl transition-colors px-2 -mx-2">
            <div className="w-[25%] text-sm font-bold text-gray-900">{order.id}</div>
            <div className="w-[25%] text-sm font-medium text-gray-500">{order.date}</div>
            <div className="w-[15%]">
              <span className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                <ShoppingBag size={14} className="text-gray-400" /> {order.items}
              </span>
            </div>
            <div className="w-[20%] text-sm font-extrabold text-gray-900">{order.amount}</div>
            <div className="w-[15%] text-right pr-2">
              <span className={`px-3 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>
        )) : (
          <div className="text-center py-10 text-sm font-bold text-gray-400">No orders found.</div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-6 border-t border-[#EFEBE1] gap-4">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          Showing {processedData.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + ITEMS_PER_PAGE, processedData.length)} of {processedData.length}
        </p>

        {totalPages > 1 && (
          <div className="flex items-center gap-1 text-sm font-bold">
            <button
              onClick={handlePrevPage} disabled={currentPage === 1}
              className={`p-1.5 rounded-full transition-colors ${currentPage === 1 ? 'text-gray-300' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index + 1} onClick={() => setCurrentPage(index + 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${currentPage === index + 1 ? 'bg-[#3A6447] text-white shadow-sm' : 'text-gray-600 hover:bg-[#EFEBE1]'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage} disabled={currentPage === totalPages}
              className={`p-1.5 rounded-full transition-colors ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryTable;