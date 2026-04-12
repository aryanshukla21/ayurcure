import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

// Extended dummy data to demonstrate working pagination
const INITIAL_PATIENTS = [
  { id: 'AYU-2024-001', name: 'Aarav Mehta', email: 'aarav.mehta@example.com', phone: '+91 98765 43210', age: 32, status: 'ACTIVE', img: 'https://ui-avatars.com/api/?name=AM&background=FDF9EE&color=3A6447' },
  { id: 'AYU-2024-002', name: 'Sanya Kapoor', email: 'sanya.k@healthmail.com', phone: '+91 91234 56789', age: 27, status: 'ACTIVE', img: 'https://ui-avatars.com/api/?name=SK&background=FDF9EE&color=D9774B' },
  { id: 'AYU-2024-003', name: 'Rajesh Khanna', email: 'rajesh.khanna@domain.in', phone: '+91 99887 76655', age: 64, status: 'INACTIVE', img: 'https://ui-avatars.com/api/?name=RK&background=FDF9EE&color=8C6239' },
  { id: 'AYU-2024-004', name: 'Priya Arya', email: 'priya.arya@provider.com', phone: '+91 88776 65544', age: 41, status: 'ACTIVE', img: 'https://ui-avatars.com/api/?name=PA&background=FDF9EE&color=3A6447' },
  { id: 'AYU-2024-005', name: 'Vikram Singh', email: 'vikram.s@wellness.org', phone: '+91 77665 54433', age: 52, status: 'INACTIVE', img: 'https://ui-avatars.com/api/?name=VS&background=FDF9EE&color=D9774B' },
  { id: 'AYU-2024-006', name: 'Neha Gupta', email: 'neha.g@example.com', phone: '+91 98111 22334', age: 29, status: 'ACTIVE', img: 'https://ui-avatars.com/api/?name=NG&background=FDF9EE&color=3A6447' },
  { id: 'AYU-2024-007', name: 'Arjun Verma', email: 'arjun.v@domain.in', phone: '+91 99222 33445', age: 45, status: 'ACTIVE', img: 'https://ui-avatars.com/api/?name=AV&background=FDF9EE&color=3A6447' },
  { id: 'AYU-2024-008', name: 'Kavita Rao', email: 'kavita.r@healthmail.com', phone: '+91 88333 44556', age: 58, status: 'INACTIVE', img: 'https://ui-avatars.com/api/?name=KR&background=FDF9EE&color=8C6239' },
  { id: 'AYU-2024-009', name: 'Rohan Sharma', email: 'rohan.s@provider.com', phone: '+91 77444 55667', age: 35, status: 'ACTIVE', img: 'https://ui-avatars.com/api/?name=RS&background=FDF9EE&color=3A6447' },
  { id: 'AYU-2024-010', name: 'Pooja Patel', email: 'pooja.p@wellness.org', phone: '+91 98555 66778', age: 31, status: 'ACTIVE', img: 'https://ui-avatars.com/api/?name=PP&background=FDF9EE&color=D9774B' },
  { id: 'AYU-2024-011', name: 'Sanjay Desai', email: 'sanjay.d@example.com', phone: '+91 91666 77889', age: 48, status: 'INACTIVE', img: 'https://ui-avatars.com/api/?name=SD&background=FDF9EE&color=8C6239' },
  { id: 'AYU-2024-012', name: 'Ananya Iyer', email: 'ananya.i@domain.in', phone: '+91 99777 88990', age: 26, status: 'ACTIVE', img: 'https://ui-avatars.com/api/?name=AI&background=FDF9EE&color=3A6447' }
];

const ITEMS_PER_PAGE = 5;

