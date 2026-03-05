import React from 'react';

export const ActionCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Follow Up Card */}
            <div className="bg-[#FFF4ED] p-6 rounded-3xl flex gap-4 items-start border border-orange-100">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm text-xl">
                    💡
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-1">Need a follow-up?</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        It's recommended to have a follow-up consultation every 3 months for chronic conditions. Your last Vata-balancing review was 2 months ago.
                    </p>
                </div>
            </div>

            {/* Download Records Card */}
            <div className="bg-[#1A1F2B] p-6 rounded-3xl flex flex-col justify-between text-white">
                <div className="flex gap-4 items-start mb-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl">
                        📄
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-1">Download All Records</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Generate a comprehensive medical report of all your past consultations for your insurance or personal records.
                        </p>
                    </div>
                </div>
                <button className="self-start text-ayur-orange font-bold text-sm border-b border-ayur-orange pb-0.5 hover:text-orange-400 transition-colors">
                    Generate Report →
                </button>
            </div>
        </div>
    );
};