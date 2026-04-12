import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Download } from 'lucide-react';

const INITIAL_ORDERS = [
  { id: '#ORD-9421', patient: 'Wade Warren', amount: '$1,240.00', status: 'PAID' },
  { id: '#ORD-9388', patient: 'Jane Cooper', amount: '$450.00', status: 'COD' },
  { id: '#ORD-9350', patient: 'Guy Hawkins', amount: '$3,100.00', status: 'PENDING' },
  { id: '#ORD-9312', patient: 'Kristin Watson', amount: '$89.00', status: 'PAID' },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'PAID': return 'bg-[#E7F3EB] text-[#3A6447]';
    case 'COD': return 'bg-[#FEF5D3] text-[#A67C00]';
    case 'PENDING': return 'bg-[#FDF1E8] text-[#D9774B]';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const RecentOrdersTable = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState('default'); // 'default', 'amount_desc', 'amount_asc'
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL', 'PAID', 'PENDING', 'COD'

  // 1. Calculate the currently displayed orders based on sort & filter states
  const displayedOrders = useMemo(() => {
    let result = [...INITIAL_ORDERS];

    // Apply Filter Status
    if (filterStatus !== 'ALL') {
      result = result.filter(order => order.status === filterStatus);
    }

    // Apply Sort Amount
    if (sortOption === 'amount_desc') {
      result.sort((a, b) => Number(b.amount.replace(/[^0-9.-]+/g, "")) - Number(a.amount.replace(/[^0-9.-]+/g, "")));
    } else if (sortOption === 'amount_asc') {
      result.sort((a, b) => Number(a.amount.replace(/[^0-9.-]+/g, "")) - Number(b.amount.replace(/[^0-9.-]+/g, "")));
    }

    return result;
  }, [sortOption, filterStatus]);

  // 2. CSV Download Logic matching frontend columns
  const handleDownload = () => {
    // Add quotes around values to prevent commas in amounts (like $1,240.00) from breaking the CSV
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Order ID,Patient Name,Amount,Payment Status\n"
      + displayedOrders.map(order => `"${order.id}","${order.patient}","${order.amount}","${order.status}"`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `recent_orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to format the subtitle dynamically
  const getSubtitle = () => {
    if (filterStatus === 'ALL' && sortOption === 'default') return 'Pharmacy & Equipment';

    let text = [];
    if (filterStatus !== 'ALL') text.push(`Status: ${filterStatus}`);
    if (sortOption === 'amount_desc') text.push('Amount: High-Low');
    if (sortOption === 'amount_asc') text.push('Amount: Low-High');
    return text.join(' | ');
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
            {getSubtitle()}
          </p>
        </div>

        <div className="flex gap-2 relative">
          {/* Dropdown Container */}
          <div>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              title="Sort & Filter"
              className={`p-2.5 rounded-full border transition-colors shadow-sm ${(sortOption !== 'default' || filterStatus !== 'ALL')
                  ? 'bg-[#E7F3EB] border-[#3A6447] text-[#3A6447]'
                  : 'bg-white border-[#EFEBE1] text-gray-600 hover:bg-gray-50'
                }`}
            >
              <SlidersHorizontal size={16} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-12 top-12 mt-2 w-48 bg-white border border-[#EFEBE1] rounded-2xl shadow-xl z-10 py-2 overflow-hidden">
                <div className="px-4 py-2 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Sort by Amount</div>
                <button onClick={() => { setSortOption('amount_desc'); setIsDropdownOpen(false); }} className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${sortOption === 'amount_desc' ? 'bg-[#FDF9EE] text-[#D9774B]' : 'text-gray-700 hover:bg-gray-50'}`}>
                  High to Low
                </button>
                <button onClick={() => { setSortOption('amount_asc'); setIsDropdownOpen(false); }} className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${sortOption === 'amount_asc' ? 'bg-[#FDF9EE] text-[#D9774B]' : 'text-gray-700 hover:bg-gray-50'}`}>
                  Low to High
                </button>

                <div className="px-4 py-2 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest border-t border-[#EFEBE1] mt-1 pt-3">Filter by Payment</div>
                {['ALL', 'PAID', 'PENDING', 'COD'].map(status => (
                  <button
                    key={status}
                    onClick={() => { setFilterStatus(status); setIsDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${filterStatus === status ? 'bg-[#E7F3EB] text-[#3A6447]' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    {status === 'ALL' ? 'Show All' : status}
                  </button>
                ))}

                {/* Reset Button (Only shows if something is selected) */}
                {(sortOption !== 'default' || filterStatus !== 'ALL') && (
                  <button
                    onClick={() => { setSortOption('default'); setFilterStatus('ALL'); setIsDropdownOpen(false); }}
                    className="w-full text-center px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 border-t border-[#EFEBE1] mt-1 uppercase tracking-widest"
                  >
                    Reset All
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            title="Download CSV Report"
            className="p-2.5 rounded-full bg-white border border-[#EFEBE1] text-gray-600 hover:bg-gray-50 shadow-sm transition-colors"
          >
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
        {displayedOrders.length > 0 ? (
          displayedOrders.map((order, i) => (
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
          ))
        ) : (
          <div className="py-8 text-center text-sm font-bold text-gray-400">
            No orders match the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentOrdersTable;