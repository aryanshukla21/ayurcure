import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Loader2 } from 'lucide-react';

// Make sure these paths match your folder structure
import PatientProfileCard from '../../components/admin/patients/patient-details/PatientProfileCard';
import PatientMedicalInfoCard from '../../components/admin/patients/patient-details/PatientMedicalInfoCard';
import AppointmentHistoryTable from '../../components/admin/patients/patient-details/AppointmentHistoryTable';
import OrderHistoryTable from '../../components/admin/patients/patient-details/OrderHistoryTable';

const AdminPatientDetailsPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    // Simulate API fetch using the exact data from the design
    setTimeout(() => {
      setPatientData({
        registryId: id || 'AYU-2024-0892',
        name: 'Aradhana Devi',
        age: 64,
        gender: 'Female',
        phone: '+91 98765-43210',
        email: 'aradhana.devi@provider.com',
        imgText: 'AD', // Fallback text for the avatar
        img: '', // Leave empty to show the 'AD' fallback from the new design
        medical: {
          conditions: ['Type 2 Diabetes', 'Hypertension'],
          allergies: ['Penicillin', 'Latex'],
          medications: [
            { name: 'Metformin', dosage: '500mg' },
            { name: 'Lisinopril', dosage: '10mg' }
          ]
        },
        appointments: [
          { doctor: 'Dr. Vikram Sethi', specialization: 'Cardiology', datetime: 'May 24, 2024 - 10:30 AM', status: 'ACTIVE' },
          { doctor: 'Dr. Anjali Rao', specialization: 'Endocrinology', datetime: 'May 12, 2024 - 02:15 PM', status: 'INACTIVE' },
          { doctor: 'Dr. Vikram Sethi', specialization: 'Cardiology', datetime: 'Apr 28, 2024 - 11:00 AM', status: 'INACTIVE' }
        ],
        orders: [
          { id: 'INV-68210', item: 'Metformin x30 Caps', date: 'May 20, 2024', amount: '₹1,240.00', status: 'PAID' },
          { id: 'INV-88156', item: 'Lisinopril x60 Caps', date: 'May 15, 2024', amount: '₹890.00', status: 'PAID' },
          { id: 'INV-88002', item: 'Blood Sugar Monitor', date: 'May 10, 2024', amount: '₹4,500.00', status: 'PAID' }
        ]
      });
      setIsLoading(false);
    }, 400);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-[#3A6447] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 md:p-10 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      
      {/* Header & Breadcrumbs */}
      <div className="mb-10">
        <div className="flex items-center text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">
          <Link to="/admin/patients" className="hover:text-[#4A7C59] transition-colors">Patients</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-900">Patient Details</span>
        </div>
        <div className="flex justify-between items-end">
          <h1 className="text-3xl md:text-[32px] font-extrabold text-gray-900 tracking-tight leading-none mb-2">
            Patient Details
          </h1>
          <span className="bg-[#EAE5D9] text-[#79563E] text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
            Registry ID: {patientData.registryId}
          </span>
        </div>
      </div>

      {/* Top Row: Profile (2/3 width) & Medical Info (1/3 width) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <PatientProfileCard patient={patientData} />
        </div>
        <div className="lg:col-span-1">
          <PatientMedicalInfoCard medicalInfo={patientData.medical} />
        </div>
      </div>

      {/* Historical Tables Row */}
      <AppointmentHistoryTable appointments={patientData.appointments} />
      <OrderHistoryTable orders={patientData.orders} />

    </div>
  );
};

export default AdminPatientDetailsPage;