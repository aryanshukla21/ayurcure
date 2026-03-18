import React from 'react';
import PrescriptionList from '../../components/patient/prescriptions/PrescriptionList';
import AutomatedRefillsCard from '../../components/patient/prescriptions/AutomatedRefillsCard';
import ExpertConsultationCard from '../../components/patient/prescriptions/ExpertConsultationCard';

const PatientPrescriptionsPage = () => {
  return (
    <div className="bg-[#FDF9EE] min-h-full p-8 md:p-10 font-sans max-w-[1600px] mx-auto flex flex-col">

      {/* Header */}
      <div className="mb-10">
        <p className="text-[12px] font-bold text-green-700 uppercase tracking-widest mb-2">
          Wellness Records
        </p>
        <h1 className="text-4xl md:text-[40px] font-extrabold text-gray-900 tracking-tight">
          Prescriptions
        </h1>
      </div>

      {/* Main White Panel */}
      <div className="flex-1 bg-white rounded-[32px] p-8 md:p-10 border border-[#EFEBE1] shadow-sm flex flex-col">

        {/* Top Section: The List */}
        <div className="flex-1 mb-10">
          <PrescriptionList />
        </div>

        {/* Bottom Section: Promo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="md:col-span-2">
            <AutomatedRefillsCard />
          </div>
          <div className="md:col-span-1">
            <ExpertConsultationCard />
          </div>
        </div>

      </div>

    </div>
  );
};

export default PatientPrescriptionsPage;