import React, { useState } from 'react';
import { User } from 'lucide-react';
import { FormGroup, Input, SaveButton, CardHeader } from './SettingsUI';

const PersonalInformationForm = ({ data }) => {
    const initialData = {
        full_name: data?.full_name || '',
        email: data?.email || '',
        phone: data?.phone || '',
        languages: Array.isArray(data?.languages) ? data.languages.join(', ') : data?.languages || '',
        clinic_address: data?.clinic_address || ''
    };

    const [formData, setFormData] = useState(initialData);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Check if the user changed any fields
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

    const handleSave = () => {
        console.log('Saving:', formData);
        setIsEditing(false);
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
                <FormGroup label="Email Address">
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} disabled={!isEditing} />
                </FormGroup>
                <FormGroup label="Languages">
                    <Input name="languages" value={formData.languages} onChange={handleChange} disabled={!isEditing} />
                </FormGroup>
                <div className="md:col-span-2">
                    <FormGroup label="Clinic Address">
                        <Input name="clinic_address" value={formData.clinic_address} onChange={handleChange} disabled={!isEditing} />
                    </FormGroup>
                </div>
            </div>

            {/* Dynamic Buttons */}
            <div className="flex justify-start mt-4 gap-4">
                {!isEditing ? (
                    <SaveButton text="Edit" colorClass="bg-blue-600 hover:bg-blue-700" onClick={() => setIsEditing(true)} />
                ) : (
                    <>
                        {hasChanges && (
                            <SaveButton text="Update Information" colorClass="bg-[#4A7C59] hover:bg-[#3a6146]" onClick={handleSave} />
                        )}
                        <SaveButton text="Don't Update" colorClass="bg-red-500 hover:bg-red-600" onClick={handleCancel} />
                    </>
                )}
            </div>
        </div>
    );
};

export default PersonalInformationForm;