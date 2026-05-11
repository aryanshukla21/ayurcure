import React from 'react';

const BillingForm = ({ formData, handleInputChange, isLoading, errors = {} }) => {
    if (isLoading) {
        return (
            <div className="bg-white rounded-[32px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i}>
                            <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
                            <div className="h-12 bg-gray-100 rounded-2xl w-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const safeFormData = formData || {};

    return (
        <div className="bg-white rounded-[32px] p-6 md:p-8 border border-[#EFEBE1] shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping & Billing Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
                <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={safeFormData.fullName || ''}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3.5 bg-[#FAF7F2] border rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] transition-all ${errors.fullName ? 'border-red-500' : 'border-[#EFEBE1]'}`}
                        placeholder="e.g. Aarav Sharma"
                    />
                    {errors.fullName && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold">{errors.fullName}</p>}
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={safeFormData.email || ''}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3.5 bg-[#FAF7F2] border rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] transition-all ${errors.email ? 'border-red-500' : 'border-[#EFEBE1]'}`}
                        placeholder="e.g. aarav@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold">{errors.email}</p>}
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                        Mobile Number
                    </label>
                    <input
                        type="tel"
                        name="mobile"
                        value={safeFormData.mobile || ''}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3.5 bg-[#FAF7F2] border rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] transition-all ${errors.mobile ? 'border-red-500' : 'border-[#EFEBE1]'}`}
                        placeholder="+91 98765 43210"
                    />
                    {errors.mobile && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold">{errors.mobile}</p>}
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                        Street Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={safeFormData.address || ''}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3.5 bg-[#FAF7F2] border rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] transition-all ${errors.address ? 'border-red-500' : 'border-[#EFEBE1]'}`}
                        placeholder="House/Flat No., Street, Landmark"
                    />
                    {errors.address && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold">{errors.address}</p>}
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                        City / District
                    </label>
                    <input
                        type="text"
                        name="city"
                        value={safeFormData.city || ''}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3.5 bg-[#FAF7F2] border rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] transition-all ${errors.city ? 'border-red-500' : 'border-[#EFEBE1]'}`}
                        placeholder="e.g. Mumbai"
                    />
                    {errors.city && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold">{errors.city}</p>}
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                        Postal Code
                    </label>
                    <input
                        type="text"
                        name="postalCode"
                        value={safeFormData.postalCode || ''}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3.5 bg-[#FAF7F2] border rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] transition-all ${errors.postalCode ? 'border-red-500' : 'border-[#EFEBE1]'}`}
                        placeholder="e.g. 400001"
                    />
                    {errors.postalCode && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold">{errors.postalCode}</p>}
                </div>
            </div>
        </div>
    );
};

export default BillingForm;