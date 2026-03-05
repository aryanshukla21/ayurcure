import React from 'react';
import { Button } from '../../common/Button';
import { useNavigate } from 'react-router-dom';

export const ConfirmationActions = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-md flex flex-col gap-4 mx-auto">
            {/* Primary Action */}
            <Button
                variant="primary"
                className="w-full bg-ayur-orange text-white py-4 rounded-xl font-bold shadow-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 text-lg"
            >
                <span>📅</span> Add to Calendar
            </Button>

            {/* Secondary Action */}
            <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="w-full bg-[#FFF4ED] text-ayur-orange border-none py-4 rounded-xl font-bold hover:bg-orange-100 transition-colors flex items-center justify-center gap-2 text-lg"
            >
                <span>⊞</span> Go to Dashboard
            </Button>

            {/* Footer Texts */}
            <p className="text-xs text-gray-400 mt-4 px-4 text-center leading-relaxed">
                A confirmation email has been sent to your registered address.
            </p>

            <button className="text-sm font-bold text-gray-500 hover:text-ayur-orange transition-colors mt-2 text-center flex items-center justify-center gap-2">
                Need to reschedule? <span className="text-lg">↻</span>
            </button>
        </div>
    );
};