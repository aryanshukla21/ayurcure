import React from 'react';

export const BookingProgress = ({ step, totalSteps, title, percentage }) => {
    return (
        <div className="mb-10 w-full">
            <div className="flex justify-between items-end mb-3">
                <div>
                    <p className="text-ayur-orange text-xs font-bold tracking-widest uppercase mb-1">
                        Step {step} of {totalSteps}
                    </p>
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                </div>
                <div className="text-ayur-orange font-bold text-sm">
                    {percentage}% Complete
                </div>
            </div>

            {/* Linear Progress Bar */}
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-4">
                <div
                    className="h-full bg-ayur-orange rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            <p className="text-sm text-gray-500 italic">
                "Almost there! Your specialist needs this to prepare for your session."
            </p>
        </div>
    );
};