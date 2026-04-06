import React, { useState } from 'react';
import { Award } from 'lucide-react';
import { FormGroup, Input, SaveButton, CardHeader } from './SettingsUI';

const ProfessionalCredentialsForm = ({ data }) => {
    const initialData = {
        specialization: data?.specialization || '',
        experience: data?.experience_years ? `${data.experience_years}+ Years` : '',
        qualifications: data?.qualifications || '',
        registration: data?.registration_number || '',
        publications: data?.publications || ''
    };

    const [formData, setFormData] = useState(initialData);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
        <div className="bg-[#faf2dc] rounded-3xl p-8 shadow-sm border border-gray-100">
            <CardHeader icon={Award} title="Professional Credentials" iconColor="text-blue-600" iconBg="bg-blue-50" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <FormGroup label="Specialization">
                    <Input name="specialization" value={formData.specialization} onChange={handleChange} disabled={!isEditing} />
                </FormGroup>
                <FormGroup label="Experience">
                    <Input name="experience" value={formData.experience} onChange={handleChange} disabled={!isEditing} />
                </FormGroup>
                <FormGroup label="Qualifications">
                    <Input name="qualifications" value={formData.qualifications} onChange={handleChange} disabled={!isEditing} />
                </FormGroup>
                <FormGroup label="Registration">
                    <Input name="registration" value={formData.registration} onChange={handleChange} disabled={!isEditing} />
                </FormGroup>
                <div className="md:col-span-2">
                    <FormGroup label="Publications">
                        <Input name="publications" value={formData.publications} onChange={handleChange} disabled={!isEditing} />
                    </FormGroup>
                </div>
            </div>

            <div className="flex justify-start mt-4 gap-4">
                {!isEditing ? (
                    <SaveButton text="Edit" colorClass="bg-blue-600 hover:bg-blue-700" onClick={() => setIsEditing(true)} />
                ) : (
                    <>
                        {hasChanges && (
                            <SaveButton text="Update Credentials" colorClass="bg-[#4A7C59] hover:bg-[#3a6146]" onClick={handleSave} />
                        )}
                        <SaveButton text="Don't Update" colorClass="bg-red-500 hover:bg-red-600" onClick={handleCancel} />
                    </>
                )}
            </div>
        </div>
    );
};
export default ProfessionalCredentialsForm;