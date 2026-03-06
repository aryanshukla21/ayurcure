import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- Page Imports ---
// Public & Auth
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/auth/Login';
import { SignUp } from './pages/auth/SignUp';

// User Portal
import { Dashboard } from './pages/user-portal/Dashboard';
import { Overview } from './pages/user-portal/Overview';
import { Appointments } from './pages/user-portal/Appointments';
import { Settings } from './pages/user-portal/Settings';

// Booking Flow
import { BookingFlow } from './pages/booking/BookingFlow';
import { SlotPicker } from './pages/booking/SlotPicker';
import { SymptomsForm } from './pages/booking/SymptomsForm';
import { Payment } from './pages/booking/Payment';
import { BookingConfirmation } from './pages/booking/BookingConfirmation';
import { DoctorProfile } from './pages/booking/DoctorProfile';
import { DoctorDiscovery } from './pages/booking/DoctorDiscovery';

// Shop
import { Marketplace } from './pages/shop/Marketplace';
import { CartPage } from './pages/shop/CartPage';
import { ProductDetail } from './pages/shop/ProductDetail';
import { Checkout } from './pages/shop/Checkout';
import { OrderConfirmation } from './pages/shop/OrderConfirmation';

// Admin Portal
import { Analytics } from './pages/admin/Analytics';
import { UserManagement } from './pages/admin/UserManagement';
import { OrderManagement } from './pages/admin/OrderManagement';
import { Inventory } from './pages/admin/Inventory';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Patient Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/dashboard/appointments" element={<Appointments />} />
        <Route path="/dashboard/settings" element={<Settings />} />

        {/* Consultation Booking Routes */}
        <Route path="/book" element={<BookingFlow />} />
        <Route path="/book/slot" element={<SlotPicker />} />
        <Route path="/book/symptoms" element={<SymptomsForm />} />
        <Route path="/book/payment" element={<Payment />} />
        <Route path="/book/confirmation" element={<BookingConfirmation />} />


        {/* E-Commerce Routes */}
        <Route path="/shop" element={<Marketplace />} />
        <Route path="/shop/cart" element={<CartPage />} />
        <Route path="/shop/product" element={<ProductDetail />} />
        <Route path="/shop/checkout" element={<Checkout />} />
        <Route path="/shop/order-success" element={<OrderConfirmation />} />

        <Route path="/doctors" element={<DoctorDiscovery />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<Analytics />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/orders" element={<OrderManagement />} />
        <Route path="/admin/inventory" element={<Inventory />} />

        {/* Catch-all route to redirect unknown URLs to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;