import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authApi } from '../../api/authApi';

/**
 * Guard component for role-based frontend routing.
 * Note: True authorization is enforced via HttpOnly cookies on the backend.
 * This component simply handles UI redirection based on stored user state.
 */
const ProtectedRoute = ({ allowedRoles }) => {
    const location = useLocation();
    const [authState, setAuthState] = useState({ loading: true, role: null });

    useEffect(() => {
        let isMounted = true;

        const verifySession = async () => {
            try {
                const data = await authApi.checkAuth();
                const role = data?.user?.role || null;
                if (isMounted) {
                    if (role) {
                        localStorage.setItem('role', role);
                    } else {
                        localStorage.removeItem('role');
                    }
                    setAuthState({ loading: false, role });
                }
            } catch (error) {
                if (isMounted) {
                    localStorage.removeItem('role');
                    setAuthState({ loading: false, role: null });
                }
            }
        };

        verifySession();

        return () => {
            isMounted = false;
        };
    }, []);

    if (authState.loading) return null;

    // 1. Not logged in (UI state missing)
    if (!authState.role) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 2. Role mismatch handling
    if (allowedRoles && !allowedRoles.includes(authState.role)) {
        switch (authState.role) {
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
