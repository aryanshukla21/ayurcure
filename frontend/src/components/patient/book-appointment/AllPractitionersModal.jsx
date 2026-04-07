import React, { useState } from 'react';
import { X, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import PractitionerModalCard from './PractitionerModalCard';

const SPECIALTIES = ['All Specialties', 'Ayurvedic', 'Panchakarma', 'Yoga Therapy'];

const AllPractitionersModal = ({ isOpen, onClose, onSelectDoctor, doctors }) => {
  const [activeFilter, setActiveFilter] = useState('All Specialties');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  // Filter logic for both the search bar and the specialty tabs
  const filteredDoctors = doctors.filter((doctor) => {
    const searchLower = searchQuery.toLowerCase();

    // Check if the search query matches the doctor's name, specialty, or tags
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchLower) ||
      doctor.specialty.toLowerCase().includes(searchLower) ||
      doctor.tag.toLowerCase().includes(searchLower);

    // Check if the active tab matches the doctor's specialty
    const matchesSpecialty =
      activeFilter === 'All Specialties' ||
      doctor.specialty.toLowerCase().includes(activeFilter.toLowerCase());

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/40 backdrop-blur-sm">
      <div className="bg-[#FDF9EE] w-full max-w-[1200px] max-h-full rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

        {/* Header - Filter Icon Removed */}
        <div className="px-8 py-6 border-b border-[#EFEBE1] flex items-center justify-between shrink-0 bg-[#FDF9EE] z-10">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-2 hover:bg-[#EFEBE1] rounded-full transition-colors">
              <X size={24} className="text-gray-900" />
            </button>
            <h2 className="text-xl font-bold text-gray-900">Practitioners</h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">

            {/* Search Bar */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or keyword"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#EFEBE1] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C59] shadow-sm"
              />
            </div>

            {/* Specialty Filters */}
            <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
              {SPECIALTIES.map(spec => (
                <button
                  key={spec}
                  onClick={() => setActiveFilter(spec)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeFilter === spec ? 'bg-[#2C4C3B] text-white shadow-md' : 'bg-white text-gray-600 border border-[#EFEBE1] hover:bg-gray-50'
                    }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Render Filtered Doctors */}
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map(doctor => (
                <PractitionerModalCard
                  key={doctor.id}
                  doctor={doctor}
                  onSelect={(doc) => {
                    onSelectDoctor(doc.id);
                    onClose();
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500 font-medium">
              No practitioners found matching your criteria.
            </div>
          )}
        </div>

        <div className="px-8 py-5 border-t border-[#EFEBE1] flex justify-between items-center shrink-0 bg-[#FDF9EE]">
          <p className="text-sm font-semibold text-gray-500">Showing {filteredDoctors.length} Practitioners available today</p>
          <div className="flex items-center gap-4 text-gray-900 font-bold">
            <button className="p-1 text-gray-400 hover:text-gray-900 transition-colors"><ChevronLeft size={20} /></button>
            <span>1 / 1</span>
            <button className="p-1 hover:text-[#4A7C59] transition-colors"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPractitionersModal;