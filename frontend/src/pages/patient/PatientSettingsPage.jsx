import React from 'react';
import AccountInfoCard from '../../components/patient/settings/AccountInfoCard';
import PasswordChangeCard from '../../components/patient/settings/PasswordChangeCard';
import NotificationPrefsCard from '../../components/patient/settings/NotificationPrefsCard';
import PrivacySettingsCard from '../../components/patient/settings/PrivacySettingsCard';

const PatientSettingsPage = () => {
  return (
    <div className="bg-[#FDF9EE] min-h-full p-8 md:p-10 font-sans max-w-[1600px] mx-auto flex flex-col">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-[40px] font-extrabold text-gray-900 mb-3 tracking-tight">
          Settings
        </h1>
        <p className="text-gray-500 font-medium text-base max-w-2xl leading-relaxed">
          Manage your digital wellness experience. Your privacy and data integrity are our clinical priority.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* Top Row: Account & Password */}
        <div className="lg:col-span-3">
          <AccountInfoCard />
        </div>
        <div className="lg:col-span-2">
          <PasswordChangeCard />
        </div>

        {/* Bottom Row: Notifications & Privacy */}
        <div className="lg:col-span-3">
          <NotificationPrefsCard />
        </div>
        <div className="lg:col-span-2">
          <PrivacySettingsCard />
        </div>

      </div>

    </div>
  );
};

export default PatientSettingsPage;