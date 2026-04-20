import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';

const InventoryTable = ({ products = [], categories = [] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [catFilter, setCatFilter] = useState('All');

    const filteredProducts = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCat = catFilter === 'All' || p.category === catFilter;
        return matchSearch && matchCat;
    });

    const getStatusColor = (status) => {
        if (status === 'In Stock') return 'bg-green-50 text-green-700';
        if (status === 'Low Stock') return 'bg-amber-50 text-amber-700';
        return 'bg-red-50 text-red-700';
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text" placeholder="Search products..."
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#3A6447]/20 transition-all outline-none"
                        />
                    </div>
                    <select
                        className="bg-gray-50 py-2.5 px-4 rounded-2xl text-sm font-bold text-gray-600 outline-none border-none"
                        value={catFilter} onChange={(e) => setCatFilter(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <button className="bg-[#3A6447] text-white px-5 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-[#2C4D36] transition-colors">
                    <Plus size={16} /> Add Product
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 text-[11px] uppercase tracking-widest text-gray-500">
                            <th className="px-6 py-4 font-extrabold">Product Name</th>
                            <th className="px-6 py-4 font-extrabold">Category</th>
                            <th className="px-6 py-4 font-extrabold">Stock</th>
                            <th className="px-6 py-4 font-extrabold">Price</th>
                            <th className="px-6 py-4 font-extrabold">Status</th>
                            <th className="px-6 py-4 font-extrabold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-900 text-sm">{product.name}</td>
                                <td className="px-6 py-4 font-medium text-gray-500 text-sm">{product.category}</td>
                                <td className="px-6 py-4 font-bold text-gray-700 text-sm">{product.stock} Units</td>
                                <td className="px-6 py-4 font-black text-[#3A6447] text-sm">₹{Number(product.price).toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${getStatusColor(product.status)}`}>
                                        {product.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors mr-2"><Edit2 size={16} /></button>
                                    <button className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default InventoryTable;