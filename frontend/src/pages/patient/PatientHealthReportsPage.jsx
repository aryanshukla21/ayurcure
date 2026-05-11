// frontend/src/pages/patient/PatientHealthReportsPage.jsx
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { patientApi } from '../../api/patientApi';
import UploadReportCard from '../../components/patient/health-reports/UploadReportCard';
import QuickInsightsCard from '../../components/patient/health-reports/QuickInsightsCard';
import RecentReportsList from '../../components/patient/health-reports/RecentReportsList';
import VitalityMetricsRow from '../../components/patient/health-reports/VitalityMetricsRow';
import WellnessTipCard from '../../components/patient/health-reports/WellnessTipCard'; // Imported existing component

const PatientHealthReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [insights, setInsights] = useState(null);
  const [vitality, setVitality] = useState(null);
  const [goals, setGoals] = useState([]);
  const [lastChanged, setLastChanged] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const results = await Promise.allSettled([
          patientApi.getRecentReports(),
          patientApi.getReportInsights(),
          patientApi.getReportVitality(),
          patientApi.getReportGoals(),
          patientApi.getReportLastChanged()
        ]);

        if (results[0].status === 'fulfilled') setReports(results[0].value || []);
        if (results[1].status === 'fulfilled') setInsights(results[1].value);
        if (results[2].status === 'fulfilled') setVitality(results[2].value);
        if (results[3].status === 'fulfilled') setGoals(results[3].value || []);
        if (results[4].status === 'fulfilled') setLastChanged(results[4].value);
      } catch (err) {
        console.error("Failed to load health data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleAddReport = async (fileData) => {
    try {
      const response = await patientApi.uploadReport(fileData);
      if (response.data) {
        setReports([response.data, ...reports]);
      }
    } catch (err) {
      alert("Failed to upload document.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FDF9EE]">
        <Loader2 className="w-10 h-10 text-[#4A7C59] animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#FDF9EE] min-h-full p-8 md:p-10 font-sans max-w-[1600px] mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Health Reports</h1>
        <p className="text-amber-800 font-medium text-base">Your digital archive of vitality.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <UploadReportCard onUpload={handleAddReport} />
          {/* Passing both insights and lastChanged to QuickInsights */}
          <QuickInsightsCard insights={insights} lastChanged={lastChanged} />
          <WellnessTipCard goals={goals} />
        </div>
        <div className="lg:col-span-2">
          <RecentReportsList reportsData={reports} />
        </div>
        <div className="lg:col-span-3 mt-2">
          <VitalityMetricsRow metrics={vitality} />
        </div>
      </div>
    </div>
  );
};

export default PatientHealthReportsPage;