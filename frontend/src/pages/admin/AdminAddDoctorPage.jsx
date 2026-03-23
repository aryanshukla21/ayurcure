import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, UserPlus, ChevronRight } from 'lucide-react';
import PersonalInfoSection from '../../components/admin/doctors/add-doctor/PersonalInfoSection';
import ConsultationSection from '../../components/admin/doctors/add-doctor/ConsultationSection';
import ProfessionalSection from '../../components/admin/doctors/add-doctor/ProfessionalSection';
import AboutSection from '../../components/admin/doctors/add-doctor/AboutSection';

const AdminAddDoctorPage = () => {
  const navigate = useNavigate();

  // Centralized Form State
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', emergencyContact: '', address: '', password: '',
    fees: '', startTime: '09:00', endTime: '17:00',
    specialization: 'Ayurvedic General Medicine', registrationNumber: '', qualifications: '', experience: '',
    about: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddDoctor = () => {
    console.log('Submitting new doctor data:', formData);
    // Here you would normally send an API POST request.
    // After success, navigate back to the doctors list:
    navigate('/admin/doctors');
  };

  return (
    <div className="p-8 md:p-10 max-w-[1600px] mx-auto flex flex-col h-full">
      
      {/* Header & Breadcrumbs */}
      <div className="mb-10">
        <div className="flex items-center text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">
          <Link to="/admin/doctors" className="hover:text-[#4A7C59] transition-colors">Doctors</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-900">Onboarding</span>
        </div>
        <h1 className="text-3xl md:text-[32px] font-extrabold text-green-700 tracking-tight leading-none mb-2">
          Add Doctor
        </h1>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-10 flex-1 mb-8">
        
        {/* Left Column (Wider) */}
        <div className="lg:col-span-2 flex flex-col gap-12">
          <PersonalInfoSection formData={formData} onChange={handleInputChange} />
          <ProfessionalSection formData={formData} onChange={handleInputChange} />
        </div>

        {/* Right Column (Narrower) */}
        <div className="lg:col-span-1 flex flex-col gap-12">
          <ConsultationSection formData={formData} onChange={handleInputChange} />
          <AboutSection formData={formData} onChange={handleInputChange} />
        </div>

      </div>

      {/* Bottom Action Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#EFEBE1] gap-6">
        
        <div className="flex items-center gap-3 text-gray-500">
          <div className="w-8 h-8 rounded-full bg-[#E7F3EB] flex items-center justify-center text-[#3A6447]">
            <ShieldCheck size={16} />
          </div>
          <p className="text-xs font-bold">All data is encrypted and HIPAA compliant.</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            onClick={() => navigate('/admin/doctors')}
            className="flex-1 md:flex-none px-8 py-3.5 bg-white border border-[#EFEBE1] hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-full transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button 
            onClick={handleAddDoctor}
            className="flex-1 md:flex-none px-8 py-3.5 bg-[#3A6447] hover:bg-[#2C4D36] text-white text-sm font-bold rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <UserPlus size={18} /> Add Doctor
          </button>
        </div>

      </div>

    </div>
  );
};

export default AdminAddDoctorPage;