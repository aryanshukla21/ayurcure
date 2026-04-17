import React, { useState, useEffect } from 'react';
import { patientApi } from '../../api/patientApi';
import { Save, Edit2 } from 'lucide-react';
import AccountInfoCard from '../../components/patient/settings/AccountInfoCard';
import PasswordChangeCard from '../../components/patient/settings/PasswordChangeCard';
import NotificationPrefsCard from '../../components/patient/settings/NotificationPrefsCard';
import PrivacySettingsCard from '../../components/patient/settings/PrivacySettingsCard';

const PatientSettingsPage = () => {
  const [account, setAccount] = useState({});
  const [notifications, setNotifications] = useState({});
  const [privacy, setPrivacy] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    patientApi.getSettingsAccount().then(setAccount).catch(console.error);
    patientApi.getSettingsNotifications().then(setNotifications).catch(console.error);
    patientApi.getSettingsPrivacy().then(setPrivacy).catch(console.error);
  }, []);

  const handleToggleEdit = async () => {
    if (isEditing) {
      try {
        await Promise.all([
          patientApi.updateSettingsAccount(account),
          patientApi.updateSettingsData({ notifications, privacy })
        ]);
        alert("Settings Saved!");
      } catch (err) {
        alert("Failed to save settings.");
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-[#FDF9EE] min-h-full p-8 md:p-10 font-sans max-w-[1600px] mx-auto flex flex-col relative pb-24">
      <div className="flex justify-between items-start mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Settings</h1>
        <button
          onClick={handleToggleEdit}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-colors ${isEditing ? 'bg-[#2C5F44] text-white' : 'bg-white border text-gray-700'}`}
        >
          {isEditing ? <><Save size={18} /> Save</> : <><Edit2 size={18} /> Edit</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <AccountInfoCard data={account} isEditing={isEditing} onChange={(field, val) => setAccount(p => ({ ...p, [field]: val }))} />
        </div>
        <div className="lg:col-span-2"><PasswordChangeCard /></div>
        <div className="lg:col-span-3">
          <NotificationPrefsCard data={notifications} isEditing={isEditing} onChange={(field, val) => setNotifications(p => ({ ...p, [field]: val }))} />
        </div>
        <div className="lg:col-span-2">
          <PrivacySettingsCard data={privacy} isEditing={isEditing} onChange={(field, val) => setPrivacy(p => ({ ...p, [field]: val }))} />
        </div>
      </div>
    </div>
  );
};

export default PatientSettingsPage;