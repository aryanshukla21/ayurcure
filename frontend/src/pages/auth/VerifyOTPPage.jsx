import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import { authApi } from '../../api/authApi';
import { ShieldCheck } from 'lucide-react';

const VerifyOTPPage = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const inputs = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || 'your email';

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpCode = otp.join('');
        if (otpCode.length < 6) return;

        setLoading(true);
        try {
            const res = await authApi.verifyOtp({ email, code: otpCode });
            localStorage.setItem('token', res.token);
            navigate('/doctor/dashboard');
        } catch (err) {
            console.error(err);
            // Handle error display
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            icon={<ShieldCheck size={24} />}
            title="Verify Your Account"
            subtitle={`Enter the 6-digit code sent to ${email}`}
        >
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div className="flex gap-2 sm:gap-3 mb-8 w-full justify-center">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputs.current[index] = el)}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-10 h-12 sm:w-12 sm:h-14 bg-[#FAF8F5] border border-transparent focus:border-[#4A7C59] focus:bg-white rounded-lg text-center text-xl font-bold outline-none transition-all"
                        />
                    ))}
                </div>

                <button type="submit" disabled={loading || otp.join('').length < 6} className="w-full bg-[#4A7C59] hover:bg-[#3d6649] text-white rounded-lg py-3 font-medium transition-colors disabled:opacity-70 h-[40px] flex items-center justify-center">
                    {loading ? 'Verifying...' : 'Verify'}
                </button>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Didn't receive the code?{' '}
                    {timeLeft > 0 ? (
                        <span className="text-gray-400">Resend Code ({timeLeft}s)</span>
                    ) : (
                        <button type="button" className="text-[#4A7C59] font-medium hover:underline">Resend Code</button>
                    )}
                </div>
            </form>
        </AuthLayout>
    );
};

export default VerifyOTPPage;