// frontend/src/components/doctor/settings/PreferencesForm.jsx
import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Toggle, CardHeader } from './SettingsUI';

const PreferencesForm = ({ data }) => {
    // Only 3 fields as per the UI
    const [prefs, setPrefs] = useState({
        push: data?.preferences?.push_notifications ?? true,
        hdVideo: data?.preferences?.hd_video ?? true,
        publicProfile: data?.preferences?.public_profile ?? true,
    });

    const handleToggle = (key) => setPrefs({ ...prefs, [key]: !prefs[key] });

    return (
        <div className="bg-[#faf2dc] rounded-3xl p-8 shadow-sm border border-gray-100 h-full">
            <CardHeader
                icon={SlidersHorizontal}
                title="Preferences"
                iconColor="text-purple-600"
                iconBg="bg-purple-50"
            />

            <div className="flex flex-col">
                <Toggle
                    label="Push Notifications"
                    description="Receive instant alerts for upcoming appointments, messages, and system updates."
                    enabled={prefs.push}
                    onChange={() => handleToggle('push')}
                />
                <Toggle
                    label="HD Video Quality"
                    description="Enable high-definition streaming for all tele-consultations and video calls."
                    enabled={prefs.hdVideo}
                    onChange={() => handleToggle('hdVideo')}
                />
                <Toggle
                    label="Public Profile"
                    description="Make your profile visible in search results and the global patient directory."
                    enabled={prefs.publicProfile}
                    onChange={() => handleToggle('publicProfile')}
                />
            </div>
        </div>
    );
};

export default PreferencesForm;