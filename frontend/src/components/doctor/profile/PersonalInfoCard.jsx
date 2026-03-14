import React from 'react';
import { Mail, Phone, Globe } from 'lucide-react';

const PersonalInfoCard = ({ email, phone, languages }) => {
    return (
        <section>
            <h4 className="mb-4">Personal Information</h4>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-5">
                <div>
                    <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-[0.5px] mb-1">Email Address</p>
                    <p className="text-[16px] font-medium text-gray-800 flex items-center gap-2"><Mail size={16} className="text-[#4A7C59]" /> {email}</p>
                </div>
                <div>
                    <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-[0.5px] mb-1">Phone Number</p>
                    <p className="text-[16px] font-medium text-gray-800 flex items-center gap-2"><Phone size={16} className="text-[#4A7C59]" /> {phone || '+1 (555) 000-0000'}</p>
                </div>
                <div>
                    <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-[0.5px] mb-1">Languages</p>
                    <p className="text-[16px] font-medium text-gray-800 flex items-center gap-2"><Globe size={16} className="text-[#4A7C59]" /> {languages.join(', ')}</p>
                </div>
            </div>
        </section>
    );
};

export default PersonalInfoCard;