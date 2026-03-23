import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Edit2, Lock, ShieldAlert, ChevronLeft, ChevronRight } from 'lucide-react';

// Expanded dummy data to demonstrate pagination
const INITIAL_ADMINS = [
  { id: 1, name: 'Dr. Shanti K.', email: 'shanti.k@ayurcare.com', role: 'MASTER ADMIN', status: 'ACTIVE', isMaster: true, initials: 'SK' },
  { id: 2, name: 'Rajesh Kumar', email: 'rajesh.kumar@ayurcare.com', role: 'ADMIN', status: 'ACTIVE', isMaster: false, initials: 'RK' },
  { id: 3, name: 'Priya Singh', email: 'priya.s@ayurcare.com', role: 'ADMIN', status: 'INACTIVE', isMaster: false, initials: 'PS' },
  { id: 4, name: 'Dr. Arjun Sharma', email: 'arjun.s@ayurcare.com', role: 'SUPER ADMIN', status: 'ACTIVE', isMaster: false, initials: 'AS' },
  { id: 5, name: 'Sarah Jenkins', email: 'sarah.j@ayurcare.com', role: 'SYSTEM ADMINISTRATOR', status: 'ACTIVE', isMaster: false, initials: 'SJ' },
  { id: 6, name: 'Amit Patel', email: 'amit.p@ayurcare.com', role: 'ADMIN', status: 'ACTIVE', isMaster: false, initials: 'AP' },
  { id: 7, name: 'Neha Gupta', email: 'neha.g@ayurcare.com', role: 'CONTENT ADMIN', status: 'ACTIVE', isMaster: false, initials: 'NG' },
  { id: 8, name: 'Vikram Mehta', email: 'vikram.m@ayurcare.com', role: 'FINANCE ADMIN', status: 'INACTIVE', isMaster: false, initials: 'VM' },
];

const ITEMS_PER_PAGE = 5;

const AdminsTable = () => {
  const navigate = useNavigate();
  const [adminsData] = useState(INITIAL_ADMINS);
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination Logic
  const totalPages = Math.ceil(adminsData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = adminsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm flex flex-col h-full">
      
      {/* Top Toolbar */}
      <div className="flex flex-col xl:flex-row justify-between gap-4 mb-8">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search admins by name or email..." 
            className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-full py-3.5 pl-12 pr-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 transition-all"
          />
        </div>

        {/* Add Admin Button -> Routes to Page 22 */}
        <button 
          onClick={() => navigate('/admin/settings/add-admin')}
          className="bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-colors text-sm shrink-0 cursor-pointer"
        >
          <Plus size={18} /> Add Admin
        </button>
      </div>

      {/* Table Headers */}
      <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-4 border-b border-[#EFEBE1]">
        <div className="w-[30%] pl-2">Name</div>
        <div className="w-[30%]">Email</div>
        <div className="w-[20%]">Role</div>
        <div className="w-[10%]">Status</div>
        <div className="w-[10%] text-right pr-2">Action</div>
      </div>

      {/* Table Rows */}
      <div className="flex-1 mt-2 space-y-1 min-h-[380px]">
        {currentItems.map((admin) => (
          <div key={admin.id} className="flex items-center py-4 border-b border-transparent hover:border-[#EFEBE1] hover:bg-[#FDF9EE]/50 rounded-2xl transition-colors group px-2 -mx-2">
            
            <div className="w-[30%] pl-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E7F3EB] flex items-center justify-center text-[#3A6447] font-bold text-sm shrink-0">
                {admin.initials}
              </div>
              <span className="text-sm font-bold text-gray-900 group-hover:text-[#3A6447] transition-colors">{admin.name}</span>
            </div>
            
            <div className="w-[30%] text-sm font-medium text-gray-500">{admin.email}</div>
            
            <div className="w-[20%]">
              <span className="text-[11px] font-extrabold text-gray-600 uppercase tracking-widest">
                {admin.role}
              </span>
            </div>
            
            <div className="w-[10%]">
              <span className={`px-3 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${
                admin.status === 'ACTIVE' ? 'bg-[#E7F3EB] text-[#3A6447]' : 'bg-[#FDF1E8] text-[#D9774B]'
              }`}>
                {admin.status}
              </span>
            </div>
            
            <div className="w-[10%] text-right pr-4 flex justify-end">
              {admin.isMaster ? (
                // Master Admin Tooltip (Cannot be edited)
                <div className="relative group/tooltip">
                  <div className="text-gray-300 p-2 rounded-full cursor-not-allowed">
                    <Lock size={16} />
                  </div>
                  <div className="absolute bottom-full right-0 mb-2 w-48 p-4 bg-gray-900 text-white rounded-2xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg text-left">
                    <div className="flex items-center gap-2 mb-2 text-[#D49A44]">
                      <ShieldAlert size={14} />
                      <span className="text-[10px] font-extrabold uppercase tracking-widest">Master Admin</span>
                    </div>
                    <ul className="text-xs font-medium space-y-1 text-gray-300">
                      <li>• Created at system level</li>
                      <li>• Cannot be edited</li>
                      <li>• Cannot be deleted</li>
                      <li>• Full control access</li>
                    </ul>
                    <div className="absolute top-full right-4 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              ) : (
                // Regular Admin Edit Button -> Routes to Page 23
                <div className="relative group/tooltip">
                  <button 
                    onClick={() => navigate(`/admin/settings/edit-admin/${admin.id}`)}
                    className="text-gray-400 hover:text-[#3A6447] transition-colors p-2 rounded-full hover:bg-gray-100 outline-none cursor-pointer"
                  >
                    <Edit2 size={16} />
                  </button>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-sm">
                    Edit Admin
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-6 border-t border-[#EFEBE1] gap-4">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, adminsData.length)} of {adminsData.length} Admins
        </p>
        
        <div className="flex items-center gap-1 text-sm font-bold">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`p-1.5 rounded-full transition-colors ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100 cursor-pointer'}`}
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  currentPage === pageNumber ? 'bg-[#3A6447] text-white shadow-sm' : 'text-gray-600 hover:bg-[#EFEBE1]'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`p-1.5 rounded-full transition-colors ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100 cursor-pointer'}`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default AdminsTable;