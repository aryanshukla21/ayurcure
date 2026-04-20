import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Clock, Leaf, Loader2 } from 'lucide-react';
import { authApi } from '../../api/authApi';

const VerifyAccountPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [emailOtp, setEmailOtp] = useState(new Array(6).fill(""));
  const [phoneOtp, setPhoneOtp] = useState(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(299);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const emailRefs = useRef([]);
  const phoneRefs = useRef([]);

  const registrationData = location.state?.registrationData;

  useEffect(() => {
    if (!registrationData) {
      navigate('/signup');
    }
  }, [registrationData, navigate]);

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

  const handleOtpChange = (e, index, type) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const currentArr = type === 'email' ? [...emailOtp] : [...phoneOtp];
    const currentRefs = type === 'email' ? emailRefs : phoneRefs;

    currentArr[index] = value.substring(value.length - 1);

    if (type === 'email') setEmailOtp(currentArr);
    else setPhoneOtp(currentArr);

    if (value && index < 5 && currentRefs.current[index + 1]) {
      currentRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index, type) => {
    const currentArr = type === 'email' ? emailOtp : phoneOtp;
    const currentRefs = type === 'email' ? emailRefs : phoneRefs;

    if (e.key === 'Backspace' && !currentArr[index] && index > 0 && currentRefs.current[index - 1]) {
      currentRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const emailCode = emailOtp.join('');
    const phoneCode = phoneOtp.join('');

    if (emailCode.length === 6 && phoneCode.length === 6) {
      setIsVerifying(true);
      try {
        const payload = {
          ...registrationData,
          emailOtp: emailCode,
          phoneOtp: phoneCode
        };
        await authApi.verifyAndRegister(payload);
        navigate('/login', { state: { message: 'Account verified successfully. Please login.' } });
      } catch (error) {
        setErrorMsg(error.response?.data?.error || 'Verification failed. Please check the codes.');
      } finally {
        setIsVerifying(false);
      }
    } else {
      setErrorMsg('Please complete both 6-digit verification codes.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#F5EFE6]/40 to-transparent blur-3xl"></div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 w-full py-12">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-12 h-12 bg-[#52735B] rounded-xl flex items-center justify-center text-white mb-6 shadow-sm">
            <Shield size={22} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Verify Your Account</h1>
          <p className="text-sm text-gray-500">We've sent verification codes to your Email and Phone.</p>
        </div>

        <div className="w-full max-w-[420px] bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EFEBE1]/50">

          {errorMsg && <div className="mb-6 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100 text-center">{errorMsg}</div>}

          <form onSubmit={handleVerify} className="flex flex-col gap-6">

            {/* Email OTP */}
            <div>
              <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2 block">Email Code</label>
              <div className="flex items-center justify-between gap-2">
                {emailOtp.map((digit, index) => (
                  <input
                    key={`email-${index}`}
                    ref={(el) => (emailRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index, 'email')}
                    onKeyDown={(e) => handleKeyDown(e, index, 'email')}
                    className="w-11 h-14 bg-[#F8F6F0] rounded-xl text-center text-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#52735B]/30 border border-transparent focus:border-[#EFEBE1]"
                    maxLength={1}
                  />
                ))}
              </div>
            </div>

            {/* Phone OTP */}
            <div>
              <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2 block">Phone Code</label>
              <div className="flex items-center justify-between gap-2">
                {phoneOtp.map((digit, index) => (
                  <input
                    key={`phone-${index}`}
                    ref={(el) => (phoneRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index, 'phone')}
                    onKeyDown={(e) => handleKeyDown(e, index, 'phone')}
                    className="w-11 h-14 bg-[#F8F6F0] rounded-xl text-center text-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#52735B]/30 border border-transparent focus:border-[#EFEBE1]"
                    maxLength={1}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={emailOtp.join('').length !== 6 || phoneOtp.join('').length !== 6 || isVerifying}
              className="w-full mt-4 bg-[#52735B] hover:bg-[#425E4A] disabled:bg-[#52735B]/60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm flex justify-center items-center"
            >
              {isVerifying ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Registration"}
            </button>
          </form>

          <div className="mt-8 text-center flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-[#8C8C8C] bg-[#F8F6F0] px-4 py-1.5 rounded-full">
              <Clock size={12} />
              <span className="text-[10px] font-extrabold uppercase tracking-widest">
                Codes expire in {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerifyAccountPage;