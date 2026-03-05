import React from 'react';
import { Button } from '../common/Button';

export const DashboardHeader = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
            {/* Search Bar */}
            <div className="relative w-full max-w-md">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                <input
                    type="text"
                    placeholder="Search prescriptions or orders..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 shadow-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-ayur-green transition-all"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
                <button className="relative text-gray-400 hover:text-gray-600 transition-colors text-xl">
                    🔔
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-ayur-orange rounded-full border-2 border-[#F8F9FA]"></span>
                </button>
                <Button variant="primary" className="bg-ayur-orange text-white px-6 py-3 rounded-xl shadow-md hover:bg-orange-600 transition-colors">
                    + New Consultation
                </Button>
            </div>
        </div>
    );
};