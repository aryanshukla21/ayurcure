import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Clock, Leaf } from 'lucide-react';

const VerifyAccountPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(299); // 4 minutes 59 seconds
  const inputRefs = useRef([]);

  // Countdown Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // OTP Input Logic
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Take only the last character in case of rapid typing
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Auto-focus previous input on backspace if current is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    if (pastedData.some(char => isNaN(char))) return;

    const newOtp = [...otp];
    pastedData.forEach((char, index) => {
      newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus the last filled input
    const focusIndex = Math.min(pastedData.length, 5);
    if (inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex].focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const code = otp.join('');
    console.log('Verifying code:', code);
    if (code.length === 6) {
      // Simulate verification success and redirect
      navigate('/patient/dashboard');
    }
  };

  const handleResend = () => {
    console.log('Resending code...');
    setTimeLeft(299); // Reset timer
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans flex flex-col relative overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#F5EFE6]/40 to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[#F5EFE6]/60 to-transparent blur-3xl"></div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 relative z-10 w-full py-12">

        {/* Header Section */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-12 h-12 bg-[#52735B] rounded-xl flex items-center justify-center text-white mb-6 shadow-sm">
            <Shield size={22} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
            Verify Your Account
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        {/* Verify Card */}
        <div className="w-full max-w-[420px] bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EFEBE1]/50">
          <form onSubmit={handleVerify} className="flex flex-col gap-8">

            {/* OTP Input Boxes */}
            <div className="flex items-center justify-between gap-2 sm:gap-3" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-11 h-14 sm:w-12 sm:h-14 bg-[#F8F6F0] rounded-xl text-center text-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#52735B]/30 transition-all border border-transparent focus:border-[#EFEBE1] focus:bg-white"
                  maxLength={1}
                />
              ))}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={otp.join('').length !== 6}
              className="w-full bg-[#52735B] hover:bg-[#425E4A] disabled:bg-[#52735B]/60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm"
            >
              Verify
            </button>
          </form>

          {/* Resend & Timer */}
          <div className="mt-8 text-center flex flex-col items-center gap-4">
            <p className="text-sm font-medium text-gray-500">
              Didn't receive the code?{' '}
              <button
                onClick={handleResend}
                disabled={timeLeft > 0}
                className="text-[#5B4F80] font-bold hover:text-[#433A5E] disabled:text-gray-400 transition-colors ml-1"
              >
                Resend Code
              </button>
            </p>

            <div className="flex items-center gap-2 text-[#8C8C8C] bg-[#F8F6F0] px-4 py-1.5 rounded-full">
              <Clock size={12} />
              <span className="text-[10px] font-extrabold uppercase tracking-widest">
                Code expires in {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        {/* Unique Verification Footer */}
        <div className="mt-12 flex flex-col items-center text-center max-w-sm">
          <div className="w-8 h-1 bg-[#EFEBE1] rounded-full mb-6"></div>
          <p className="text-xs font-medium text-[#A1A1AA] leading-relaxed mb-6">
            Securing your medical data with organic precision and clinical excellence.
          </p>
          <Leaf size={16} className="text-[#EFEBE1]" />
        </div>

      </main>
    </div>
  );
};

export default VerifyAccountPage;