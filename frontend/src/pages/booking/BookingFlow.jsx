import React, { useState } from 'react';
import { Button } from '../../components/common/Button';

export const BookingFlow = () => {
  const [currentStep, setCurrentStep] = useState(2); // Mocking Step 2: Select Date & Time

  const steps = ["Doctor", "Schedule", "Patient Info", "Symptoms", "Review", "Confirm"];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Progress Header */}
        <div className="bg-white border-b border-gray-100 p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Select Date & Time</h2>
            <span className="text-ayur-orange font-bold">Step {currentStep} of 6</span>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-ayur-orange transition-all duration-500" 
              style={{ width: `${(currentStep / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content Area (Step 2 Content) */}
        <div className="p-8">
           {/* Step content will be rendered here */}
           <p className="text-gray-500 mb-8">Almost there! Your wellness journey is just a few clicks away[cite: 354].</p>
        </div>

        {/* Footer Navigation */}
        <div className="p-8 bg-gray-50 flex justify-between items-center">
          <Button variant="outline">← Back to Services</Button>
          <Button variant="primary">Review Details →</Button>
        </div>
      </div>
    </div>
  );
};