// frontend/src/components/doctor/settings/PhilosophyOfCareForm.jsx
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { TextArea, SaveButton, CardHeader } from './SettingsUI';

const PhilosophyOfCareForm = ({ data }) => {
    const [bio, setBio] = useState(data?.bio || '');

    return (
        <div className="bg-white rounded-3xl px-8 py-4 shadow-sm border border-gray-100 flex flex-col">
            <CardHeader
                icon={Heart}
                title="Philosophy of Care"
                description="Share your unique approach to Ayurvedic healing."
                iconColor="text-teal-600"
                iconBg="bg-teal-50"
            />

            <div className="flex-1">
                <TextArea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="I believe in treating the root cause..."
                />
            </div>

            <div className="flex justify-end mt-6">
                <SaveButton text="Update Philosophy" colorClass="bg-[#4A7C59] hover:bg-[#3a6146]" onClick={() => console.log('Saving Bio:', bio)} />
            </div>
        </div>
    );
};
export default PhilosophyOfCareForm;