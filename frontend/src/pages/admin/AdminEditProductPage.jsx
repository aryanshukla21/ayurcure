import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, UploadCloud, Package } from 'lucide-react';

const AdminEditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    // Update logic here
    navigate('/admin/inventory');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto w-full animate-in fade-in duration-500">

      <Link to="/admin/inventory" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#3A6447] transition-colors mb-6">
        <ArrowLeft size={16} /> Back to Inventory
      </Link>

      <div className="mb-8">
        <p className="text-[10px] font-extrabold text-[#3A6447] uppercase tracking-widest mb-1">INVENTORY / MANAGEMENT</p>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Edit Product Details</h1>
      </div>

      <form onSubmit={handleUpdate} className="space-y-8">

        {/* Basic Information Section */}
        <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#E7F3EB] text-[#3A6447] flex items-center justify-center">
              <Package size={16} />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Product Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Product Name</label>
              <input type="text" defaultValue="Ashwagandha Gold Capsules" className="w-full bg-[#F8F6F0] rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/30 border border-transparent focus:border-[#EFEBE1]" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Category</label>
              <select defaultValue="Supplements" className="w-full bg-[#F8F6F0] rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/30 border border-transparent focus:border-[#EFEBE1] cursor-pointer">
                <option>Supplements</option>
                <option>Herbal Powders (Churna)</option>
                <option>Oils (Tailam)</option>
                <option>Skincare</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">SKU (Stock Keeping Unit)</label>
              <input type="text" defaultValue="ASH-GLD-60" disabled className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 cursor-not-allowed border border-[#EFEBE1]" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Brand / Manufacturer</label>
              <input type="text" defaultValue="AyurCare360 Originals" className="w-full bg-[#F8F6F0] rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/30 border border-transparent focus:border-[#EFEBE1]" />
            </div>
          </div>
        </div>

        {/* Pricing & Stock Section */}
        <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Pricing & Inventory</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Price (₹)</label>
              <input type="number" defaultValue="1200" className="w-full bg-[#F8F6F0] rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/30 border border-transparent focus:border-[#EFEBE1]" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Current Stock</label>
              <input type="number" defaultValue="145" className="w-full bg-[#F8F6F0] rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/30 border border-transparent focus:border-[#EFEBE1]" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Low Stock Alert at</label>
              <input type="number" defaultValue="20" className="w-full bg-[#F8F6F0] rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/30 border border-transparent focus:border-[#EFEBE1]" />
            </div>
          </div>
        </div>

        {/* Media & Description */}
        <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Media & Description</h2>

          <div className="mb-6">
            <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest block mb-2">Product Image</label>
            <div className="w-full border-2 border-dashed border-[#EFEBE1] rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-[#FAF7F2] cursor-pointer hover:bg-[#F5EFE6] transition-colors">
              <UploadCloud size={32} className="text-[#3A6447] mb-3" />
              <p className="text-sm font-bold text-gray-700">Click to replace image</p>
              <p className="text-xs font-medium text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Short Description / Benefits</label>
            <textarea rows="4" defaultValue="Premium Ashwagandha root extract to support stress relief, energy levels, and overall vitality." className="w-full bg-[#F8F6F0] rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/30 border border-transparent focus:border-[#EFEBE1] resize-none"></textarea>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Link to="/admin/inventory" className="px-6 py-3 rounded-full text-sm font-bold text-gray-600 hover:bg-white border border-[#EFEBE1] transition-colors shadow-sm bg-[#FAF7F2]">
            Cancel
          </Link>
          <button type="submit" className="bg-[#3A6447] hover:bg-[#2C4D36] text-white text-sm font-bold py-3 px-8 rounded-full transition-colors shadow-sm">
            Save Changes
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminEditProductPage;