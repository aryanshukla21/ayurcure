import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // We need to ensure we save this during login!

    // 1. If no token exists, redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // 2. If the route requires specific roles and the user doesn't have it, redirect them
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // If a patient tries to access the doctor dashboard, send them to the patient dashboard
        if (userRole === 'patient') {
            return <Navigate to="/patient/dashboard" replace />;
        }
        // Fallback redirect
        return <Navigate to="/login" replace />;
    }

    // 3. If authenticated and authorized, render the child routes
    return <Outlet />;
};

export default ProtectedRoute;