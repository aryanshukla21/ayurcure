import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Edit3 } from 'lucide-react';

const ProfileHeaderCard = ({ profile }) => {
    if (!profile) return null;

    const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Doctor';
    const firstName = profile.first_name || 'Doctor';
    const avatarUrl = profile.profile_image_url || `https://ui-avatars.com/api/?name=${firstName}&background=F3F4F6&color=4A7C59&size=400`;

    return (
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-stretch gap-10 relative h-64">
            {/* Profile Photo */}
            <div className="w-36 sm:w-1/3 max-w-[280px] h-44 aspect-square rounded-2xl bg-gray-100 overflow-hidden border border-gray-100 flex-shrink-0">
                <img
                    src={avatarUrl}
                    alt={fullName}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col py-2 relative">
                {/* Edit Profile Button */}
                <div className="absolute top-0 right-0">
                    <Link
                        to="/doctor/settings"
                        className="bg-[#4A7C59] hover:bg-[#3a6146] text-white px-8 py-3.5 rounded-full font-bold transition-colors flex items-center gap-2.5 shadow-md text-base"
                    >
                        <Edit3 size={18} />
                        <span>Edit Profile</span>
                    </Link>
                </div>

                {/* Name & Title */}
                <div className="mb-10 pr-48">
                    <h1 className="text-3xl leading-tight font-extrabold text-gray-900 mb-5">
                        Dr. {fullName}
                    </h1>

                    <div className="flex items-center gap-2 text-green-700 font-bold text-lg">
                        <span className="w-2.5 h-2.5 rounded-full bg-gray-400 mx-3"></span>
                        <span>{profile.specialization || 'Specialist'}</span>
                    </div>
                </div>

                {/* Bottom Stats Row */}
                <div className="flex flex-wrap items-center gap-14 mt-auto">
                    <div>
                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-1.5">Status</p>
                        <p className="font-extrabold text-xs text-center bg-[#d6e3da] rounded-3xl text-[#4A7C59] px-3 py-1">
                            Active
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-1.5">Experience</p>
                        <p className="font-extrabold text-xs text-center bg-blue-50 rounded-3xl text-blue-600 px-3 py-1">
                            {profile.experience_years ? `${profile.experience_years} Years` : 'N/A'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeaderCard;