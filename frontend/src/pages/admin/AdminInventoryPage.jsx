import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Edit2, Trash2, Package, AlertCircle } from 'lucide-react';

// Dummy Data
const INVENTORY_DATA = [
  { id: '#PRD-001', name: 'Ashwagandha Gold Capsules', category: 'Supplements', sku: 'ASH-GLD-60', price: '₹1,200', stock: 145, status: 'In Stock' },
  { id: '#PRD-002', name: 'Kumkumadi Tailam', category: 'Skincare', sku: 'KUM-OIL-30', price: '₹2,400', stock: 12, status: 'Low Stock' },
  { id: '#PRD-003', name: 'Triphala Powder 500g', category: 'Digestive', sku: 'TRI-PWD-500', price: '₹450', stock: 0, status: 'Out of Stock' },
  { id: '#PRD-004', name: 'Organic Brahmi Tea', category: 'Beverage', sku: 'BRH-TEA-20', price: '₹350', stock: 89, status: 'In Stock' },
  { id: '#PRD-005', name: 'Neem Purifying Cleanser', category: 'Skincare', sku: 'NEM-CLN-100', price: '₹550', stock: 23, status: 'Low Stock' },
];

const AdminInventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Stock':
        return <span className="bg-[#E7F3EB] text-[#3A6447] text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full">In Stock</span>;
      case 'Low Stock':
        return <span className="bg-[#FDF1E8] text-[#D9774B] text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1 w-fit"><AlertCircle size={10} /> Low Stock</span>;
      case 'Out of Stock':
        return <span className="bg-[#FEE4E2] text-[#D92D20] text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full">Out of Stock</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full animate-in fade-in duration-500">

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Inventory Management</h1>
        <p className="text-sm font-medium text-gray-500">Manage your apothecary products, track stock levels, and update pricing.</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-[#EFEBE1] rounded-full py-2.5 pl-11 pr-4 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/30 shadow-sm"
            />
          </div>
          <select className="bg-white border border-[#EFEBE1] rounded-full py-2.5 px-4 text-sm font-bold text-gray-700 focus:outline-none shadow-sm cursor-pointer hidden md:block">
            <option>All Categories</option>
            <option>Skincare</option>
            <option>Supplements</option>
            <option>Digestive</option>
          </select>
        </div>

        <Link to="/admin/inventory/add" className="bg-[#3A6447] hover:bg-[#2C4D36] text-white text-sm font-bold py-2.5 px-6 rounded-full transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap">
          <Plus size={18} /> Add Product
        </Link>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-[32px] border border-[#EFEBE1] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#EFEBE1]">
                <th className="py-4 px-6 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Product Info</th>
                <th className="py-4 px-6 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">SKU</th>
                <th className="py-4 px-6 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Price</th>
                <th className="py-4 px-6 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Stock</th>
                <th className="py-4 px-6 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="py-4 px-6 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFEBE1]">
              {INVENTORY_DATA.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] flex items-center justify-center text-[#3A6447]">
                        <Package size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{item.name}</p>
                        <p className="text-[11px] font-medium text-gray-500">{item.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-600">{item.sku}</td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-900">{item.price}</td>
                  <td className="py-4 px-6">
                    <span className={`text-sm font-bold ${item.stock === 0 ? 'text-[#D92D20]' : 'text-gray-900'}`}>
                      {item.stock} units
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/inventory/edit/${item.id}`} className="p-2 text-gray-400 hover:text-[#3A6447] bg-gray-50 hover:bg-[#E7F3EB] rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </Link>
                      <button className="p-2 text-gray-400 hover:text-[#D92D20] bg-gray-50 hover:bg-[#FEE4E2] rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-[#EFEBE1] flex items-center justify-between bg-white">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing 1 to 5 of 124 Products</p>
          <div className="flex gap-1">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold bg-[#3A6447] text-white">1</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-gray-500 hover:bg-gray-100">2</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-gray-500 hover:bg-gray-100">3</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInventoryPage;