import React from 'react';
import { FileText, Download } from 'lucide-react';

const ReportsList = ({ reports = [] }) => {
    return (
        <div className="mt-4">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                    <FileText size={20} className="text-gray-400" /> Patient Reports
                </h3>
                <span className="text-xs text-gray-500 font-bold tracking-widest uppercase">{reports.length} DOCUMENTS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report, index) => (
                    <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-[#4A7C59]/30 transition-colors">
                        <div className="flex items-center gap-4 overflow-hidden">
                            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
                                <FileText size={20} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-gray-900 truncate">{report.name}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{report.date} • {report.size}</p>
                            </div>
                        </div>
                        <button className="text-gray-400 group-hover:text-[#4A7C59] p-2 transition-colors">
                            <Download size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ReportsList;