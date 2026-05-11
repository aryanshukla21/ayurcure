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
  const [location, setLocation] = useState(null);
  const [upcoming, setUpcoming] = useState(null);
  const [weightData, setWeightData] = useState(null);
  const [activity, setActivity] = useState(null);
  const [history, setHistory] = useState(null);
  const [metrics, setMetrics] = useState(null);

  // EXPLICIT Loading States (Resolves the infinite loading & latency bug)
  const [loading, setLoading] = useState({
    profile: true,
    upcoming: true,
    weight: true,
    activity: true,
    history: true,
    metrics: true
  });

  useEffect(() => {
    // 1. Profile & Location (Fetched together as they share the top component)
    Promise.all([
      patientApi.getDashPatientDetails().catch(() => null),
      patientApi.getProfileContact().catch(() => null)
    ]).then(([profileData, contactData]) => {
      if (profileData) setProfile(profileData);
      if (contactData && contactData.address) {
        const parts = contactData.address.split(',');
        setLocation(parts.length > 1 ? parts[1].trim() : contactData.address);
      }
      setLoading(prev => ({ ...prev, profile: false }));
    });

    // 2. Upcoming Appointment (Independent)
    patientApi.getDashUpcomingSession()
      .then(data => {
        // Protect against empty arrays or objects returned by backend
        if (!data || (Array.isArray(data) && data.length === 0)) {
          setUpcoming(null);
        } else {
          setUpcoming(data);
        }
      })
      .catch(() => setUpcoming(null))
      .finally(() => setLoading(prev => ({ ...prev, upcoming: false })));

    // 3. Weight Tracker (Independent)
    patientApi.getDashWeightTracker()
      .then(data => setWeightData(data))
      .catch(() => setWeightData([]))
      .finally(() => setLoading(prev => ({ ...prev, weight: false })));

    // 4. Wellness Activity (Independent)
    patientApi.getDashWellnessActivity()
      .then(data => setActivity(data))
      .catch(() => setActivity([]))
      .finally(() => setLoading(prev => ({ ...prev, activity: false })));

    // 5. Medical History (Independent)
    patientApi.getDashMedicalHistory()
      .then(data => setHistory(data))
      .catch(() => setHistory({}))
      .finally(() => setLoading(prev => ({ ...prev, history: false })));

    // 6. Quick Metrics (Independent)
    patientApi.getDashQuickMetrics()
      .then(data => setMetrics(data))
      .catch(() => setMetrics([]))
      .finally(() => setLoading(prev => ({ ...prev, metrics: false })));

  }, []);

  return (
    <div className="max-w-[1600px] mx-auto p-10 bg-[#FDF9EE] min-h-full">
      {/* Top Row: Profile & Appointment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2">
          <PatientProfileSummary
            profile={profile || {}}
            location={location}
            isLoading={loading.profile}
          />
        </div>
        <div className="lg:col-span-1">
          {/* Using the explicit boolean fixes the continuous skeleton load */}
          <UpcomingAppointmentCard
            appointment={upcoming}
            isLoading={loading.upcoming}
          />
        </div>
      </div>

      {/* Middle Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <WeightTracker
          weightData={weightData || []}
          profileWeight={profile?.weight_kg}
          isLoading={loading.weight}
        />
        <WellnessActivity
          activityData={activity || []}
          isLoading={loading.activity}
        />
      </div>

      {/* Bottom Row: Medical History & Metrics */}
      <div className="flex flex-col gap-8 pb-2">
        <MedicalHistory
          history={history || {}}
          isLoading={loading.history}
        />
        <QuickMetrics
          metrics={metrics || []}
          isLoading={loading.metrics}
        />
      </div>
    </div>
  );
};

export default PatientDashboard;