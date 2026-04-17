import React, { useState, useEffect } from 'react';
import { patientApi } from '../../api/patientApi';
import PatientProfileSummary from '../../components/patient/dashboard/PatientProfileSummary';
import UpcomingAppointmentCard from '../../components/patient/dashboard/UpcomingAppointmentCard';
import WeightTracker from '../../components/patient/dashboard/WeightTracker';
import WellnessActivity from '../../components/patient/dashboard/WellnessActivity';
import MedicalHistory from '../../components/patient/dashboard/MedicalHistory';
import QuickMetrics from '../../components/patient/dashboard/QuickMetrics';

const PatientDashboard = () => {
  // Granular Data States
  const [profile, setProfile] = useState(null);
  const [upcoming, setUpcoming] = useState(null);
  const [weightData, setWeightData] = useState(null);
  const [activity, setActivity] = useState(null);
  const [history, setHistory] = useState(null);
  const [metrics, setMetrics] = useState(null);

  // Independent fetchers inside useEffect
  useEffect(() => {
    patientApi.getDashPatientDetails()
      .then(data => setProfile(data))
      .catch(err => console.error("Profile fetch failed", err));

    patientApi.getDashUpcomingSession()
      .then(data => setUpcoming(data))
      .catch(err => console.error("Upcoming fetch failed", err));

    patientApi.getDashWeightTracker()
      .then(data => setWeightData(data))
      .catch(err => console.error("Weight fetch failed", err));

    patientApi.getDashWellnessActivity()
      .then(data => setActivity(data))
      .catch(err => console.error("Activity fetch failed", err));

    patientApi.getDashMedicalHistory()
      .then(data => setHistory(data))
      .catch(err => console.error("History fetch failed", err));

    patientApi.getDashQuickMetrics()
      .then(data => setMetrics(data))
      .catch(err => console.error("Metrics fetch failed", err));
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto p-10 bg-[#FDF9EE] min-h-full">
      {/* Top Row: Profile & Appointment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2">
          {/* Passing null initially allows the child component to show its own skeleton/loading state */}
          <PatientProfileSummary profile={profile || {}} isLoading={!profile} />
        </div>
        <div className="lg:col-span-1">
          <UpcomingAppointmentCard appointment={upcoming} isLoading={upcoming === null} />
        </div>
      </div>

      {/* Middle Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <WeightTracker weightData={weightData || { labels: [] }} isLoading={!weightData} />
        <WellnessActivity activityData={activity || []} isLoading={!activity} />
      </div>

      {/* Bottom Row: Medical History & Metrics */}
      <div className="flex flex-col gap-8 pb-2">
        <MedicalHistory history={history || {}} isLoading={!history} />
        <QuickMetrics metrics={metrics || []} isLoading={!metrics} />
      </div>
    </div>
  );
};

export default PatientDashboard;