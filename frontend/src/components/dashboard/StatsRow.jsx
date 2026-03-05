import React from 'react';

export const StatsRow = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Consultations Stat */}
            <div className="bg-[#FFF4ED] rounded-3xl p-8 border border-orange-50">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    TOTAL CONSULTATIONS
                </div>
                <div className="text-4xl font-bold text-ayur-orange">
                    12
                </div>
            </div>

            {/* Prescriptions Stat */}
            <div className="bg-[#FFF4ED] rounded-3xl p-8 border border-orange-50">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    ACTIVE PRESCRIPTIONS
                </div>
                <div className="text-4xl font-bold text-ayur-orange">
                    04
                </div>
            </div>

            {/* Orders Stat */}
            <div className="bg-[#FFF4ED] rounded-3xl p-8 border border-orange-50">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    ORDERS PROCESSED
                </div>
                <div className="text-4xl font-bold text-ayur-orange">
                    28
                </div>
            </div>
        </div>
    );
};