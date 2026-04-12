import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Package, UploadCloud, Image as ImageIcon, Loader2 } from 'lucide-react';

const AddProductForm = () => {
    const navigate = useNavigate();

    const [isSaving, setIsSaving] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        name: '', category: 'Supplements', sku: '', price: '', stock: '', status: 'In Stock', imageFile: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle local image preview
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Save file to state for the future API call (FormData)
            setFormData({ ...formData, imageFile: file });
            // Create a local URL to instantly preview the selected image
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);

        console.log("Preparing to send new product to backend:", formData);

        // Simulate an API POST request delay
        setTimeout(() => {
            setIsSaving(false);
            // Once "saved", navigate back to the inventory table
            navigate('/admin/inventory');
        }, 800);
    };

    return (
        <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#EFEBE1]">
                <div className="w-12 h-12 rounded-xl bg-[#E7F3EB] text-[#3A6447] flex items-center justify-center">
                    <Package size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Enter new product information</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Functional Image Upload Section */}
                <div className="mb-8">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Product Image</label>
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-2xl border border-[#EFEBE1] overflow-hidden bg-gray-50 flex-shrink-0 flex items-center justify-center shadow-inner">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Product Preview" className="w-full h-full object-cover" />
                            ) : (
                                <ImageIcon className="text-gray-400" size={32} />
                            )}
                        </div>
                        <div className="flex-1">
                            <input
                                type="file"
                                id="newProductImage"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            <label
                                htmlFor="newProductImage"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#EFEBE1] hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-full transition-colors cursor-pointer shadow-sm"
                            >
                                <UploadCloud size={16} /> Upload Image
                            </label>
                            <p className="text-xs font-medium text-gray-400 mt-2">PNG, JPG, or WEBP. Max size 2MB.</p>
                        </div>
                    </div>
                </div>

                {/* Input Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Product Name</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl py-3.5 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 transition-all" placeholder="e.g. Ashwagandha Gold" />
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
                        <input type="text" name="sku" required value={formData.sku} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl py-3.5 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 transition-all" placeholder="e.g. ASH-GLD-60" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Price (₹)</label>
                        <input type="number" name="price" required value={formData.price} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl py-3.5 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 transition-all" placeholder="0.00" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Initial Stock</label>
                        <input type="number" name="stock" required value={formData.stock} onChange={handleChange} className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-2xl py-3.5 px-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 transition-all" placeholder="0" />
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
                    <button
                        type="button"
                        onClick={() => navigate('/admin/inventory')}
                        className="px-6 py-3 bg-white border border-[#EFEBE1] text-gray-700 hover:bg-gray-50 text-sm font-bold rounded-full transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                        <X size={16} /> Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="min-w-[160px] px-8 py-3 bg-[#3A6447] text-white hover:bg-[#2C4D36] disabled:bg-[#3A6447]/70 text-sm font-bold rounded-full transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                        {isSaving ? 'Saving...' : 'Save Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;