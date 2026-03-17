// frontend/src/components/doctor/profile/ProfileHeaderCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Edit3 } from 'lucide-react';

const ProfileHeaderCard = ({ profile }) => {
    // Generate a clean fallback name for the avatar API
    const firstName = profile.full_name ? profile.full_name.split(' ')[0] : 'Doctor';

    return (
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-stretch gap-10 relative">

            {/* Profile Photo - Precisely 1/3 width, perfect square */}
            <div className="w-full sm:w-1/3 max-w-[280px] aspect-square rounded-2xl bg-gray-100 overflow-hidden border border-gray-100 flex-shrink-0">
                <img
                    src={`https://ui-avatars.com/api/?name=${firstName}&background=F3F4F6&color=4A7C59&size=400`}
                    alt={profile.full_name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col py-2 relative">

                {/* Edit Profile Button - Made Larger & Anchored precisely */}
                <div className="absolute top-0 right-0">
                    <Link
                        to="/doctor/settings"
                        className="bg-[#4A7C59] hover:bg-[#3a6146] text-white px-8 py-3.5 rounded-full font-bold transition-colors flex items-center gap-2.5 shadow-md text-base"
                    >
                        <Edit3 size={18} />
                        <span>Edit Profile</span>
                    </Link>
                </div>

                {/* Name & Title - Added pr-48 to prevent overlap with the larger button */}
                <div className="mb-10 pr-48">
                    <h1 className="text-5xl leading-tight font-extrabold text-gray-900 mb-5">
                        {profile.full_name || 'Dr. Arjan Varma'}
                    </h1>

                    <div className="flex items-center gap-2 text-green-700 font-bold text-2xl">
                        <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                        <span>{profile.specialization || 'Senior Ayurvedic Specialist'}</span>
                    </div>
                </div>

                {/* Bottom Stats Row - Pushed to bottom using mt-auto */}
                <div className="flex flex-wrap items-center gap-14 mt-auto">
                    <div>
                        <p className="text-lg text-gray-400 font-bold uppercase tracking-widest mb-1.5">Registration</p>
                        <p className="text-amber-900 font-extrabold text-xl">
                            {profile.registration_number || '#AYU-9021'}
                        </p>
                    </div>
                    <div>
                        <p className="text-lg text-gray-400 font-bold uppercase tracking-widest mb-1.5">Rating</p>
                        <p className="text-gray-900 font-extrabold text-xl flex items-center gap-1.5">
                            <Star size={20} className="fill-gray-900 text-gray-900" />
                            {profile.average_rating || '4.9'}
                        </p>
                    </div>
                    <div>
                        <p className="text-lg text-gray-400 font-bold uppercase tracking-widest mb-1.5">Status</p>
                        <p className="font-extrabold text-xl bg-[#d6e3da] p-2 rounded-3xl text-[#4A7C59]">
                            {profile.verification_status || 'Active'}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfileHeaderCard;