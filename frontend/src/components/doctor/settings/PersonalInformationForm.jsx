// frontend/src/components/doctor/settings/PersonalInformationForm.jsx
import React, { useState } from 'react';
import { User } from 'lucide-react';
import { FormGroup, Input, SaveButton, CardHeader } from './SettingsUI';

const PersonalInformationForm = ({ data }) => {
    const [formData, setFormData] = useState({
        full_name: data?.full_name || '',
        email: data?.email || '',
        phone: data?.phone || '',
        languages: Array.isArray(data?.languages) ? data.languages.join(', ') : data?.languages || '',
        clinic_address: data?.clinic_address || ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <CardHeader icon={User} title="Personal Information" iconColor="text-[#4A7C59]" iconBg="bg-[#4A7C59]/10" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">

                {/* Row 1: Full Name and Phone Number */}
                <FormGroup label="Full Name">
                    <Input name="full_name" value={formData.full_name} onChange={handleChange} />
                </FormGroup>
                <FormGroup label="Phone Number">
                    <Input name="phone" value={formData.phone} onChange={handleChange} />
                </FormGroup>

                {/* Row 2: Email Address and Languages */}
                <FormGroup label="Email Address">
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                </FormGroup>
                <FormGroup label="Languages">
                    <Input name="languages" value={formData.languages} onChange={handleChange} />
                </FormGroup>

                {/* Row 3: Clinic Address */}
                <div className="md:col-span-2">
                    <FormGroup label="Clinic Address">
                        <Input name="clinic_address" value={formData.clinic_address} onChange={handleChange} />
                    </FormGroup>
                </div>

            </div>

            {/* Left Aligned Button */}
            <div className="flex justify-start mt-2">
                <SaveButton
                    text="Update Information"
                    colorClass="bg-[#4A7C59] hover:bg-[#3a6146]"
                    onClick={() => console.log('Saving:', formData)}
                />
            </div>
        </div>
    );
};

export default PersonalInformationForm;