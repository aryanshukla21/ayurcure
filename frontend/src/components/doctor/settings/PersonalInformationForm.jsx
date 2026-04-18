import React, { useState } from 'react';
import { User } from 'lucide-react';
import { FormGroup, Input, SaveButton, CardHeader } from './SettingsUI';
import { doctorApi } from '../../../api/doctorApi';

const PersonalInformationForm = ({ data }) => {
    // Mapping from backend schema (first_name, last_name) to UI (full_name)
    const initialData = {
        full_name: `${data?.first_name || ''} ${data?.last_name || ''}`.trim(),
        email: data?.email || '',
        phone: data?.phone_number || '',
        bio: data?.bio || ''
    };

    const [formData, setFormData] = useState(initialData);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const nameParts = formData.full_name.split(' ');
            const payload = {
                first_name: nameParts[0] || '',
                last_name: nameParts.slice(1).join(' ') || '',
                email: formData.email,
                phone_number: formData.phone,
                bio: formData.bio
            };
            await doctorApi.updateSettingsPersonalInfo(payload);
            setIsEditing(false);
            // Optionally: trigger a toast notification here
        } catch (error) {
            console.error("Failed to update personal info", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setFormData(initialData);
        setIsEditing(false);
    };

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <CardHeader icon={User} title="Personal Information" iconColor="text-[#4A7C59]" iconBg="bg-[#4A7C59]/10" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <FormGroup label="Full Name">
                    <Input name="full_name" value={formData.full_name} onChange={handleChange} disabled={!isEditing} />
                </FormGroup>
                <FormGroup label="Phone Number">
                    <Input name="phone" value={formData.phone} onChange={handleChange} disabled={!isEditing} />
                </FormGroup>
                <div className="md:col-span-2">
                    <FormGroup label="Email Address">
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} disabled={!isEditing} />
                    </FormGroup>
                </div>
            </div>

            <div className="flex justify-start mt-4 gap-4">
                {!isEditing ? (
                    <SaveButton text="Edit" colorClass="bg-blue-600 hover:bg-blue-700" onClick={() => setIsEditing(true)} />
                ) : (
                    <>
                        {hasChanges && (
                            <SaveButton
                                text={isSaving ? "Updating..." : "Update Information"}
                                colorClass="bg-[#4A7C59] hover:bg-[#3a6146]"
                                onClick={handleSave}
                            />
                        )}
                        <SaveButton text="Cancel" colorClass="bg-red-500 hover:bg-red-600" onClick={handleCancel} />
                    </>
                )}
            </div>
        </div>
    );
};

export default PersonalInformationForm;