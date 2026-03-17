import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import DoctorLayout from './components/doctor/layout/DoctorLayout';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorAppointmentDetails from './pages/doctor/DoctorAppointmentDetails';
import DoctorEarnings from './pages/doctor/DoctorEarnings';
import DoctorProfile from './pages/doctor/DoctorProfile';
import DoctorSettings from './pages/doctor/DoctorSettings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/doctor/dashboard" replace />} />

        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<Navigate to="/doctor/dashboard" replace />} />
          <Route path="dashboard" element={<DoctorDashboard />} />

          <Route path="appointments" element={<DoctorAppointments />} />
          {/* NEW ROUTE: Dynamic ID parameter */}
          <Route path="appointments/:id" element={<DoctorAppointmentDetails />} />

          <Route path="earnings" element={<DoctorEarnings />} />
          <Route path="profile" element={<DoctorProfile />} />
          <Route path="settings" element={<DoctorSettings />} />
        </Route>
        <Route path="*" element={<Navigate to="/doctor/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;