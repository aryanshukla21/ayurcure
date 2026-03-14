import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import { authApi } from '../../api/authApi';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authApi.forgotPassword(email);
            setSuccess(true);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <AuthLayout title="Check your email" subtitle={`We sent a reset link to ${email}`}>
                <div className="text-center">
                    <Link to="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#4A7C59] font-medium">
                        <ArrowLeft size={16} /> Back to login
                    </Link>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout title="Forgot Password?" subtitle="Enter your email address and we'll send you instructions to reset your password.">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email Address</label>
                    <input
                        type="email"
                        placeholder="doctor@clinic.com"
                        className="w-full bg-[#FAF8F5] border border-transparent focus:border-[#4A7C59] focus:bg-white rounded-lg px-4 py-3 outline-none transition-all text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={loading || !email} className="w-full bg-[#4A7C59] hover:bg-[#3d6649] text-white rounded-lg py-3 mt-2 font-medium transition-colors flex items-center justify-center gap-2 h-[40px] disabled:opacity-70">
                    {loading ? 'Sending...' : 'Send Reset Link'} <ArrowRight size={16} />
                </button>

                <div className="flex flex-col items-center gap-4 mt-4">
                    <Link to="/login" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors">
                        <ArrowLeft size={16} /> Back to login
                    </Link>

                    <div className="w-full flex items-center justify-center gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg mt-2">
                        <HelpCircle size={14} className="text-[#4A7C59]" />
                        <span>Need urgent help? <a href="#" className="font-semibold hover:underline">Contact Support</a></span>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;