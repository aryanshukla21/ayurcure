import React, { useState, useEffect } from 'react';
import { doctorApi } from '../../api/doctorApi';

import ProfileHeaderCard from '../../components/doctor/profile/ProfileHeaderCard';
import ConsultationFeeCard from '../../components/doctor/profile/ConsultationFeeCard';
import ContactInfoCard from '../../components/doctor/profile/ContactInfoCard';
import CredentialsCard from '../../components/doctor/profile/CredentialsCard';
import PhilosophyCard from '../../components/doctor/profile/PhilosophyCard';

// Static fallback data for testing when not logged in
const generateStaticProfileData = () => ({
    full_name: 'Dr. Arjan Varma',
    specialization: 'Senior Ayurvedic Specialist',
    registration_number: '#AYU-9021',
    average_rating: 4.9,
    verification_status: 'Active',
    phone: '+91 98765 43210',
    email: 'arjan.varma@ayurcare.com',
    languages: ['English', 'Hindi', 'Sanskrit'],
    consultation_fee: 250.00,
    availability_summary: 'Mon - Fri, 9:00 AM - 5:00 PM',
    qualifications: 'BAMS, MD in Ayurveda',
    experience_years: 15,
    publications_count: 20,
    bio: 'Dr. Arjan Varma is dedicated to the ancient wisdom of holistic healing. With over a decade of clinical excellence, he specializes in synchronizing herbal medicine with modern diagnostics to restore balance in the Doshas. His approach treats the person, not just the symptom, fostering long-term vitality through nature-aligned lifestyle shifts.'
});

const DoctorProfile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await doctorApi.getProfile();
                if (res && res.profile) {
                    setProfile(res.profile);
                } else {
                    setProfile(generateStaticProfileData());
                }
            } catch (error) {
                console.warn("API fetch failed. Loading dynamic fallback data.");
                setProfile(generateStaticProfileData());
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[60vh] bg-[#FDF9EE]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A7C59]"></div>
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="max-w-[1600px] mx-auto p-10 bg-[#FDF9EE] min-h-full flex flex-col gap-8">

            {/* Top Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <ProfileHeaderCard profile={profile} />
                <ConsultationFeeCard profile={profile} />
            </div>

            {/* Middle Row - Cards are now taller */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ContactInfoCard profile={profile} />
                <CredentialsCard profile={profile} />
                <PhilosophyCard profile={profile} />
            </div>

        </div>
    );
};

export default DoctorProfile;