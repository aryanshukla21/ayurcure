import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Edit, Trash2 } from 'lucide-react';

const DoctorsTable = ({ doctors = [], onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctors.filter(doc =>
    (doc.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.specialization || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by doctor name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#4A7C59]/20 transition-all outline-none"
          />
        </div>
        <button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-600 px-5 py-2.5 rounded-2xl text-sm font-bold transition-colors">
          <Filter size={16} /> Filters
        </button>
      </div>

      <div className="overflow-x-auto bg-white flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-[11px] uppercase tracking-widest text-gray-500">
              <th className="px-6 py-4 font-extrabold">Doctor Details</th>
              <th className="px-6 py-4 font-extrabold">Specialization</th>
              <th className="px-6 py-4 font-extrabold">Experience</th>
              <th className="px-6 py-4 font-extrabold">Rating</th>
              <th className="px-6 py-4 font-extrabold">Status</th>
              <th className="px-6 py-4 font-extrabold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredDoctors.length === 0 ? (
              <tr><td colSpan="6" className="p-8 text-center text-gray-500">No doctors found.</td></tr>
            ) : (
              filteredDoctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#FDF9EE] text-[#4A7C59] flex items-center justify-center font-bold text-lg border border-[#4A7C59]/20">
                        {doctor.name?.charAt(0) || 'D'}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{doctor.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{doctor.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-700">{doctor.specialization}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{doctor.experience || 0} Years</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-gray-900">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      {doctor.rating || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider
                      ${doctor.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {doctor.status === 'Verified' ? 'Active' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/doctors/edit/${doctor.id}`} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                        <Edit size={16} />
                      </Link>
                      <button onClick={() => onDelete(doctor.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default DoctorsTable;