const PatientsTable = () => {
  const navigate = useNavigate();
  const [patientsData] = useState(INITIAL_PATIENTS);
  const [currentPage, setCurrentPage] = useState(1);

  // New states for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [ageFilter, setAgeFilter] = useState('Filter by Age');

  // Derived state: Apply filters and search to the data
  const filteredPatients = useMemo(() => {
    return patientsData.filter(patient => {
      // 1. Search Query
      const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Status Filter
      const matchesStatus = statusFilter === 'All Status' || patient.status.toUpperCase() === statusFilter.toUpperCase();

      // 3. Age Filter
      let matchesAge = true;
      if (ageFilter === '18-30') matchesAge = patient.age >= 18 && patient.age <= 30;
      else if (ageFilter === '31-50') matchesAge = patient.age >= 31 && patient.age <= 50;
      else if (ageFilter === '51+') matchesAge = patient.age >= 51;

      return matchesSearch && matchesStatus && matchesAge;
    });
  }, [patientsData, searchQuery, statusFilter, ageFilter]);

  // Pagination calculations based on FILTERED data
  const totalPages = Math.max(1, Math.ceil(filteredPatients.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredPatients.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Pagination Handlers
  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

  // Filter Change Handlers (Reset to page 1 on any filter change)
  const handleSearchChange = (e) => { setSearchQuery(e.target.value); setCurrentPage(1); };
  const handleStatusChange = (e) => { setStatusFilter(e.target.value); setCurrentPage(1); };
  const handleAgeChange = (e) => { setAgeFilter(e.target.value); setCurrentPage(1); };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm flex flex-col h-full">

      {/* Top Toolbar */}
      <div className="flex flex-col xl:flex-row justify-between gap-4 mb-8">

        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-full py-3.5 pl-12 pr-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 w-full xl:w-auto">
          <div className="relative flex-1 xl:w-40">
            <select
              value={statusFilter}
              onChange={handleStatusChange}
              className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-full py-3.5 pl-5 pr-10 text-sm font-bold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 cursor-pointer"
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>
          <div className="relative flex-1 xl:w-40">
            <select
              value={ageFilter}
              onChange={handleAgeChange}
              className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-full py-3.5 pl-5 pr-10 text-sm font-bold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 cursor-pointer"
            >
              <option value="Filter by Age">All Ages</option>
              <option value="18-30">18-30</option>
              <option value="31-50">31-50</option>
              <option value="51+">51+</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>
        </div>
      </div>

      {/* Table Headers */}
      <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-4 border-b border-[#EFEBE1]">
        <div className="w-[25%] pl-2">Name</div>
        <div className="w-[25%]">Email</div>
        <div className="w-[15%]">Phone</div>
        <div className="w-[10%]">Age</div>
        <div className="w-[10%]">Status</div>
        <div className="w-[15%] text-right pr-2">Action</div>
      </div>

      {/* Table Rows */}
      <div className="flex-1 mt-2 space-y-1 min-h-[380px]">
        {currentItems.length > 0 ? (
          currentItems.map((patient) => (
            <div key={patient.id} className="flex items-center py-4 border-b border-transparent hover:border-[#EFEBE1] hover:bg-[#FDF9EE]/50 rounded-2xl transition-colors group px-2 -mx-2">

              <div className="w-[25%] flex items-center gap-3">
                <img src={patient.img} alt={patient.name} className="w-10 h-10 rounded-full border border-[#EFEBE1] shadow-sm" />
                <span className="text-sm font-bold text-gray-900 group-hover:text-[#3A6447] transition-colors">{patient.name}</span>
              </div>

              <div className="w-[25%] text-sm font-medium text-gray-500">{patient.email}</div>
              <div className="w-[15%] text-sm font-medium text-gray-600">{patient.phone}</div>
              <div className="w-[10%] text-sm font-bold text-gray-900">{patient.age}</div>

              <div className="w-[10%]">
                <span className={`px-3 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${patient.status === 'ACTIVE' ? 'bg-[#E7F3EB] text-[#3A6447]' : 'bg-[#FDF1E8] text-[#D9774B]'
                  }`}>
                  {patient.status}
                </span>
              </div>

              <div className="w-[15%] text-right pr-2">
                <button
                  onClick={() => navigate(`/admin/patients/${patient.id}`)}
                  className="bg-[#3A6447] hover:bg-[#2C4D36] text-white text-xs font-bold py-2.5 px-5 rounded-full transition-colors shadow-sm cursor-pointer"
                >
                  View Details
                </button>
              </div>

            </div>
          ))
        ) : (
          <div className="text-center py-10 text-sm font-bold text-gray-400">
            No patients match your search criteria.
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-6 border-t border-[#EFEBE1] gap-4">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          Showing {filteredPatients.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredPatients.length)} of {filteredPatients.length} patients
        </p>

        {totalPages > 1 && (
          <div className="flex items-center gap-1 text-sm font-bold">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`p-1.5 rounded-full transition-colors ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${currentPage === pageNumber ? 'bg-[#3A6447] text-white shadow-sm' : 'text-gray-600 hover:bg-[#EFEBE1]'
                    }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`p-1.5 rounded-full transition-colors ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default PatientsTable;