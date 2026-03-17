// frontend/src/pages/doctor/DoctorSettings.jsx
import React, { useState, useEffect } from 'react';
import { doctorApi } from '../../api/doctorApi';

import PersonalInformationForm from '../../components/doctor/settings/PersonalInformationForm';
import ProfessionalCredentialsForm from '../../components/doctor/settings/ProfessionalCredentialsForm';
import PreferencesForm from '../../components/doctor/settings/PreferencesForm';
import ConsultationLogisticsForm from '../../components/doctor/settings/ConsultationLogisticsForm';
import PhilosophyOfCareForm from '../../components/doctor/settings/PhilosophyOfCareForm';
import AccountSecurityForm from '../../components/doctor/settings/AccountSecurityForm';

const generateStaticSettingsData = () => ({
    full_name: 'Dr. Ananya Sharma',
    email: 'ananya.sharma@ayurcare360.com',
    phone: '+91 98765 43210',
    languages: 'English, Hindi, Sanskrit',
    clinic_address: '12th Floor, Wellness Tower, MG Road, Bangalore, Karnataka - 560001',
    specialization: 'Panchakarma & Holistic Healing',
    experience_years: 12,
    qualifications: 'BAMS, MD (Ayurveda)',
    registration_number: 'KMC-AYU-88291',
    publications: 'Journal of Ayurvedic Medicine (2021), Holistic Living Today',
    consultation_fee: 1200,
    start_time: '09:00 AM',
    end_time: '05:00 PM',
    availability_days: { Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: false, Sun: false },
    preferences: {
        push_notifications: true,
        dual_time: false,
        hd_video: true,
        public_profile: true
    },
    bio: "I believe in treating the root cause of illness rather than just the symptoms. My practice is centered on the principles of Tridosha balance, utilizing natural herbal remedies and lifestyle adjustments to restore the body's innate intelligence for healing. Every patient journey is unique, and I strive to provide personalized care that integrates ancient wisdom with modern diagnostic precision."
});

const DoctorSettings = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [settingsData, setSettingsData] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await doctorApi.getProfile();
                if (res && res.profile) {
                    setSettingsData(res.profile);
                } else {
                    setSettingsData(generateStaticSettingsData());
                }
            } catch (error) {
                console.warn("API fetch failed. Loading static fallback data for testing.");
                setSettingsData(generateStaticSettingsData());
            } finally {
                setIsLoading(false);
            }
        };

        fetchSettings();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[60vh] bg-[#FDF9EE]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A7C59]"></div>
            </div>
        );
    }

    if (!settingsData) return null;

    return (
        <div className="max-w-[1600px] mx-auto p-10 bg-[#FDF9EE] min-h-full flex flex-col gap-8">
            <div>
                <h1 className="text-5xl font-extrabold text-gray-900 mb-3">Settings</h1>
                <p className='text-lg'>Manage your clinical profile, credentials, and consultation preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                {/* --- ROW 1 --- */}
                <PersonalInformationForm data={settingsData} />
                <PreferencesForm data={settingsData} />

                {/* --- ROW 2 --- */}
                <ProfessionalCredentialsForm data={settingsData} />
                <ConsultationLogisticsForm data={settingsData} />

                {/* --- ROW 3 --- (Spans full width) */}
                <div className="lg:col-span-2">
                    <PhilosophyOfCareForm data={settingsData} />
                </div>

                {/* --- ROW 4 --- (Spans full width) */}
                <div className="lg:col-span-2">
                    <AccountSecurityForm />
                </div>

            </div>
        </div>
    );
};

export default DoctorSettings;