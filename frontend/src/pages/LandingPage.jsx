import React from 'react';
import { Navbar } from '../components/landing/Navbar.jsx';
import { HeroSection } from '../components/landing/HeroSection.jsx';
import { HowItWorks } from '../components/landing/HowItWorks.jsx';
import { ExpertPractitioners } from '../components/landing/ExpertPractitioners.jsx';
import { SuccessStories } from '../components/landing/SuccessStories.jsx';
import { FAQ } from '../components/landing/FAQ.jsx';
import { Footer } from '../components/landing/Footer.jsx';

export const LandingPage = () => {
  return (
    <div className="min-h-screen w-full font-sans selection:bg-ayur-green selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <ExpertPractitioners />
        <SuccessStories />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};