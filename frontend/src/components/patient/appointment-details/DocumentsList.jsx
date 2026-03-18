import React from 'react';
import { FileText, Download } from 'lucide-react';

const DocumentsList = ({ documents }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-[#EFEBE1] overflow-hidden">
      <div className="px-8 py-5 border-b border-[#EFEBE1] bg-[#FAFAF8] flex justify-between items-center">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <FileText size={18} className="text-[#4A7C59]" />
          Related Documents
        </h3>
      </div>

      {documents && documents.length > 0 ? (
        <div className="divide-y divide-[#EFEBE1]">
          {documents.map((doc, idx) => (
            <div key={idx} className="flex items-center justify-between px-8 py-5 hover:bg-[#FDF9EE] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                  <span className="text-xs font-bold">PDF</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{doc.name}</p>
                  <p className="text-xs text-gray-500 font-medium">{doc.size} • Uploaded {doc.date}</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#4A7C59] bg-[#EAE5D9] rounded-xl hover:bg-[#4A7C59] hover:text-white transition-colors">
                <Download size={16} />
                Download
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-8 py-10 text-center text-sm text-gray-500 font-medium">
          No documents associated with this appointment.
        </div>
      )}
    </div>
  );
};

export default DocumentsList;