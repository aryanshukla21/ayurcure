import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button.jsx';

export const Navbar = () => {
    return (
        <nav className="w-full bg-[#F1F8F6] py-6 px-6 md:px-12 lg:px-24 flex justify-between items-center z-50 relative">
            <div className="text-3xl font-sans font-bold text-ayur-green tracking-tight">
                AyurCure
            </div>
            <div className="hidden lg:flex gap-10 text-gray-800 font-sans font-medium text-sm tracking-wide">
                <a href="#navbar" className="hover:text-ayur-orange transition-colors">HOME</a>
                <a href="#how-it-works" className="hover:text-ayur-orange transition-colors">HOW IT WORKS</a>
                <a href="#expert-practitioners" className="hover:text-ayur-orange transition-colors">DOCTORS</a>
                <a href="#faq" className="hover:text-ayur-orange transition-colors">FAQs</a>
            </div>
            <div className="flex gap-4">
                <Link to="/login">
                    <Button variant="outline" className="hidden md:block">Log In</Button>
                </Link>
                <Link to="/signup">
                    <Button variant="primary">Sign Up</Button>
                </Link>
            </div>
        </nav>
    );
};