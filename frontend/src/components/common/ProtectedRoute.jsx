import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import axios from '../api/axiosConfig'; // Your axios instance with withCredentials: true

const ProtectedRoute = ({ allowedRoles }) => {
    const location = useLocation();
    const [authState, setAuthState] = useState({ isLoading: true, role: null, isAuthenticated: false });

    useEffect(() => {
        const verifySession = async () => {
            try {
                // Securely verify the HttpOnly cookie with the backend
                const response = await axios.get('/api/auth/verify');
                setAuthState({
                    isLoading: false,
                    role: response.data.role,
                    isAuthenticated: true
                });
            } catch (error) {
                setAuthState({ isLoading: false, role: null, isAuthenticated: false });
            }
        };
        verifySession();
    }, []);

    if (authState.isLoading) {
        return <div>Loading secure environment...</div>; // Prevent flashing unauthorized content
    }

    if (!authState.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(authState.role)) {
        return <Navigate to="/unauthorized" replace />; // Redirect to a safe fallback
    }

    return <Outlet />;
};

export default ProtectedRoute;