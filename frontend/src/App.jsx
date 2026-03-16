import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import the Doctor components we just created
import DoctorLayout from './components/doctor/layout/DoctorLayout';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointments from './pages/doctor/DoctorAppointments';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect the base URL to the doctor dashboard for testing */}
        <Route path="/" element={<Navigate to="/doctor/dashboard" replace />} />

        {/* Doctor Portal Routes (UNPROTECTED FOR UI TESTING) */}
        <Route path="/doctor" element={<DoctorLayout />}>

          {/* Default redirect for /doctor */}
          <Route index element={<Navigate to="/doctor/dashboard" replace />} />

          {/* The actual Dashboard Page */}
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="appointments" element={<DoctorAppointments />} />

          {/* Blank placeholder pages for the other sidebar links */}
          <Route path="earnings" element={<div className="p-8 text-2xl font-bold text-gray-700">Earnings UI Coming Soon</div>} />
          <Route path="profile" element={<div className="p-8 text-2xl font-bold text-gray-700">Profile UI Coming Soon</div>} />
          <Route path="settings" element={<div className="p-8 text-2xl font-bold text-gray-700">Settings UI Coming Soon</div>} />
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/doctor/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;