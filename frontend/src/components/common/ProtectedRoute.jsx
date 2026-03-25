import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    // TODO: Replace this with your actual global auth state hook (e.g., useSelector, useContext)
    // Example: const { isAuthenticated, userRole } = useAuth();

    // Mock state for demonstration:
    const isAuthenticated = localStorage.getItem('token') !== null;
    const userRole = localStorage.getItem('role'); // e.g., 'admin', 'doctor', 'patient'

    // 1. If the user is not logged in, redirect to the login page
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // 2. If the user is logged in but doesn't have the required role, redirect them
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Redirect them to their respective dashboard based on their actual role
        if (userRole === 'admin') return <Navigate to="/admin/dashboard" replace />;
        if (userRole === 'doctor') return <Navigate to="/doctor/dashboard" replace />;
        if (userRole === 'patient') return <Navigate to="/patient/dashboard" replace />;

        // Fallback if role is completely unknown
        return <Navigate to="/" replace />;
    }

    // 3. If authenticated and authorized, render the child routes (Outlet)
    return <Outlet />;
};

export default ProtectedRoute;