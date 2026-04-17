import React, { useState, useEffect } from 'react';
import { patientApi } from '../../api/patientApi';
import ProfileOverviewCard from '../../components/patient/profile/ProfileOverviewCard';
import MedicalInfoCard from '../../components/patient/profile/MedicalInfoCard';
import PersonalDetailsCard from '../../components/patient/profile/PersonalDetailsCard';
import ContactInfoCard from '../../components/patient/profile/ContactInfoCard';
import EmergencyContactCard from '../../components/patient/profile/EmergencyContactCard';

const PatientProfilePage = () => {
  const [personal, setPersonal] = useState({});
  const [medical, setMedical] = useState({});
  const [contact, setContact] = useState({});
  const [emergency, setEmergency] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    patientApi.getProfilePersonal().then(setPersonal).catch(console.error);
    patientApi.getProfileMedical().then(setMedical).catch(console.error);
    patientApi.getProfileContact().then(setContact).catch(console.error);
    patientApi.getProfileEmergency().then(setEmergency).catch(console.error);
  }, []);

  const handlePersonalChange = (e) => setPersonal(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleContactChange = (e) => setContact(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleEmergencyChange = (e) => setEmergency(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleEdit = async () => {
    if (isEditing) {
      try {
        // Save the sections that can be edited
        await Promise.all([
          patientApi.updateProfilePersonal(personal),
          patientApi.updateProfileContact(contact),
          patientApi.updateProfileEmergency(emergency)
        ]);
      } catch (err) {
        alert("Failed to save some profile sections.");
        return;
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-[#FDF9EE] min-h-full p-8 md:p-10 font-sans max-w-[1600px] mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Patient Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ProfileOverviewCard profile={personal} isEditing={isEditing} onEditToggle={toggleEdit} onChange={handlePersonalChange} />
        <MedicalInfoCard medical={medical} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PersonalDetailsCard profile={personal} isEditing={isEditing} onChange={handlePersonalChange} />
        <ContactInfoCard profile={contact} isEditing={isEditing} onChange={handleContactChange} />
        <EmergencyContactCard emergency={emergency} isEditing={isEditing} onChange={handleEmergencyChange} />
      </div>
    </div>
  );
};

export default PatientProfilePage;