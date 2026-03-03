import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Button } from '../../components/common/Button';

export const Inventory = () => {
  const products = [
    { name: "Ashwagandha Extract", sku: "SKU: AS-HERB-001", category: "Herbal Supplements", price: "$24.99", status: "IN STOCK", inventory: "142 units" },
    { name: "Curcumin Gold Tablets", sku: "SKU: CG-IMM-002", category: "Immunity", price: "$18.50", status: "LOW STOCK", inventory: "12 units" },
    { name: "Neem & Basil Soap", sku: "SKU: NB-CARE-003", category: "Personal Care", price: "$9.00", status: "IN STOCK", inventory: "450 units" },
    { name: "Tulsi Holy Basil Tea", sku: "SKU: TH-BEV-004", category: "Beverages", price: "$12.00", status: "OUT OF STOCK", inventory: "0 units" },
    { name: "Brahmi Hair Oil", sku: "SKU: BH-CARE-005", category: "Personal Care", price: "$15.50", status: "IN STOCK", inventory: "85 units" },
  ];

  return (
    <DashboardLayout activeTab="Inventory">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Product Management</h2>
          <p className="text-gray-500 mt-2">Manage your wellness and herbal inventory across all categories.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="flex items-center gap-2">↗ View Storefront</Button>
          <Button variant="primary" className="flex items-center gap-2"><span>+</span> Add New Product</Button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3 px-4 w-1/2 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-gray-400">🔍</span>
            <input type="text" placeholder="Search products by name, SKU or brand..." className="w-full bg-transparent p-3 outline-none text-sm" />
          </div>
          <div className="flex gap-4">
            <select className="bg-gray-50 border border-gray-200 text-sm p-3 rounded-xl outline-none font-medium text-gray-600">
              <option>All Categories</option>
              <option>Supplements</option>
              <option>Personal Care</option>
            </select>
            <select className="bg-gray-50 border border-gray-200 text-sm p-3 rounded-xl outline-none font-medium text-gray-600">
              <option>Stock Status</option>
              <option>In Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <th className="pb-4 font-bold">Product</th>
              <th className="pb-4 font-bold">Category</th>
              <th className="pb-4 font-bold">Price</th>
              <th className="pb-4 font-bold">Stock Status</th>
              <th className="pb-4 font-bold">Inventory</th>
              <th className="pb-4 font-bold text-right pr-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {products.map((prod, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-ayur-green-light border border-gray-100 flex-shrink-0"></div>
                  <div>
                    <p className="font-bold text-gray-800">{prod.name}</p>
                    <p className="text-xs text-gray-400">{prod.sku}</p>
                  </div>
                </td>
                <td className="py-5 text-gray-600">{prod.category}</td>
                <td className="py-5 font-bold text-gray-800">{prod.price}</td>
                <td className="py-5">
                  <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${prod.status === 'IN STOCK' ? 'bg-green-50 text-green-600' : prod.status === 'LOW STOCK' ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'}`}>
                    {prod.status}
                  </span>
                </td>
                <td className="py-5 text-gray-600 font-medium">{prod.inventory}</td>
                <td className="py-5 text-right pr-4 text-gray-400">
                  <button className="mr-3 hover:text-ayur-green transition-colors">✏️</button>
                  <button className="hover:text-red-500 transition-colors">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-8 text-sm text-gray-500">
          <p>Showing 1-5 of 40 products</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 hover:text-gray-800 font-bold">Previous</button>
            <button className="px-4 py-2 text-ayur-orange font-bold">Next</button>
          </div>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-ayur-orange flex items-center justify-center text-xl">📦</div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total SKU's</p>
            <h3 className="text-2xl font-black text-gray-800">124</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-500 flex items-center justify-center text-xl">⚠️</div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Low Stock Alerts</p>
            <h3 className="text-2xl font-black text-gray-800">8</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 text-ayur-green flex items-center justify-center text-xl">📈</div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Fast Selling Products</p>
            <h3 className="text-2xl font-black text-gray-800">15</h3>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};