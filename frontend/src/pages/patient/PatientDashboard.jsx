import React, { useState, useEffect } from 'react';
import { patientApi } from '../../api/patientApi';
import PatientProfileSummary from '../../components/patient/dashboard/PatientProfileSummary';
import UpcomingAppointmentCard from '../../components/patient/dashboard/UpcomingAppointmentCard';
import WeightTracker from '../../components/patient/dashboard/WeightTracker';
import WellnessActivity from '../../components/patient/dashboard/WellnessActivity';
import MedicalHistory from '../../components/patient/dashboard/MedicalHistory';
import QuickMetrics from '../../components/patient/dashboard/QuickMetrics';
import { Loader2 } from 'lucide-react';

// EXACT DATA FROM THE PDF FOR TESTING
const mockPdfData = {
  profile: {
    name: "Rohan Sharma",
    constitution: "Vata-Pitta",
    age: 32,
    gender: "Male",
    bloodGroup: "O Positive",
    knownConditions: "Seasonal Allergies",
    location: "Mumbai, India",
    lastCheckup: "12 days ago",
    status: "ACTIVE CARE"
  },
  upcomingAppointment: {
    _id: 'apt_123',
    doctorId: 'doc_101',
    doctorName: "Dr. Ananya Sharma",
    specialty: "Ayurvedic Consultant",
    date: "2023-10-28",
    time: "10:30 AM",
    type: "video"
  },
  weightTracking: {
    currentWeight: 74.5,
    unit: 'kg',
    trend: 'down',
    trendValue: 0.8,
    labels: ['Aug', 'Sep', 'Oct']
  },
  wellnessActivity: [
    { day: 'Mon', yoga: 60, meditation: 40 },
    { day: 'Tue', yoga: 40, meditation: 60 },
    { day: 'Wed', yoga: 70, meditation: 30 },
    { day: 'Thu', yoga: 30, meditation: 70 },
    { day: 'Fri', yoga: 50, meditation: 50 },
    { day: 'Sat', yoga: 80, meditation: 20 },
    { day: 'Sun', yoga: 20, meditation: 80 },
  ],
  medicalHistory: {
    pastDiagnoses: [
      { name: "Acute Gastritis", date: "Jan 2022" },
      { name: "Vitamin D Deficiency", date: "Aug 2021" }
    ],
    surgeries: [
      { name: "Appendectomy", date: "March 2015" }
    ],
    chronicConditions: [
      { name: "Seasonal Allergies (Dust/Pollen)", severe: true },
      { name: "Mild Hypertension (Under Control)", severe: false }
    ],
    doctorsNote: "Patient exhibits a strong Vata-Pitta constitution. History suggests sensitivity to seasonal changes and digestive fluctuations. Recommended to maintain a consistent Ritucharya (seasonal routine)."
  },
  quickMetrics: [
    { title: 'Next Medication', value: 'Triphala Guggulu', subtitle: 'In 45 minutes', type: 'medication' },
    { title: 'Hydration Goal', value: '1.8L / 2.5L', subtitle: '72% Completed', type: 'hydration' },
    { title: 'Sleep Quality', value: 'Deep Sleep', subtitle: '7h 20m last night', type: 'sleep' },
  ]
};

const PatientDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Try to fetch real dynamic data
        const response = await patientApi.getDashboardData();
        setDashboardData(response.data || response);
      } catch (error) {
        console.warn("Backend fetch failed. Falling back to static PDF data for testing.", error);
        // If it fails, populate with our rich static data
        setDashboardData(mockPdfData);
        setIsUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FDF9EE]">
        <Loader2 className="w-10 h-10 text-green-700 animate-spin" />
      </div>
    );
  }

  // Destructure the data
  const {
    profile = {},
    upcomingAppointment = null,
    weightTracking = {},
    wellnessActivity = [],
    medicalHistory = {},
    quickMetrics = []
  } = dashboardData || {};

  return (
    // MATCHED DOCTOR CSS: max-w-[1600px] mx-auto p-10 bg-[#FDF9EE] min-h-full
    <div className="max-w-[1600px] mx-auto p-10 bg-[#FDF9EE] min-h-full">

      {/* MATCHED DOCTOR CSS: Header Typography and spacing */}


      {isUsingMockData && (
        <div className="mb-8 bg-amber-50 border border-amber-200 text-amber-800 text-xs px-4 py-3 rounded-lg flex justify-between items-center shadow-sm">
          <span><strong>Test Mode:</strong> Displaying static UI data because the backend API is currently disconnected.</span>
        </div>
      )}

      {/* MATCHED DOCTOR CSS: gap-8 and mb-10 for grids */}
      {/* Top Row: Profile & Appointment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2">
          <PatientProfileSummary profile={profile} />
        </div>
        <div className="lg:col-span-1">
          <UpcomingAppointmentCard appointment={upcomingAppointment} />
        </div>
      </div>

      {/* Middle Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <WeightTracker weightData={weightTracking} />
        <WellnessActivity activityData={wellnessActivity} />
      </div>

      {/* Bottom Row: Medical History & Metrics */}
      <div className="flex flex-col gap-8 pb-2">
        <MedicalHistory history={medicalHistory} />
        <QuickMetrics metrics={quickMetrics} />
      </div>

    </div>
  );
};

export default PatientDashboard;