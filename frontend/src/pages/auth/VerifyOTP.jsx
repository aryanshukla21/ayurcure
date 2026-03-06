import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { verifyAndRegister } from '../../api/authApi';

export const VerifyOTP = () => {
    const navigate = useNavigate();
    const [emailOtp, setEmailOtp] = useState('');
    const [phoneOtp, setPhoneOtp] = useState('');
    const [tempData, setTempData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Retrieve temporary data stored during step 1
        const stored = sessionStorage.getItem('tempSignupData');
        if (!stored) {
            navigate('/signup'); // Kicked out if they bypass step 1
        } else {
            setTempData(JSON.parse(stored));
        }
    }, [navigate]);

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            // Send both OTPs and the complete User Profile to the backend for permanent storage
            const payload = { ...tempData, emailOtp, phoneOtp };
            await verifyAndRegister(payload);

            // Cleanup temp storage
            sessionStorage.removeItem('tempSignupData');

            // Trigger Welcome Popup
            sessionStorage.setItem('showWelcomePopup', 'true');

            // Navigate based on selected role
            navigate(tempData.role === 'doctor' ? '/doctor-dashboard' : '/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || "Verification failed. Check your codes.");
        }
    };

    if (!tempData) return null;

    return (
        <div className="min-h-screen bg-ayur-beige flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-md rounded-[32px] p-10 shadow-xl shadow-ayur-green/5 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Account</h2>
                <p className="text-gray-500 mb-8 text-sm">We've sent verification codes to both your email and phone number.</p>

                <form onSubmit={handleVerify} className="space-y-6 text-left">
                    {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium text-center">{error}</div>}

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email OTP ({tempData.email})</label>
                        <input type="text" value={emailOtp} onChange={(e) => setEmailOtp(e.target.value)} required placeholder="6-digit code" className="w-full p-4 rounded-xl border border-gray-200 text-center tracking-widest text-lg focus:ring-2 focus:ring-ayur-green outline-none" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone OTP ({tempData.phone})</label>
                        <input type="text" value={phoneOtp} onChange={(e) => setPhoneOtp(e.target.value)} required placeholder="6-digit code" className="w-full p-4 rounded-xl border border-gray-200 text-center tracking-widest text-lg focus:ring-2 focus:ring-ayur-green outline-none" />
                    </div>

                    <Button type="submit" variant="primary" className="w-full py-4 text-lg rounded-xl shadow-lg shadow-ayur-green/20">
                        Complete Registration
                    </Button>
                </form>
            </div>
        </div>
    );
};