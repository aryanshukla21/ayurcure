import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Loader2, UploadCloud, Image as ImageIcon } from 'lucide-react';

const AddProductForm = ({ onSubmit, isSubmitting }) => {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        name: '', category: 'Supplements', sku: '', price: '', stock: '', status: 'In Stock', imageFile: null
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, imageFile: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass the form data payload to the parent page (AdminAddProductPage)
        onSubmit({
            name: formData.name,
            category: formData.category,
            sku: formData.sku,
            price: parseFloat(formData.price),
            stock_quantity: parseInt(formData.stock),
            status: formData.status
        });
    };

    return (
        <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-8">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Product Image</label>
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-2xl border border-[#EFEBE1] overflow-hidden bg-gray-50 flex-shrink-0 flex items-center justify-center shadow-inner">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <ImageIcon className="text-gray-400" size={32} />
                            )}
                        </div>
                        <div className="flex-1">
                            <input type="file" id="productImage" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            <label htmlFor="productImage" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#EFEBE1] hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-full transition-colors cursor-pointer shadow-sm">
                                <UploadCloud size={16} /> Choose Image
                            </label>
                            <p className="text-xs font-medium text-gray-400 mt-2">PNG, JPG, or WEBP. Max size 2MB.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Product Name</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl py-3.5 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl py-3.5 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 transition-all cursor-pointer">
                            <option value="Supplements">Supplements</option>
                            <option value="Skincare">Skincare</option>
                            <option value="Digestive">Digestive</option>
                            <option value="Beverage">Beverage</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">SKU</label>
                        <input type="text" name="sku" required value={formData.sku} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl py-3.5 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Price (₹)</label>
                        <input type="number" name="price" required value={formData.price} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl py-3.5 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Initial Stock</label>
                        <input type="number" name="stock" required value={formData.stock} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl py-3.5 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl py-3.5 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 transition-all cursor-pointer">
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-[#EFEBE1]">
                    <button type="button" disabled={isSubmitting} onClick={() => navigate('/admin/inventory')} className="px-6 py-3 bg-white border border-[#EFEBE1] text-gray-700 hover:bg-gray-50 disabled:opacity-50 text-sm font-bold rounded-full transition-colors flex items-center gap-2 cursor-pointer shadow-sm">
                        <X size={16} /> Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className="min-w-[160px] px-8 py-3 bg-[#3A6447] text-white hover:bg-[#2C4D36] disabled:bg-[#3A6447]/70 text-sm font-bold rounded-full transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer">
                        {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                        {isSubmitting ? 'Adding...' : 'Add Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;