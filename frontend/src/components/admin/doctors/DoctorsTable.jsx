import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Trash2, Plus, Edit2, ChevronLeft, ChevronRight } from 'lucide-react';
import DeleteDoctorModal from './DeleteDoctorModal';

// Initial Dummy Data
const INITIAL_DOCTORS = [
  { id: 1, name: 'Dr. Anjali Sharma', email: 'anjali.s@ayurcare.com', spec: 'Ayurveda Specialist', exp: '12 Years', fee: '$120.00', status: 'ACTIVE', img: 'https://ui-avatars.com/api/?name=AS&background=FDF9EE&color=3A6447' },
  { id: 2, name: 'Dr. Rajesh Kumar', email: 'rajesh.k@ayurcare.com', spec: 'Yoga Therapist', exp: '8 Years', fee: '$80.00', status: 'INACTIVE', img: 'https://ui-avatars.com/api/?name=RK&background=FDF9EE&color=D9774B' },
  { id: 3, name: 'Dr. Meera Nair', email: 'meera.n@ayurcare.com', spec: 'Pancha-Karma Specialist', exp: '15 Years', fee: '$150.00', status: 'ACTIVE', img: 'https://ui-avatars.com/api/?name=MN&background=FDF9EE&color=3A6447' },
  { id: 4, name: 'Dr. David Thorne', email: 'david.t@ayurcare.com', spec: 'General Medicine', exp: '10 Years', fee: '$100.00', status: 'ACTIVE', img: 'https://ui-avatars.com/api/?name=DT&background=FDF9EE&color=3A6447' },
];

const DoctorsTable = () => {
  const navigate = useNavigate();

  const [doctorsData, setDoctorsData] = useState(INITIAL_DOCTORS);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSelectAll = (e) => {
    if (e.target.checked) setSelectedIds(doctorsData.map(d => d.id));
    else setSelectedIds([]);
  };

  const handleSelectOne = (e, id) => {
    if (e.target.checked) setSelectedIds([...selectedIds, id]);
    else setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
  };

  const handleConfirmDelete = () => {
    const updatedDoctors = doctorsData.filter(doc => !selectedIds.includes(doc.id));
    setDoctorsData(updatedDoctors);
    setSelectedIds([]);
    setIsDeleteModalOpen(false);
  };

  const selectedDoctorName = selectedIds.length === 1 ? doctorsData.find(d => d.id === selectedIds[0])?.name : '';

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm flex flex-col h-full relative">
      
      <DeleteDoctorModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} selectedCount={selectedIds.length} doctorName={selectedDoctorName} />

      <div className="flex flex-col xl:flex-row justify-between gap-4 mb-8">
        <div className="flex flex-1 gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search Doctor" className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-full py-3.5 pl-12 pr-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 transition-all" />
          </div>
          <div className="relative w-48 hidden md:block">
            <select className="w-full bg-[#FAF7F2] border border-[#EFEBE1] rounded-full py-3.5 pl-5 pr-10 text-sm font-bold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3A6447]/20 cursor-pointer">
              <option>Specialization</option>
              <option>Ayurveda</option>
              <option>Yoga Therapy</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button disabled={selectedIds.length === 0} onClick={() => setIsDeleteModalOpen(true)} className="bg-[#D92D20] hover:bg-[#B42318] disabled:bg-red-200 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-colors text-sm w-full md:w-auto cursor-pointer">
            <Trash2 size={16} /> Delete Selected
          </button>
          <button onClick={() => navigate('/admin/doctors/add')} className="bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-colors text-sm w-full md:w-auto shrink-0 cursor-pointer">
            <Plus size={16} /> Add Doctor
          </button>
        </div>
      </div>

      <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-4 border-b border-[#EFEBE1]">
        <div className="w-12 pl-2">
          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#3A6447] focus:ring-[#3A6447] cursor-pointer" checked={selectedIds.length === doctorsData.length && doctorsData.length > 0} onChange={handleSelectAll} />
        </div>
        <div className="w-[25%]">Name</div>
        <div className="w-[25%]">Specialization</div>
        <div className="w-[15%]">Experience</div>
        <div className="w-[15%]">Fees</div>
        <div className="w-[15%]">Status</div>
        <div className="w-[10%] text-right pr-2">Action</div>
      </div>

      <div className="flex-1 mt-2 space-y-1 min-h-[300px]">
        {doctorsData.length === 0 ? (
           <div className="text-center py-10 text-sm font-bold text-gray-400">No doctors found.</div>
        ) : (
          doctorsData.map((doc) => (
            <div key={doc.id} className="flex items-center py-4 border-b border-transparent hover:border-[#EFEBE1] hover:bg-[#FDF9EE]/50 rounded-2xl transition-colors px-2 -mx-2">
              
              <div className="w-12 shrink-0">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#3A6447] focus:ring-[#3A6447] cursor-pointer" checked={selectedIds.includes(doc.id)} onChange={(e) => handleSelectOne(e, doc.id)} />
              </div>
              
              <div className="w-[25%] flex items-center gap-3 cursor-pointer" onClick={() => navigate(`/admin/doctors/edit/${doc.id}`)}>
                <img src={doc.img} alt={doc.name} className="w-10 h-10 rounded-full border border-[#EFEBE1] shadow-sm" />
                <div>
                  <p className="text-sm font-bold text-gray-900 hover:text-[#3A6447] transition-colors">{doc.name}</p>
                  <p className="text-[11px] font-medium text-gray-500">{doc.email}</p>
                </div>
              </div>
              
              <div className="w-[25%] text-sm font-medium text-gray-600">{doc.spec}</div>
              <div className="w-[15%] text-sm font-medium text-gray-600">{doc.exp}</div>
              <div className="w-[15%] text-sm font-bold text-gray-900">{doc.fee}</div>
              <div className="w-[15%]">
                <span className={`px-3 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${doc.status === 'ACTIVE' ? 'bg-[#E7F3EB] text-[#3A6447]' : 'bg-[#FDF1E8] text-[#D9774B]'}`}>
                  {doc.status}
                </span>
              </div>
              
              {/* --- NEW TOOLTIP AND EDIT BUTTON LOGIC HERE --- */}
              <div className="w-[10%] text-right pr-4 flex justify-end">
                <div className="relative group">
                  <button 
                    onClick={() => navigate(`/admin/doctors/edit/${doc.id}`)}
                    className="text-gray-400 hover:text-[#3A6447] transition-colors p-2 rounded-full hover:bg-gray-100 cursor-pointer outline-none"
                  >
                    <Edit2 size={16} />
                  </button>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-sm">
                    Edit Doctor
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-6 border-t border-[#EFEBE1] gap-4">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          Showing 1 to {doctorsData.length} of {doctorsData.length} Doctors
        </p>
        <div className="flex items-center gap-1 text-sm font-bold">
          <button className="p-1.5 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"><ChevronLeft size={18} /></button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center bg-[#3A6447] text-white shadow-sm">1</button>
          <button className="p-1.5 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"><ChevronRight size={18} /></button>
        </div>
      </div>

    </div>
  );
};

export default DoctorsTable;