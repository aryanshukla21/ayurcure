import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';

export const HeroSection = () => {
    return (
        <section className="bg-[#F1F8F6] w-full px-6 md:px-12 lg:px-24 pt-12 pb-24 flex flex-col lg:flex-row items-center gap-16">

            {/* Left Content Area - Exact layout, padding, and fonts */}
            <div className="lg:w-1/2 flex flex-col justify-center">
                <h1 className="text-[3.5rem] lg:text-[5rem] font-sans font-bold text-gray-900 leading-[1.1] mb-8">
                    Rooted in<br />
                    Tradition.<br />
                    <span className="text-ayur-green">
                        Powered by<br />Technology.</span>
                </h1>

                <p className="text-lg lg:text-xl text-gray-600 max-w-lg leading-relaxed mb-10 font-sans font-light">
                    Experience personlized Ayurvedic healthcare from the comfort of your home. Combining ancient wisdom with modern precision.
                </p>

                <div className="flex flex-wrap gap-4">
                    <Link to="/book">
                        <Button variant="primary" className="py-4 px-8 text-lg">
                            Book Consultation
                        </Button>
                    </Link>
                    <Link to="/shop">
                        <Button variant="outline" className="py-4 px-8 text-lg bg-white border-2">
                            Explore Products
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Right Content Area - Single Image Layout as Requested */}
            <div className="lg:w-1/2 w-full flex justify-center lg:justify-end h-[500px] lg:h-[650px] relative">
                <div className="w-full lg:w-[90%] h-full rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl overflow-hidden shadow-2xl relative">
                    <img
                        src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80"
                        alt="Ayurvedic Healing Setup"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
            </div>

        </section>
    );
};