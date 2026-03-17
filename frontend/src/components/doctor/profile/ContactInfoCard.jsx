import React from 'react';
import { Phone } from 'lucide-react';

const ContactInfoCard = ({ profile }) => {
    return (
        <div className="bg-[#FDF9EE] border border-[#EBE3D0] rounded-3xl p-8 shadow-sm flex flex-col min-h-[420px]">
            <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                    <Phone size={20} />
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900">Contact Info</h3>
            </div>

            <div className="flex-1 flex flex-col gap-8">
                <div>
                    <p className="text-sm text-amber-900 font-bold uppercase tracking-widest mb-2">Phone</p>
                    <p className="text-gray-900 font-bold text-lg">{profile.phone || 'N/A'}</p>
                </div>
                <div>
                    <p className="text-sm text-amber-900 font-bold uppercase tracking-widest mb-2">Email</p>
                    <p className="text-gray-900 font-bold text-lg break-all">{profile.email || 'N/A'}</p>
                </div>
                <div>
                    <p className="text-sm text-amber-900 font-bold uppercase tracking-widest mb-3">Languages</p>
                    <div className="flex flex-wrap gap-2">
                        {(profile.languages || []).map((lang, idx) => (
                            <span key={idx} className="bg-white text-gray-700 px-5 py-2 rounded-full text-lg font-bold shadow-sm">
                                {lang}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfoCard;