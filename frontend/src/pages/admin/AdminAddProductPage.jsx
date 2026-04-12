import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import AddProductForm from '../../components/admin/inventory/AddProductForm';

const AdminAddProductPage = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto w-full animate-in fade-in duration-500">
      <div className="mb-8">
        <div className="flex items-center text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">
          <Link to="/admin/inventory" className="hover:text-[#3A6447] transition-colors">Inventory</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-900">Add Product</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Add New Product</h1>
      </div>

      <AddProductForm />
    </div>
  );
};

export default AdminAddProductPage;