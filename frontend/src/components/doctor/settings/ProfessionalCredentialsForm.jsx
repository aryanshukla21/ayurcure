// frontend/src/components/doctor/settings/ProfessionalCredentialsForm.jsx
import React, { useState } from 'react';
import { Award } from 'lucide-react';
import { FormGroup, Input, SaveButton, CardHeader } from './SettingsUI';

const ProfessionalCredentialsForm = ({ data }) => {
    const [formData, setFormData] = useState({
        specialization: data?.specialization || '',
        experience: data?.experience_years ? `${data.experience_years}+ Years` : '',
        qualifications: data?.qualifications || '',
        registration: data?.registration_number || '',
        publications: data?.publications || ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="bg-[#faf2dc] rounded-3xl p-8 shadow-sm border border-gray-100">
            <CardHeader icon={Award} title="Professional Credentials" iconColor="text-blue-600" iconBg="bg-blue-50" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <FormGroup label="Specialization">
                    <Input name="specialization" value={formData.specialization} onChange={handleChange} />
                </FormGroup>
                <FormGroup label="Experience">
                    <Input name="experience" value={formData.experience} onChange={handleChange} />
                </FormGroup>
                <FormGroup label="Qualifications">
                    <Input name="qualifications" value={formData.qualifications} onChange={handleChange} />
                </FormGroup>
                <FormGroup label="Registration">
                    <Input name="registration" value={formData.registration} onChange={handleChange} />
                </FormGroup>
                <div className="md:col-span-2">
                    <FormGroup label="Publications">
                        <Input name="publications" value={formData.publications} onChange={handleChange} />
                    </FormGroup>
                </div>
            </div>
            <div className="flex mt-2">
                <SaveButton text="Update Credentials" colorClass="bg-[#4A7C59] hover:bg-[#3a6146]" onClick={() => console.log('Saving:', formData)} />
            </div>
        </div>
    );
};
export default ProfessionalCredentialsForm;