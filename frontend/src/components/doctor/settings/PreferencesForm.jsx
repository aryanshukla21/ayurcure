import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Toggle, SaveButton, CardHeader } from './SettingsUI';

const PreferencesForm = ({ data }) => {
    const initialPrefs = {
        push: data?.preferences?.push_notifications ?? true,
        hdVideo: data?.preferences?.hd_video ?? true,
        publicProfile: data?.preferences?.public_profile ?? true,
    };

    const [prefs, setPrefs] = useState(initialPrefs);
    const [isEditing, setIsEditing] = useState(false);

    const handleToggle = (key) => {
        if (!isEditing) return; // Prevent toggle when not editing
        setPrefs({ ...prefs, [key]: !prefs[key] });
    };

    const hasChanges = JSON.stringify(prefs) !== JSON.stringify(initialPrefs);

    const handleSave = () => {
        console.log('Saving Preferences:', prefs);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setPrefs(initialPrefs);
        setIsEditing(false);
    };

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
                    disabled={!isEditing}
                />
                <Toggle
                    label="HD Video Quality"
                    description="Enable high-definition streaming for all tele-consultations and video calls."
                    enabled={prefs.hdVideo}
                    onChange={() => handleToggle('hdVideo')}
                    disabled={!isEditing}
                />
                <Toggle
                    label="Public Profile"
                    description="Make your profile visible in search results and the global patient directory."
                    enabled={prefs.publicProfile}
                    onChange={() => handleToggle('publicProfile')}
                    disabled={!isEditing}
                />
            </div>

            <div className="flex justify-start mt-6 gap-4">
                {!isEditing ? (
                    <SaveButton text="Edit" colorClass="bg-blue-600 hover:bg-blue-700" onClick={() => setIsEditing(true)} />
                ) : (
                    <>
                        {hasChanges && (
                            <SaveButton text="Update Preferences" colorClass="bg-[#4A7C59] hover:bg-[#3a6146]" onClick={handleSave} />
                        )}
                        <SaveButton text="Don't Update" colorClass="bg-red-500 hover:bg-red-600" onClick={handleCancel} />
                    </>
                )}
            </div>
        </div>
    );
};

export default PreferencesForm;