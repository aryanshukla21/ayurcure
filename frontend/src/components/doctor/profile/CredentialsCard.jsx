import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const CredentialsCard = ({ certifications }) => {
    return (
        <section>
            <h4 className="mb-4">Professional Credentials</h4>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
                {certifications.map((cert, index) => (
                    <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                        <div className="mt-0.5"><CheckCircle2 size={18} className="text-[#4A7C59]" /></div>
                        <p className="text-[16px] font-medium text-gray-800 leading-[1.4]">{cert}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CredentialsCard;