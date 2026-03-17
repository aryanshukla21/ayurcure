import React from 'react';
import { Download } from 'lucide-react';

const EarningsHeader = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-5">

            <div>
                <p className='text-amber-800 font-bold text-sm pb-3 uppercase'> Financial Overview</p>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Earnings</h1>
            </div>

            <div className="flex items-center gap-4">
                <button className="flex items-center justify-center gap-2 w-full md:w-auto bg-gray-200 border border-gray-200 hover:bg-gray-50 text-gray-700 px-6 py-3.5 rounded-3xl font-bold transition-all shadow-sm">
                    <Download size={15} />
                    <span className='text-xs'>Export PDF</span>
                </button>
            </div>
        </div>
    );
};

export default EarningsHeader;