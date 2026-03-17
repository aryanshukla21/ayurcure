// frontend/src/components/doctor/settings/AccountSecurityForm.jsx
import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { FormGroup, Input, SaveButton, CardHeader } from './SettingsUI';

const AccountSecurityForm = () => {
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

    const handleChange = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

    return (
        <div className="bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100">
            <CardHeader
                icon={ShieldCheck}
                title="Account Security"
                description="Keep your account secure by using a strong, unique password and updating it regularly."
                iconColor="text-rose-600"
                iconBg="bg-rose-50"
                titleColor='text-white'
            />

            {/* Displaying inputs in 3 columns for full-width layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <FormGroup label="Current Password">
                    <Input type="password" name="current" placeholder="••••••••" value={passwords.current} onChange={handleChange} />
                </FormGroup>
                <FormGroup label="New Password">
                    <Input type="password" name="new" placeholder="••••••••" value={passwords.new} onChange={handleChange} />
                </FormGroup>
                <FormGroup label="Confirm New Password">
                    <Input type="password" name="confirm" placeholder="••••••••" value={passwords.confirm} onChange={handleChange} />
                </FormGroup>
            </div>

            <div className="flex justify-end mt-4">
                <SaveButton text="Update Password" colorClass="bg-green-300 hover:bg-green-700" textColor="text-black" onClick={() => console.log('Updating Password')} />
            </div>
        </div>
    );
};
export default AccountSecurityForm;