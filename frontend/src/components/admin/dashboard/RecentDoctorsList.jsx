import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const RecentDoctorsList = ({ doctors = [] }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-extrabold text-gray-900">New Doctors</h3>
        <Link to="/admin/doctors" className="text-sm font-bold text-[#3A6447] hover:text-[#2C4D36] flex items-center gap-1 transition-colors">
          All <ChevronRight size={16} />
        </Link>
      </div>
      <div className="space-y-4 flex-1">
        {doctors.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recent doctors</p>
        ) : (
          doctors.map((doc, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-2xl transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#E7F3EB] text-[#3A6447] flex items-center justify-center font-bold text-sm">
                {doc.name ? doc.name.charAt(0) : 'D'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{doc.name}</p>
                <p className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mt-0.5 truncate">{doc.specialization}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase ${doc.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {doc.status === 'Verified' ? 'Active' : 'Pending'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default RecentDoctorsList;