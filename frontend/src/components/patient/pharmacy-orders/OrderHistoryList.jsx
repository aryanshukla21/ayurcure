import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal, Download, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Extended dummy data
const INITIAL_ORDERS = [
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
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // States
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All'); // 'All', 'DELIVERED', 'SHIPPED', 'PROCESSING'
  const [activeSort, setActiveSort] = useState('Date: Newest First'); // 'Date: Newest First', 'Date: Oldest First', 'Amount: High to Low', 'Amount: Low to High'

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 1. FILTERING LOGIC
  let processedOrders = INITIAL_ORDERS.filter(order => {
    if (activeFilter === 'All') return true;
    return order.status === activeFilter;
  });

  // 2. SORTING LOGIC
  processedOrders = processedOrders.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    const amtA = parseFloat(a.amount.replace('$', ''));
    const amtB = parseFloat(b.amount.replace('$', ''));

    switch (activeSort) {
      case 'Date: Newest First': return dateB - dateA;
      case 'Date: Oldest First': return dateA - dateB;
      case 'Amount: High to Low': return amtB - amtA;
      case 'Amount: Low to High': return amtA - amtB;
      default: return 0;
    }
  });

  // 3. PAGINATION LOGIC
  const totalPages = Math.ceil(processedOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = processedOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const applyFilter = (filterType, value) => {
    if (filterType === 'status') setActiveFilter(value);
    if (filterType === 'sort') setActiveSort(value);
    setCurrentPage(1); // Reset page on filter change
    setShowFilterDropdown(false);
  };

  // 4. EXPORT PDF LOGIC (Always exports all previous orders)
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(74, 124, 89);
    doc.text('AyurCare360', 14, 22);
    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text('Complete Pharmacy Order History', 14, 34);

    // Add Info
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 42);

    const tableColumn = ["Order ID", "Date", "Status", "Amount"];
    const tableRows = [];

    // Export ALL orders from INITIAL_ORDERS (ignoring active filters)
    INITIAL_ORDERS.forEach(order => {
      tableRows.push([order.id, order.date, order.status, order.amount]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 50,
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [74, 124, 89] },
      alternateRowStyles: { fillColor: [253, 249, 238] }
    });

    doc.save(`Complete_Pharmacy_Orders_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Helper strings for UI rendering
  const isFiltering = activeFilter !== 'All' || activeSort !== 'Date: Newest First';

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm flex flex-col h-full">

      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 relative">
        <h2 className="text-xl font-bold text-gray-900">Order History</h2>
        <div className="flex items-center gap-3">

          {/* Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`px-5 py-2.5 border hover:bg-gray-50 text-sm font-bold rounded-full flex items-center gap-2 transition-colors shadow-sm ${isFiltering ? 'bg-[#4A7C59] text-white border-[#4A7C59] hover:bg-[#3d6649]' : 'bg-white text-gray-700 border-[#EFEBE1]'}`}
            >
              <SlidersHorizontal size={16} /> {isFiltering ? 'Filtered' : 'Filter / Sort'}
            </button>

            {/* Dropdown Menu */}
            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#EFEBE1] z-20 py-2 animate-fade-in origin-top-right">

                {/* Reset Button */}
                {isFiltering && (
                  <button
                    onClick={() => { applyFilter('status', 'All'); applyFilter('sort', 'Date: Newest First'); }}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors border-b border-[#EFEBE1] flex items-center justify-between"
                  >
                    Reset All Filters <X size={14} />
                  </button>
                )}

                {/* Filter by Status */}
                <div className="px-4 pt-3 pb-1 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Filter by Status
                </div>
                {['All', 'PROCESSING', 'SHIPPED', 'DELIVERED'].map(status => (
                  <button
                    key={status}
                    onClick={() => applyFilter('status', status)}
                    className={`w-full text-left px-4 py-2 text-sm font-medium flex items-center justify-between transition-colors hover:bg-[#FDF9EE] ${activeFilter === status ? 'text-[#4A7C59] font-bold bg-[#E7F3EB]' : 'text-gray-700'}`}
                  >
                    {status === 'All' ? 'All Orders' : status}
                    {activeFilter === status && <Check size={14} />}
                  </button>
                ))}

                {/* Sort by Metric */}
                <div className="px-4 pt-3 pb-1 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest border-t border-[#EFEBE1] mt-1">
                  Sort By
                </div>
                {['Date: Newest First', 'Date: Oldest First', 'Amount: High to Low', 'Amount: Low to High'].map(sortOpt => (
                  <button
                    key={sortOpt}
                    onClick={() => applyFilter('sort', sortOpt)}
                    className={`w-full text-left px-4 py-2 text-sm font-medium flex items-center justify-between transition-colors hover:bg-[#FDF9EE] ${activeSort === sortOpt ? 'text-[#4A7C59] font-bold bg-[#E7F3EB]' : 'text-gray-700'}`}
                  >
                    {sortOpt}
                    {activeSort === sortOpt && <Check size={14} />}
                  </button>
                ))}

              </div>
            )}
          </div>

          <button
            onClick={handleExportPDF}
            className="px-5 py-2.5 bg-white border border-[#EFEBE1] hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-full flex items-center gap-2 transition-colors shadow-sm"
          >
            <Download size={16} /> Export All
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
        {currentItems.length > 0 ? (
          currentItems.map((order) => (
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
                <button
                  onClick={() => navigate(`/patient/pharmacy-orders/${order.id.replace('#', '')}`)}
                  className="bg-[#3A6447] hover:bg-[#2C4D36] text-white text-xs font-bold py-2.5 px-5 rounded-full transition-colors shadow-sm cursor-pointer"
                >
                  View Details
                </button>
              </div>

            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-500 font-medium">
            No orders found matching your filters.
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      {processedOrders.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-6 border-t border-[#EFEBE1] gap-4">
          <p className="text-xs font-semibold text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, processedOrders.length)} of {processedOrders.length} filtered orders
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
      )}

    </div>
  );
};

export default OrderHistoryList;