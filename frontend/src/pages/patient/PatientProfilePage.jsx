import React, { useState } from 'react';
import ProfileOverviewCard from '../../components/patient/profile/ProfileOverviewCard';
import MedicalInfoCard from '../../components/patient/profile/MedicalInfoCard';
import PersonalDetailsCard from '../../components/patient/profile/PersonalDetailsCard';
import ContactInfoCard from '../../components/patient/profile/ContactInfoCard';
import EmergencyContactCard from '../../components/patient/profile/EmergencyContactCard';

const INITIAL_DATA = {
  name: 'Alex Thompson', // [cite: 743, 762]
  age: '32', // [cite: 745]
  gender: 'Male', // [cite: 746, 765]
  constitution: 'Pitta-Vata', // [cite: 749]
  dob: 'Jan 15, 1992', // [cite: 764]
  email: 'alex.t@example.com', // [cite: 767]
  phone: '+91 98765 43210', // [cite: 769]
  address: 'Flat 402, Lotus Residency,\nMumbai, Maharashtra 400001', // [cite: 771]
  emergency: {
    name: 'Sarah Thompson', // [cite: 773]
    relation: 'Spouse', // [cite: 773]
    phone: '+91 91234 56789' // [cite: 774]
  },
  medical: {
    diseases: ['Hypertension'], // [cite: 748]
    allergies: ['Pollen', 'Peanuts'], // [cite: 754, 755]
    currentMedication: {
      name: 'Ashwagandha Extract', // [cite: 757]
      dosage: '500mg - Twice daily before meals' // [cite: 757]
    }
  }
};

const PatientProfilePage = () => {
  const [profileData, setProfileData] = useState(INITIAL_DATA);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('emergency')) {
      const field = name.replace('emergency', '').toLowerCase();
      setProfileData(prev => ({ ...prev, emergency: { ...prev.emergency, [field]: value } }));
    } else {
      setProfileData(prev => ({ ...prev, [name]: value }));
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      // In a real app, you would make an API call here to save
      console.log('Saved data:', profileData);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-[#FDF9EE] min-h-full p-8 md:p-10 font-sans max-w-[1600px] mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-[40px] font-extrabold text-gray-900 tracking-tight">
          Patient Profile
        </h1>
        <div className="flex items-center gap-4 mt-4">
          <div className="h-[1px] w-10 bg-gray-400"></div>
          <p className="text-[10px] font-extrabold text-green-700 uppercase tracking-widest">
            MEMBER SINCE 2021 {/* [cite: 742] */}
          </p>
        </div>
      </div>

      {/* Top 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ProfileOverviewCard
          profile={profileData}
          isEditing={isEditing}
          onEditToggle={toggleEdit}
          onChange={handleInputChange}
        />
        <MedicalInfoCard medical={profileData.medical} />
      </div>

      {/* Bottom 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PersonalDetailsCard profile={profileData} isEditing={isEditing} onChange={handleInputChange} />
        <ContactInfoCard profile={profileData} isEditing={isEditing} onChange={handleInputChange} />
        <EmergencyContactCard emergency={profileData.emergency} isEditing={isEditing} onChange={handleInputChange} />
      </div>

    </div>
  );
};

export default PatientProfilePage;