import React, { useState } from 'react';
import { Save, Edit2 } from 'lucide-react';
import AccountInfoCard from '../../components/patient/settings/AccountInfoCard';
import PasswordChangeCard from '../../components/patient/settings/PasswordChangeCard';
import NotificationPrefsCard from '../../components/patient/settings/NotificationPrefsCard';
import PrivacySettingsCard from '../../components/patient/settings/PrivacySettingsCard';

// Mock Data for the forms
const INITIAL_SETTINGS_DATA = {
  account: {
    fullName: 'Alex Thompson',
    email: 'alex.t@example.com',
    phone: '+91 98765 43210',
    language: 'English',
    timeZone: 'Asia/Kolkata (IST)',
  },
  notifications: {
    emailAlerts: true,
    smsReminders: true,
    marketingEmails: false,
    appointmentUpdates: true,
  },
  privacy: {
    profileVisibility: 'Private',
    dataSharing: false,
  }
};

const PatientSettingsPage = () => {
  const [settingsData, setSettingsData] = useState(INITIAL_SETTINGS_DATA);
  const [isEditing, setIsEditing] = useState(false);

  // General handler to update nested state
  const handleInputChange = (section, field, value) => {
    setSettingsData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const toggleEditMode = () => {
    if (isEditing) {
      // API call to save settings would go here
      console.log("Saving new settings:", settingsData);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-[#FDF9EE] min-h-full p-8 md:p-10 font-sans max-w-[1600px] mx-auto flex flex-col relative pb-24">

      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-4xl md:text-[40px] font-extrabold text-gray-900 mb-3 tracking-tight">
            Settings
          </h1>
          <p className="text-gray-500 font-medium text-base max-w-2xl leading-relaxed">
            Manage your digital wellness experience. Your privacy and data integrity are our clinical priority.
          </p>
        </div>

        {/* Global Action Button */}
        <button
          onClick={toggleEditMode}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold shadow-sm transition-colors ${isEditing
              ? 'bg-[#2C5F44] text-white hover:bg-[#1E4620]'
              : 'bg-white border border-[#EFEBE1] text-gray-700 hover:bg-[#FAF7F2]'
            }`}
        >
          {isEditing ? (
            <><Save size={18} /> Save Changes</>
          ) : (
            <><Edit2 size={18} /> Edit Settings</>
          )}
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* Top Row: Account & Password */}
        <div className="lg:col-span-3">
          <AccountInfoCard
            data={settingsData.account}
            isEditing={isEditing}
            onChange={(field, value) => handleInputChange('account', field, value)}
          />
        </div>
        <div className="lg:col-span-2">
          {/* Password generally doesn't toggle inline, it's a dedicated action */}
          <PasswordChangeCard />
        </div>

        {/* Bottom Row: Notifications & Privacy */}
        <div className="lg:col-span-3">
          <NotificationPrefsCard
            data={settingsData.notifications}
            isEditing={isEditing}
            onChange={(field, value) => handleInputChange('notifications', field, value)}
          />
        </div>
        <div className="lg:col-span-2">
          <PrivacySettingsCard
            data={settingsData.privacy}
            isEditing={isEditing}
            onChange={(field, value) => handleInputChange('privacy', field, value)}
          />
        </div>

      </div>

    </div>
  );
};

export default PatientSettingsPage;