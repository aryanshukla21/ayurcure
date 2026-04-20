import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Save, ChevronRight, Loader2, Edit2, X } from 'lucide-react';
import { adminApi } from '../../api/adminApi';

import PersonalInfoSection from '../../components/admin/doctors/add-doctor/PersonalInfoSection';
import ConsultationSection from '../../components/admin/doctors/add-doctor/ConsultationSection';
import ProfessionalSection from '../../components/admin/doctors/add-doctor/ProfessionalSection';
import AboutSection from '../../components/admin/doctors/add-doctor/AboutSection';

const AdminEditDoctorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', emergencyContact: '', address: '', password: '',
    fees: '', startTime: '09:00', endTime: '17:00', specialization: '', registrationNumber: '',
    qualifications: '', experience: '', about: '', status: ''
  });

  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await adminApi.getDoctorDetails(id);
        if (res && res.data) {
          const mappedData = {
            fullName: res.data.full_name || '',
            email: res.data.email || '',
            phone: res.data.phone || '',
            emergencyContact: res.data.emergency_contact || '',
            address: res.data.address || '',
            password: '', // Blank for security
            fees: res.data.consultation_fee || '',
            startTime: res.data.start_time || '09:00',
            endTime: res.data.end_time || '17:00',
            specialization: res.data.specialization || '',
            registrationNumber: res.data.registration_number || '',
            qualifications: res.data.qualifications || '',
            experience: res.data.experience_years || '',
            about: res.data.bio || '',
            status: res.data.verification_status || 'Verified'
          };
          setFormData(mappedData);
          setOriginalData(mappedData);
        }
      } catch (err) {
        console.error("Fetch failed", err);
        setError("Failed to load doctor profile.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    setError('');
    try {
      const payload = {
        specialization: formData.specialization,
        experience_years: parseInt(formData.experience) || 0,
        consultation_fee: parseFloat(formData.fees) || 0,
        verification_status: formData.status
        // Backend handles these fields in updateDoctorDetails
      };

      await adminApi.updateDoctorDetails(id, payload);
      setIsEditing(false);
      setOriginalData(formData); // Update original to new saved state
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDiscardChanges = () => {
    setFormData(originalData); // Reset
    setIsEditing(false);
    setError('');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-full min-h-[60vh]"><Loader2 className="w-12 h-12 text-[#3A6447] animate-spin" /></div>;
  }

  return (
    <div className="p-8 md:p-10 max-w-[1600px] mx-auto flex flex-col h-full animate-in fade-in duration-300">
      <div className="mb-10">
        <div className="flex items-center text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">
          <Link to="/admin/doctors" className="hover:text-[#4A7C59] transition-colors">Doctors</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-900">Doctor Profile</span>
        </div>

        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl md:text-[32px] font-extrabold text-green-700 tracking-tight leading-none mb-1">
              {formData.fullName}
            </h1>
            <span className="bg-[#E7F3EB] text-[#3A6447] text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mt-1">
              ID: #{id}
            </span>
          </div>

          <div className="flex items-center gap-4 w-full xl:w-auto">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="flex-1 xl:flex-none px-6 py-3 bg-[#3A6447] hover:bg-[#2C4D36] text-white text-sm font-bold rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer">
                <Edit2 size={16} /> Edit Profile
              </button>
            ) : (
              <>
                <button onClick={handleDiscardChanges} disabled={isSaving} className="flex-1 xl:flex-none px-6 py-3 bg-white border border-[#EFEBE1] hover:bg-gray-50 disabled:opacity-50 text-gray-700 text-sm font-bold rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer">
                  <X size={16} /> Discard Changes
                </button>
                <button onClick={handleSaveChanges} disabled={isSaving} className="flex-1 xl:flex-none px-6 py-3 bg-[#3A6447] hover:bg-[#2C4D36] disabled:bg-[#3A6447]/70 text-white text-sm font-bold rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer">
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            )}
          </div>
        </div>
        {error && <p className="text-sm font-bold text-red-600 mt-4 bg-red-50 p-3 rounded-xl inline-block">{error}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-10 flex-1 mb-8">
        <div className="lg:col-span-2 flex flex-col gap-12">
          <PersonalInfoSection formData={formData} onChange={handleInputChange} isEditing={isEditing} />
          <ProfessionalSection formData={formData} onChange={handleInputChange} isEditing={isEditing} />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-12">
          <ConsultationSection formData={formData} onChange={handleInputChange} isEditing={isEditing} />
          <AboutSection formData={formData} onChange={handleInputChange} isEditing={isEditing} />
        </div>
      </div>
    </div>
  );
};

export default AdminEditDoctorPage;