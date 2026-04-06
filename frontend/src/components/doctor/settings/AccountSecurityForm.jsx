import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { FormGroup, Input, SaveButton, CardHeader } from './SettingsUI';

const AccountSecurityForm = () => {
    const initialPasswords = { current: '', new: '', confirm: '' };
    const [passwords, setPasswords] = useState(initialPasswords);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

    // Assuming the user has a change if any of the password fields are typed in
    const hasChanges = passwords.current !== '' || passwords.new !== '' || passwords.confirm !== '';

    const handleSave = () => {
        console.log('Updating Password');
        setIsEditing(false);
        setPasswords(initialPasswords); // Wipe input after save
    };

    const handleCancel = () => {
        setPasswords(initialPasswords);
        setIsEditing(false);
    };

    return (
        <div className="bg-gray-900 rounded-3xl px-8 py-6 shadow-sm border border-gray-100">
            <CardHeader
                icon={ShieldCheck}
                title="Account Security"
                description="Keep your account secure by using a strong, unique password and updating it regularly."
                iconColor="text-rose-600"
                iconBg="bg-rose-50"
                titleColor='text-white'
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <FormGroup label="Current Password">
                    <Input type="password" name="current" placeholder="••••••••" value={passwords.current} onChange={handleChange} disabled={!isEditing} />
                </FormGroup>
                <FormGroup label="New Password">
                    <Input type="password" name="new" placeholder="••••••••" value={passwords.new} onChange={handleChange} disabled={!isEditing} />
                </FormGroup>
                <FormGroup label="Confirm New Password">
                    <Input type="password" name="confirm" placeholder="••••••••" value={passwords.confirm} onChange={handleChange} disabled={!isEditing} />
                </FormGroup>
            </div>

            <div className="flex justify-end mt-6 gap-4">
                {!isEditing ? (
                    <SaveButton text="Edit" colorClass="bg-blue-600 hover:bg-blue-700" onClick={() => setIsEditing(true)} />
                ) : (
                    <>
                        {hasChanges && (
                            <SaveButton text="Update Password" colorClass="bg-green-300 hover:bg-green-700" textColor="text-black" onClick={handleSave} />
                        )}
                        <SaveButton text="Don't Update" colorClass="bg-red-500 hover:bg-red-600" onClick={handleCancel} />
                    </>
                )}
            </div>
        </div>
    );
};
export default AccountSecurityForm;