import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../common/Button.jsx';
import { checkAuthStatus, logoutUser } from '../../api/authApi'; // Assuming you added these functions to your API file

export const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Ping our new checkAuth endpoint to see if the cookie exists and is valid
        const checkSession = async () => {
            try {
                await checkAuthStatus();
                setIsLoggedIn(true);
            } catch (error) {
                setIsLoggedIn(false);
            }
        };
        checkSession();
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            setIsLoggedIn(false);
            navigate('/'); // Kick them to the landing page after logging out
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <nav className="w-full bg-[#F1F8F6] py-6 px-6 md:px-12 lg:px-24 flex items-center justify-between z-50 relative">
            {/* Logo */}
            <div className="text-3xl font-sans font-bold text-ayur-green tracking-tight w-1/4">
                AyurCure
            </div>

            {/* Centered Navigation Links */}
            <div className="hidden lg:flex flex-1 justify-center gap-10 text-gray-800 font-sans font-medium text-sm tracking-wide">
                <a href="#navbar" className="hover:text-ayur-orange transition-colors">HOME</a>
                <a href="#how-it-works" className="hover:text-ayur-orange transition-colors">HOW IT WORKS</a>
                <a href="#expert-practitioners" className="hover:text-ayur-orange transition-colors">DOCTORS</a>
                <a href="#faq" className="hover:text-ayur-orange transition-colors">FAQs</a>
            </div>

            {/* Auth Buttons - Dynamically Rendered based on Session */}
            <div className="flex gap-4 w-1/4 justify-end">
                {isLoggedIn ? (
                    <>
                        <Link to="/dashboard">
                            <Button variant="primary" className="hidden md:block">Patient Dashboard</Button>
                        </Link>
                        <Button variant="outline" onClick={handleLogout}>Log Out</Button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <Button variant="outline" className="hidden md:block">Log In</Button>
                        </Link>
                        <Link to="/signup">
                            <Button variant="primary">Sign Up</Button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};