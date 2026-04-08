import React, { useState } from 'react';
import { jsPDF } from 'jspdf'; // <-- Explicit named import
import autoTable from 'jspdf-autotable'; // <-- Explicit default import

import ProfileOverviewCard from '../../components/patient/profile/ProfileOverviewCard';
import MedicalInfoCard from '../../components/patient/profile/MedicalInfoCard';
import PersonalDetailsCard from '../../components/patient/profile/PersonalDetailsCard';
import ContactInfoCard from '../../components/patient/profile/ContactInfoCard';
import EmergencyContactCard from '../../components/patient/profile/EmergencyContactCard';

const INITIAL_DATA = {
  name: 'Alex Thompson',
  age: '32',
  gender: 'Male',
  constitution: 'Pitta-Vata',
  dob: 'Jan 15, 1992',
  email: 'alex.t@example.com',
  phone: '+91 98765 43210',
  address: 'Flat 402, Lotus Residency,\nMumbai, Maharashtra 400001',
  emergency: {
    name: 'Sarah Thompson',
    relation: 'Spouse',
    phone: '+91 91234 56789'
  },
  medical: {
    diseases: ['Hypertension'],
    allergies: ['Pollen', 'Peanuts'],
    currentMedication: {
      name: 'Ashwagandha Extract',
      dosage: '500mg - Twice daily before meals'
    }
  }
};

const PatientProfilePage = () => {
  const [profileData, setProfileData] = useState(INITIAL_DATA);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('emergency')) {
      const field = name.replace('emergency', '').toLowerCase();
      setProfileData(prev => ({ ...prev, emergency: { ...prev.emergency, [field]: value } }));
    } else {
      setProfileData(prev => ({ ...prev, [name]: value }));
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      console.log('Saved data:', profileData);
    }
    setIsEditing(!isEditing);
  };

  // BEAUTIFUL PDF GENERATOR (Fixed for Vite/ES Modules)
  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF('p', 'mm', 'a4');

      // --- Header Block (Dark Green) ---
      doc.setFillColor(74, 124, 89); // #4A7C59
      doc.rect(0, 0, 210, 45, 'F');

      // Title
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.text('AyurCure', 105, 20, null, null, 'center');

      // Subtitle
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text('Official Patient Health Profile', 105, 28, null, null, 'center');
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 105, 35, null, null, 'center');

      let startY = 55;

      // Helper to add stylized tables for sections using explicit autoTable() call
      const addSectionTable = (title, dataArray) => {
        // Section Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(44, 77, 54); // Darker Green text for section titles
        doc.text(title, 14, startY);

        // Data Table
        autoTable(doc, {
          startY: startY + 5,
          body: dataArray,
          theme: 'grid',
          styles: {
            fontSize: 11,
            cellPadding: 6,
            lineColor: [239, 235, 225], // Light border color matching UI
            lineWidth: 0.1,
          },
          columnStyles: {
            0: {
              fontStyle: 'bold',
              fillColor: [250, 247, 242], // UI's off-white background
              textColor: [100, 100, 100],
              cellWidth: 60
            },
            1: {
              textColor: [0, 0, 0]
            }
          },
          margin: { left: 14, right: 14 }
        });

        startY = doc.lastAutoTable.finalY + 15; // Setup next Y position
      };

      // SECTION 1: Personal Information
      addSectionTable('Personal Details', [
        ['Full Name', profileData.name || 'N/A'],
        ['Age & Gender', `${profileData.age || 'N/A'} years, ${profileData.gender || 'N/A'}`],
        ['Date of Birth', profileData.dob || 'N/A'],
        ['Ayurvedic Constitution', profileData.constitution || 'N/A']
      ]);

      // SECTION 2: Contact Information
      addSectionTable('Contact Information', [
        ['Email Address', profileData.email || 'N/A'],
        ['Phone Number', profileData.phone || 'N/A'],
        ['Residential Address', (profileData.address || 'N/A').replace('\n', ', ')]
      ]);

      // SECTION 3: Emergency Contact
      const emergency = profileData.emergency || {};
      addSectionTable('Emergency Contact', [
        ['Contact Name', emergency.name || 'N/A'],
        ['Relationship', emergency.relation || 'N/A'],
        ['Phone Number', emergency.phone || 'N/A']
      ]);

      // SECTION 4: Medical History
      const medical = profileData.medical || { diseases: [], allergies: [], currentMedication: {} };
      const currentMed = medical.currentMedication || {};

      addSectionTable('Clinical & Medical Overview', [
        ['Diagnosed Conditions', (medical.diseases || []).join(', ') || 'None reported'],
        ['Known Allergies', (medical.allergies || []).join(', ') || 'None reported'],
        ['Current Medication', currentMed.name ? `${currentMed.name} \n(${currentMed.dosage || 'No dosage specified'})` : 'None reported']
      ]);

      // Footer
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text('This document is electronically generated and strictly confidential.', 105, 285, null, null, 'center');

      // Save the PDF
      const fileName = `${(profileData.name || 'Patient').replace(/\s+/g, '_')}_AyurCure_Profile.pdf`;
      doc.save(fileName);

    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("There was an issue generating the PDF. Please check the console for errors.");
    }
  };

  return (
    <div className="bg-[#FDF9EE] min-h-full p-8 md:p-10 font-sans max-w-[1600px] mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-[40px] font-extrabold text-gray-900 tracking-tight">
          Patient Profile
        </h1>
        <div className="flex items-center gap-4 mt-4">
          <div className="h-[1px] w-10 bg-gray-400"></div>
          <p className="text-[10px] font-extrabold text-green-700 uppercase tracking-widest">
            MEMBER SINCE 2021
          </p>
        </div>
      </div>

      {/* Top 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ProfileOverviewCard
          profile={profileData}
          isEditing={isEditing}
          onEditToggle={toggleEdit}
          onChange={handleInputChange}
          onDownloadPDF={handleDownloadPDF}
        />
        <MedicalInfoCard medical={profileData.medical} />
      </div>

      {/* Bottom 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PersonalDetailsCard profile={profileData} isEditing={isEditing} onChange={handleInputChange} />
        <ContactInfoCard profile={profileData} isEditing={isEditing} onChange={handleInputChange} />
        <EmergencyContactCard emergency={profileData.emergency} isEditing={isEditing} onChange={handleInputChange} />
      </div>

    </div>
  );
};

export default PatientProfilePage;