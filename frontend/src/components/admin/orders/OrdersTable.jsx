import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

// Dummy data based on the PDF
const INITIAL_ORDERS = [
  { id: '#AYU-9821', patient: 'Aditi Sharma', date: 'Oct 24, 2023', amount: '₹4,250', orderStatus: 'COMPLETED', paymentStatus: 'PAID' },
  { id: '#AYU-9822', patient: 'Rahul Varma', date: 'Oct 24, 2023', amount: '₹1,800', orderStatus: 'PENDING', paymentStatus: 'COD' },
  { id: '#AYU-9823', patient: 'Priya Iyer', date: 'Oct 23, 2023', amount: '₹12,400', orderStatus: 'COMPLETED', paymentStatus: 'PAID' },
  { id: '#AYU-9824', patient: 'Vikram Singh', date: 'Oct 23, 2023', amount: '₹550', orderStatus: 'PENDING', paymentStatus: 'PENDING' },
  { id: '#AYU-9825', patient: 'Meera Nair', date: 'Oct 22, 2023', amount: '₹3,120', orderStatus: 'COMPLETED', paymentStatus: 'COD' },
  { id: '#AYU-9826', patient: 'Arjun Desai', date: 'Oct 22, 2023', amount: '₹8,900', orderStatus: 'COMPLETED', paymentStatus: 'PAID' },
  { id: '#AYU-9827', patient: 'Neha Gupta', date: 'Oct 21, 2023', amount: '₹1,200', orderStatus: 'PENDING', paymentStatus: 'COD' },
];

const ITEMS_PER_PAGE = 5;

// Helper to determine pill colors
const getOrderStatusColor = (status) => {
  return status === 'COMPLETED' ? 'bg-[#E7F3EB] text-[#3A6447]' : 'bg-[#FDF1E8] text-[#D9774B]';
};

const getPaymentStatusColor = (status) => {
  if (status === 'PAID') return 'bg-[#E7F3EB] text-[#3A6447]';
  if (status === 'COD') return 'bg-[#FEF5D3] text-[#A67C00]';
  return 'bg-[#FDF1E8] text-[#D9774B]'; // PENDING
};

const OrdersTable = () => {
  const navigate = useNavigate();
  const [ordersData] = useState(INITIAL_ORDERS);
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination calculations
  const totalPages = Math.ceil(ordersData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = ordersData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm flex flex-col h-full">
      
      {/* Top Toolbar */}
      <div className="flex flex-col xl:flex-row justify-between gap-4 mb-8">
        
        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search Order" 
            className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-full py-3.5 pl-12 pr-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 transition-all"
          />
        </div>
        
        {/* Filters */}
        <div className="flex gap-3 w-full xl:w-auto">
          <div className="relative flex-1 xl:w-40">
            <select className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-full py-3.5 pl-5 pr-10 text-sm font-bold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 cursor-pointer">
              <option>Order Status</option>
              <option>Completed</option>
              <option>Pending</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>
          <div className="relative flex-1 xl:w-40">
            <select className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-full py-3.5 pl-5 pr-10 text-sm font-bold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 cursor-pointer">
              <option>Payment Status</option>
              <option>Paid</option>
              <option>COD</option>
              <option>Pending</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>
        </div>
      </div>

      {/* Table Headers */}
      <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-4 border-b border-[#EFEBE1]">
        <div className="w-[15%] pl-2">Order ID</div>
        <div className="w-[20%]">Patient Name</div>
        <div className="w-[15%]">Date</div>
        <div className="w-[10%]">Amount</div>
        <div className="w-[15%]">Order Status</div>
        <div className="w-[15%]">Payment Status</div>
        <div className="w-[10%] text-right pr-2">Action</div>
      </div>

      {/* Table Rows */}
      <div className="flex-1 mt-2 space-y-1 min-h-[380px]">
        {currentItems.map((order) => (
          <div key={order.id} className="flex items-center py-4 border-b border-transparent hover:border-[#EFEBE1] hover:bg-[#FDF9EE]/50 rounded-2xl transition-colors group px-2 -mx-2">
            
            <div className="w-[15%] text-sm font-bold text-gray-900 pl-2">{order.id}</div>
            <div className="w-[20%] text-sm font-medium text-gray-500 group-hover:text-[#3A6447] transition-colors">{order.patient}</div>
            <div className="w-[15%] text-sm font-medium text-gray-600">{order.date}</div>
            <div className="w-[10%] text-sm font-extrabold text-gray-900">{order.amount}</div>
            
            <div className="w-[15%]">
              <span className={`px-3 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${getOrderStatusColor(order.orderStatus)}`}>
                {order.orderStatus}
              </span>
            </div>

            <div className="w-[15%]">
              <span className={`px-3 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${getPaymentStatusColor(order.paymentStatus)}`}>
                {order.paymentStatus}
              </span>
            </div>
            
            <div className="w-[10%] text-right pr-2">
              <button 
                onClick={() => navigate(`/admin/orders/${order.id.replace('#', '')}`)}
                className="text-xs font-bold text-amber-700 hover:text-[#3A6447] transition-colors cursor-pointer"
              >
                View Details
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-6 border-t border-[#EFEBE1] gap-4">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, ordersData.length)} of 142 orders
        </p>
        
        <div className="flex items-center gap-1 text-sm font-bold">
          <button 
            onClick={handlePrevPage}
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
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  currentPage === pageNumber ? 'bg-[#3A6447] text-white shadow-sm' : 'text-gray-600 hover:bg-[#EFEBE1]'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button 
            onClick={handleNextPage}
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

export default OrdersTable;