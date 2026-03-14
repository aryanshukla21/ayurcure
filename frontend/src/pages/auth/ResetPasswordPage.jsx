import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import { authApi } from '../../api/authApi';

const ResetPasswordPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Basic validation rules
    const hasMinLength = password.length >= 12;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword || !hasMinLength || !hasSpecialChar) return;

        setLoading(true);
        try {
            // In a real app, you'd extract the reset token from the URL params here
            await authApi.resetPassword({ token: 'extracted-token', newPassword: password });
            navigate('/login');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Reset Your Password" subtitle="Please enter a new secure password for your AyurCare360 account.">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5 relative">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">New Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full bg-[#FAF8F5] border border-transparent focus:border-[#4A7C59] focus:bg-white rounded-lg px-4 py-3 outline-none transition-all text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {/* Simple strength indicator line */}
                    <div className="flex gap-1 mt-1">
                        <div className={`h-1 flex-1 rounded-full ${password.length > 0 ? 'bg-orange-400' : 'bg-gray-200'}`}></div>
                        <div className={`h-1 flex-1 rounded-full ${hasMinLength ? 'bg-yellow-400' : 'bg-gray-200'}`}></div>
                        <div className={`h-1 flex-1 rounded-full ${hasMinLength && hasSpecialChar ? 'bg-[#4A7C59]' : 'bg-gray-200'}`}></div>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Confirm Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full bg-[#FAF8F5] border border-transparent focus:border-[#4A7C59] focus:bg-white rounded-lg px-4 py-3 outline-none transition-all text-sm"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Security Requirements Box */}
                <div className="bg-[#FAF8F5] p-4 rounded-lg border border-[#efe9dc] mt-2">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Security Requirements</p>
                    <ul className="text-sm flex flex-col gap-2">
                        <li className={`flex items-center gap-2 ${hasMinLength ? 'text-[#4A7C59]' : 'text-gray-500'}`}>
                            <CheckCircle2 size={16} className={hasMinLength ? 'text-[#4A7C59]' : 'text-gray-300'} />
                            Minimum 12 characters
                        </li>
                        <li className={`flex items-center gap-2 ${hasSpecialChar ? 'text-[#4A7C59]' : 'text-gray-500'}`}>
                            <CheckCircle2 size={16} className={hasSpecialChar ? 'text-[#4A7C59]' : 'text-gray-300'} />
                            At least one special character (!@#)
                        </li>
                    </ul>
                </div>

                <button
                    type="submit"
                    disabled={loading || password !== confirmPassword || !hasMinLength || !hasSpecialChar}
                    className="w-full bg-[#4A7C59] hover:bg-[#3d6649] text-white rounded-lg py-3 mt-2 font-medium transition-colors flex items-center justify-center gap-2 h-[40px] disabled:opacity-70"
                >
                    {loading ? 'Updating...' : 'Update Password'} <ArrowRight size={16} />
                </button>

                <div className="text-center mt-2">
                    <Link to="/login" className="text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors">
                        ← Back to Login
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default ResetPasswordPage;