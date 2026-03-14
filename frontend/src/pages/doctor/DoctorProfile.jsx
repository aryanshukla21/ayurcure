import React, { useState, useEffect } from 'react';
import { Search, Bell } from 'lucide-react';
import Sidebar from '../../components/common/Sidebar';
import { doctorApi } from '../../api/doctorApi';

// Sub-components
import ProfileHeader from '../../components/doctor/profile/ProfileHeader';
import PersonalInfoCard from '../../components/doctor/profile/PersonalInfoCard';
import CredentialsCard from '../../components/doctor/profile/CredentialsCard';
import ClinicHoursCard from '../../components/doctor/profile/ClinicHoursCard';
import SpecialtiesCard from '../../components/doctor/profile/SpecialtiesCard';
import NextAppointmentCard from '../../components/doctor/profile/NextAppointmentCard';

const DoctorProfile = () => {
    const [profile, setProfile] = useState(null);
    const [nextAppointment, setNextAppointment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Fetch profile and all appointments concurrently
                const [profileRes, appointmentsRes] = await Promise.all([
                    doctorApi.getProfile(),
                    doctorApi.getAllAppointments()
                ]);

                setProfile(profileRes.profile);

                // Find the closest upcoming appointment
                const now = new Date();
                const upcoming = appointmentsRes.appointments
                    .filter(app => new Date(app.start_time || app.scheduled_at) > now && app.status !== 'Cancelled')
                    .sort((a, b) => new Date(a.start_time || a.scheduled_at) - new Date(b.start_time || b.scheduled_at));

                if (upcoming.length > 0) {
                    setNextAppointment(upcoming[0]);
                }

            } catch (error) {
                console.error("Failed to fetch doctor profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    if (loading || !profile) {
        return <div className="flex h-screen items-center justify-center font-sans text-[16px] text-[#4A7C59]">Loading profile...</div>;
    }

    // Safely parse arrays/JSON from the database
    const languages = Array.isArray(profile.languages) ? profile.languages : ['English', 'Hindi', 'Sanskrit'];
    const subSpecializations = Array.isArray(profile.sub_specializations) && profile.sub_specializations.length > 0
        ? profile.sub_specializations
        : ['Panchakarma', 'Herbal Medicine', 'Diet & Lifestyle', 'Pulse Diagnosis'];
    const certifications = Array.isArray(profile.certifications) && profile.certifications.length > 0
        ? profile.certifications
        : ['BAMS Certified', `${profile.experience_years || 5}+ years Clinical Practice`, 'National Ayurveda Board Member'];

    return (
        <div className="flex h-screen bg-[#FAF8F5] font-sans text-gray-800">
            <Sidebar activePath="profile" />

            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Top Header */}
                <header className="h-[72px] px-8 flex items-center justify-between bg-[#FAF8F5] border-b border-gray-200 shrink-0">
                    <div className="flex items-center bg-white px-4 py-2 rounded-full w-96 shadow-sm">
                        <Search size={18} className="text-gray-400" />
                        <input type="text" placeholder="Search patient records..." className="ml-2 outline-none bg-transparent w-full font-sans text-[14px] md:text-[16px] font-normal" />
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="text-gray-500 hover:text-gray-700 relative">
                            <Bell size={20} />
                        </button>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8">

                    {/* Main Profile Header Card Component */}
                    <ProfileHeader profile={profile} />

                    <div className="grid grid-cols-3 gap-8">
                        {/* Left Column (Spans 2/3) */}
                        <div className="col-span-2 flex flex-col gap-8">

                            {/* About the Doctor */}
                            <section>
                                <h3 className="mb-4">About the Doctor</h3>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <p className="text-[16px] text-gray-600 leading-[1.8] italic">
                                        "{profile.bio || `Committed to delivering evidence-based ayurvedic care with a patient-centered approach. Specializing in advanced holistic management, I believe that healing is a partnership between traditional science and modern empathy.`}"
                                    </p>
                                </div>
                            </section>

                            <div className="grid grid-cols-2 gap-8">
                                <PersonalInfoCard email={profile.email} phone={profile.phone} languages={languages} />
                                <CredentialsCard certifications={certifications} />
                            </div>
                            <div>
                                <SpecialtiesCard subSpecializations={subSpecializations} />
                            </div>
                        </div>

                        {/* Right Column (Spans 1/2) */}
                        <div className="col-span-1 flex flex-col gap-8">
                            <ClinicHoursCard />
                            <NextAppointmentCard nextAppointment={nextAppointment} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DoctorProfile;