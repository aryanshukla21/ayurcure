import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Doctor Pages
import DoctorLayout from './components/doctor/layout/DoctorLayout';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorAppointmentDetails from './pages/doctor/DoctorAppointmentDetails';
import DoctorEarnings from './pages/doctor/DoctorEarnings';
import DoctorProfile from './pages/doctor/DoctorProfile';
import DoctorSettings from './pages/doctor/DoctorSettings';

// Patient Pages
import PatientLayout from './components/patient/layout/PatientLayout';
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientAppointments from './pages/patient/PatientAppointments'
import PatientAppointmentDetails from './pages/patient/PatientAppointmentDetails'
import BookAppointmentPage from './pages/patient/BookAppointmentPage';

import PharmacyStore from './pages/patient/PharmacyStore';
import ProductDetails from './pages/patient/ProductDetails';
import CartSummary from './pages/patient/CartSummary';
import CheckoutPage from './pages/patient/CheckoutPage';

import PatientPrescriptionsPage from './pages/patient/PatientPrescriptionsPage';
import PatientHealthReportsPage from './pages/patient/PatientHealthReportsPage';

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

        <Route path="/patient" element={<PatientLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<PatientDashboard />} />

          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="appointments/:id" element={<PatientAppointmentDetails />} />
          <Route path="book-appointment" element={<BookAppointmentPage />} />

          <Route path="pharmacy-store" element={<PharmacyStore />} />
          <Route path="pharmacy-store/:id" element={<ProductDetails />} />
          <Route path="cart" element={<CartSummary />} />
          <Route path="checkout" element={<CheckoutPage />} />

          <Route path="prescriptions" element={<PatientPrescriptionsPage />} />
          <Route path="health-records" element={<PatientHealthReportsPage />} />

        </Route>
        <Route path="*" element={<Navigate to="/patient/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;