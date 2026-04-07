import React, { useState } from 'react';
import { Activity, FileText, Stethoscope, HeartPulse } from 'lucide-react';
import UploadReportCard from '../../components/patient/health-reports/UploadReportCard';
import QuickInsightsCard from '../../components/patient/health-reports/QuickInsightsCard';
import RecentReportsList from '../../components/patient/health-reports/RecentReportsList';
import VitalityMetricsRow from '../../components/patient/health-reports/VitalityMetricsRow';

// Initial Dummy Data
const INITIAL_REPORTS = [
  { id: 1, name: 'Blood Test Results', desc: 'Metabolic Panel', doctor: 'Dr. Ananya Sharma', date: 'Oct 15, 2023', icon: Activity, color: 'text-red-500 bg-red-50' },
  { id: 2, name: 'Chest X-Ray Digital', desc: 'Imaging Diagnostics', doctor: 'Dr. Rajesh Varma', date: 'Sep 28, 2023', icon: FileText, color: 'text-amber-600 bg-amber-50' },
  { id: 3, name: 'Annual Physical', desc: 'General Wellness', doctor: 'Dr. Sarah K.', date: 'Aug 12, 2023', icon: Stethoscope, color: 'text-orange-600 bg-orange-50' },
  { id: 4, name: 'Cardiac Stress Test', desc: 'Cardiology Dept', doctor: 'Dr. Ananya Sharma', date: 'Jul 05, 2023', icon: HeartPulse, color: 'text-blue-600 bg-blue-50' },
  { id: 5, name: 'Thyroid Profile', desc: 'Endocrinology', doctor: 'Dr. Priya Menon', date: 'Jun 20, 2023', icon: Activity, color: 'text-purple-600 bg-purple-50' },
  { id: 6, name: 'Vitamin D Check', desc: 'Nutrition', doctor: 'Dr. Sarah K.', date: 'May 11, 2023', icon: FileText, color: 'text-green-600 bg-green-50' },
  { id: 7, name: 'Liver Function', desc: 'Metabolic Panel', doctor: 'Dr. Rajesh Varma', date: 'Apr 02, 2023', icon: Activity, color: 'text-red-500 bg-red-50' },
  { id: 8, name: 'Allergy Panel', desc: 'Immunology', doctor: 'Dr. Ananya Sharma', date: 'Mar 15, 2023', icon: FileText, color: 'text-amber-600 bg-amber-50' },
];

const PatientHealthReportsPage = () => {
  // Shared state for reports so UploadCard can update the List
  const [reports, setReports] = useState(INITIAL_REPORTS);

  const handleAddReport = (newReport) => {
    setReports([newReport, ...reports]);
  };

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
          <UploadReportCard onUpload={handleAddReport} />
          <QuickInsightsCard />
        </div>

        {/* Right Column (Reports Table) */}
        <div className="lg:col-span-2">
          <RecentReportsList reportsData={reports} />
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