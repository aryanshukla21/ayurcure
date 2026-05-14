import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * Guard component for role-based frontend routing.
 * Note: True authorization is enforced via HttpOnly cookies on the backend.
 * This component simply handles UI redirection based on stored user state.
 */
const ProtectedRoute = ({ allowedRoles }) => {
    const location = useLocation();

    // Retrieve UI state (Ideally replaced by a global Context populated via /api/auth/me)
    const userRole = localStorage.getItem('role');

    // 1. Not logged in (UI state missing)
    if (!userRole) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 2. Role mismatch handling
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        switch (userRole) {
            case 'admin':
                return <Navigate to="/admin/dashboard" replace />;
            case 'doctor':
                return <Navigate to="/doctor/dashboard" replace />;
            case 'patient':
                return <Navigate to="/patient/dashboard" replace />;
            default:
                // Fallback for corrupted local storage state
                localStorage.removeItem('role');
                return <Navigate to="/login" replace />;
        }
    }

    // 3. Authorized
    return <Outlet />;
};

export default ProtectedRoute;