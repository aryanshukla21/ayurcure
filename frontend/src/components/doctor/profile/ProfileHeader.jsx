import React from 'react';
import { MapPin, Star, Edit2 } from 'lucide-react';

const ProfileHeader = ({ profile }) => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start mb-8">
            <div className="flex gap-6 items-center">
                <div className="w-24 h-24 rounded-full bg-[#4A7C59] text-white flex items-center justify-center text-[36px] font-bold shadow-sm">
                    {profile.full_name?.charAt(0).toUpperCase() || 'D'}
                </div>
                <div>
                    <h2>{profile.full_name}</h2>
                    <p className="text-[16px] text-[#4A7C59] font-medium mt-1 mb-2">{profile.specialization || 'Senior Ayurvedic Consultant'}</p>
                    <div className="flex items-center gap-4 text-[14px] text-gray-500">
                        <span className="flex items-center gap-1.5"><MapPin size={16} /> {profile.location || 'AyurCare Wellness Center'}</span>
                        <span className="flex items-center gap-1.5 text-yellow-500 font-medium">
                            <Star size={16} fill="currentColor" /> {profile.average_rating || '4.9'} <span className="text-gray-400 font-normal">({profile.total_reviews || 0} Reviews)</span>
                        </span>
                    </div>
                </div>
            </div>
            <button className="btn-primary bg-white text-[#4A7C59] border border-[#4A7C59] hover:bg-green-50 shadow-sm">
                <Edit2 size={16} /> Edit Profile
            </button>
        </div>
    );
};

export default ProfileHeader;