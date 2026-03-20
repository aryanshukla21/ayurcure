import React from 'react';

const BillingForm = ({ formData, handleInputChange }) => {
    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#F3EFE6] rounded-lg flex items-center justify-center text-[#8B6A47]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Billing Information</h2>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-2">Full Name</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-[#F9F7F2] border border-transparent focus:border-[#4A7C59] focus:bg-white focus:ring-0 rounded-xl px-4 py-3 text-sm text-gray-700 transition-all" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-2">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-[#F9F7F2] border border-transparent focus:border-[#4A7C59] focus:bg-white focus:ring-0 rounded-xl px-4 py-3 text-sm text-gray-700 transition-all" />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-2">Mobile Number</label>
                        <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} className="w-full bg-[#F9F7F2] border border-transparent focus:border-[#4A7C59] focus:bg-white focus:ring-0 rounded-xl px-4 py-3 text-sm text-gray-700 transition-all" />
                    </div>
                </div>

                <div>
                    <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-2">Delivery Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-[#F9F7F2] border border-transparent focus:border-[#4A7C59] focus:bg-white focus:ring-0 rounded-xl px-4 py-3 text-sm text-gray-700 transition-all" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-2">City</label>
                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-[#F9F7F2] border border-transparent focus:border-[#4A7C59] focus:bg-white focus:ring-0 rounded-xl px-4 py-3 text-sm text-gray-700 transition-all" />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-2">Postal Code</label>
                        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} className="w-full bg-[#F9F7F2] border border-transparent focus:border-[#4A7C59] focus:bg-white focus:ring-0 rounded-xl px-4 py-3 text-sm text-gray-700 transition-all" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillingForm;