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

import PatientProfilePage from './pages/patient/PatientProfilePage';
import PatientSettingsPage from './pages/patient/PatientSettingsPage';
import PatientOrderDetailsPage from './pages/patient/PatientOrderDetailsPage';
import PharmacyOrdersPage from './pages/patient/PharmacyOrdersPage';

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminDoctorsPage from './pages/admin/AdminDoctorsPage';
import AdminAddDoctorPage from './pages/admin/AdminAddDoctorPage';
import AdminEditDoctorPage from './pages/admin/AdminEditDoctorPage';
import AdminPatientsPage from './pages/admin/AdminPatientsPage';
import AdminPatientDetailsPage from './pages/admin/AdminPatientDetailsPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminOrderDetailsPage from './pages/admin/AdminOrderDetailsPage';
import AdminReportsPage from './pages/admin/AdminReportsPage';
import AdminBlogsPage from './pages/admin/AdminBlogsPage';
import AdminAddBlogPage from './pages/admin/AdminAddBlogPage';
import AdminEditBlogPage from './pages/admin/AdminEditBlogPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminAddAdminPage from './pages/admin/AdminAddAdminPage';
import AdminEditAdminPage from './pages/admin/AdminEditAdminPage';
import ContactPage from './pages/website/ContactPage';
import PrivacyPolicyPage from './pages/website/PrivacyPolicyPage';
import TermsConditionsPage from './pages/website/TermsConditionsPage';
import HelpDeskPage from './pages/website/HelpDeskPage';
import LandingPage from './pages/website/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/doctor/dashboard" replace />} />

        <Route path="/" element={<LandingPage isLoggedIn={false} userRole="patient" />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/help" element={<HelpDeskPage />} />
        <Route path="/terms" element={<TermsConditionsPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="doctors" element={<AdminDoctorsPage />} />
          <Route path="doctors/add" element={<AdminAddDoctorPage />} />
          <Route path="doctors/edit/:id" element={<AdminEditDoctorPage />} />
          <Route path="patients" element={<AdminPatientsPage />} />
          <Route path="patients/:id" element={<AdminPatientDetailsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="orders/:id" element={<AdminOrderDetailsPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
          <Route path="blogs" element={<AdminBlogsPage />} />
          <Route path="blogs/add" element={<AdminAddBlogPage />} />
          <Route path="blogs/edit/:id" element={<AdminEditBlogPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="settings/add-admin" element={<AdminAddAdminPage />} />
          <Route path="settings/edit-admin/:id" element={<AdminEditAdminPage />} />
        </Route>

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

          <Route path="pharmacy-orders" element={<PharmacyOrdersPage />} />
          <Route path="pharmacy-orders/:id" element={<PatientOrderDetailsPage />} />
          <Route path="profile" element={<PatientProfilePage />} />
          <Route path="settings" element={<PatientSettingsPage />} />

        </Route>
        <Route path="*" element={<Navigate to="/patient/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;