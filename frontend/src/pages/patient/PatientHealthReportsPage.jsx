import React from 'react';
import UploadReportCard from '../../components/patient/health-reports/UploadReportCard';
import QuickInsightsCard from '../../components/patient/health-reports/QuickInsightsCard';
import WellnessTipCard from '../../components/patient/health-reports/WellnessTipCard';
import RecentReportsList from '../../components/patient/health-reports/RecentReportsList';
import VitalityMetricsRow from '../../components/patient/health-reports/VitalityMetricsRow';

const PatientHealthReportsPage = () => {
  return (
    <div className="bg-[#FDF9EE] min-h-full p-8 md:p-10 font-sans max-w-[1600px] mx-auto">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-[40px] font-extrabold text-gray-900 mb-3 tracking-tight">
          Health Reports
        </h1>
        <p className="text-amber-800 font-medium text-base max-w-2xl">
          Your digital archive of vitality. Manage your clinical data with precision and organic ease.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column (Upload & Insights) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <UploadReportCard />
          <QuickInsightsCard />
        </div>

        {/* Right Column (Reports Table) */}
        <div className="lg:col-span-2">
          <RecentReportsList />
        </div>

        {/* Bottom Row (Vitality Metrics) */}
        <div className="lg:col-span-3 mt-2">
          <VitalityMetricsRow />
        </div>

      </div>

    </div>
  );
};

export default PatientHealthReportsPage;