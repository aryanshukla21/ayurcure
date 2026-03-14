import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import VerifyOTPPage from './pages/auth/VerifyOTPPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

// Doctor Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorProfile from './pages/doctor/DoctorProfile';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorPayouts from './pages/doctor/DoctorPayouts';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Protected Doctor Routes */}
        <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/profile" element={<DoctorProfile />} />
          <Route path="/doctor/appointments" element={<DoctorAppointments />} />
          <Route path="/doctor/payouts" element={<DoctorPayouts />} />

          {/* Placeholders for upcoming Sidebar Links so the app doesn't crash when clicked */}
          <Route path="/doctor/settings" element={<div className="flex h-screen items-center justify-center font-sans text-xl text-[#4A7C59] bg-[#FAF8F5]">Settings (Coming Soon)</div>} />
        </Route>

        {/* Protected Patient Routes (Placeholder for next steps) */}
        <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
          {/* <Route path="/patient/dashboard" element={<PatientDashboard />} /> */}
        </Route>

        {/* Catch-all 404 Route */}
        <Route path="*" element={<div className="flex h-screen items-center justify-center">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;