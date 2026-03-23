import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Save, ChevronRight, Loader2 } from 'lucide-react';

// REUSING the components you created in the Add Doctor step!
import PersonalInfoSection from '../../components/admin/doctors/add-doctor/PersonalInfoSection';
import ConsultationSection from '../../components/admin/doctors/add-doctor/ConsultationSection';
import ProfessionalSection from '../../components/admin/doctors/add-doctor/ProfessionalSection';
import AboutSection from '../../components/admin/doctors/add-doctor/AboutSection';

const AdminEditDoctorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', emergencyContact: '', address: '', password: '',
    fees: '', startTime: '', endTime: '', specialization: '', registrationNumber: '', 
    qualifications: '', experience: '', about: ''
  });

  // Simulate fetching the doctor's data based on the ID
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setFormData({
        fullName: 'Dr. Anjali Sharma',
        email: 'anjali.s@ayurcare.com',
        phone: '+91 98765 43210',
        emergencyContact: '+91 91234 56789',
        address: '108 Wellness Avenue, Kerala 682001',
        password: '', // Leave blank for security
        fees: '1200',
        startTime: '09:00',
        endTime: '16:00',
        specialization: 'Ayurvedic General Medicine',
        registrationNumber: 'AYU-2012-9042',
        qualifications: 'BAMS, MD (Ayurveda)',
        experience: '12',
        about: 'Dr. Anjali specializes in holistic healing and chronic disease management using traditional Ayurvedic principles combined with modern lifestyle adjustments.'
      });
      setIsLoading(false);
    }, 400); // 400ms fake load time
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    console.log('Saving updated doctor data for ID:', id, formData);
    // Simulate API save, then route back
    navigate('/admin/doctors');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-[#3A6447] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 md:p-10 max-w-[1600px] mx-auto flex flex-col h-full animate-in fade-in duration-300">
      
      {/* Header & Breadcrumbs */}
      <div className="mb-10">
        <div className="flex items-center text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">
          <Link to="/admin/doctors" className="hover:text-[#4A7C59] transition-colors">Doctors</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-900">Edit Profile</span>
        </div>
        <div className="flex justify-between items-end">
          <h1 className="text-3xl md:text-[32px] font-extrabold text-green-700 tracking-tight leading-none mb-2">
            Edit Doctor
          </h1>
          <span className="bg-[#E7F3EB] text-[#3A6447] text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest">
            ID: #{id}
          </span>
        </div>
      </div>

      {/* Main Grid Layout (Reusing components) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-10 flex-1 mb-8">
        <div className="lg:col-span-2 flex flex-col gap-12">
          <PersonalInfoSection formData={formData} onChange={handleInputChange} />
          <ProfessionalSection formData={formData} onChange={handleInputChange} />
        </div>
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
          <p className="text-xs font-bold">All modifications are tracked in the Audit Log.</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            onClick={() => navigate('/admin/doctors')}
            className="flex-1 md:flex-none px-8 py-3.5 bg-white border border-[#EFEBE1] hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-full transition-colors shadow-sm cursor-pointer"
          >
            Discard Changes
          </button>
          <button 
            onClick={handleSaveChanges}
            className="flex-1 md:flex-none px-8 py-3.5 bg-[#3A6447] hover:bg-[#2C4D36] text-white text-sm font-bold rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
          >
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>

    </div>
  );
};

export default AdminEditDoctorPage;