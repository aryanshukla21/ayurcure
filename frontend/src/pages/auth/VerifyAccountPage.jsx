import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Timer } from 'lucide-react';
import { authApi } from '../../api/authApi';

const VerifyAccountPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract email/phone passed from Step 1
  const { email, phone } = location.state || {};

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  // Timer and API States
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');

  // 30-Second Reverse Timer Logic
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== "" && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    setIsResending(true);
    setError('');

    try {
      // Call backend to generate and send new OTP
      await authApi.resendOtp({ phone });

      // Reset timer and block resend
      setTimer(30);
      setCanResend(false);
      setOtp(new Array(6).fill(""));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP. Try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length < 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Verify OTP with backend
      await authApi.verifyPhoneOtp({ phone, otp: otpValue });

      // On success, proceed to Step 3, passing the verified data
      navigate('/profile-completion', {
        state: { phone, otpValue }
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F5F1E8] text-[#1d1b16] min-h-screen flex flex-col font-['Manrope']">

      {/* TopAppBar */}
      <header className="flex flex-col items-center justify-center w-full py-8 px-4">
        <div className="flex flex-col items-center gap-4">
          <span className="text-2xl font-['Noto_Serif'] font-bold text-[#5C7F63] tracking-tighter">AyurCare360</span>
          <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm bg-white flex items-center justify-center">
            <img alt="AyurCare360 Logo" className="w-full h-full object-cover p-2 rounded-full" src="/Favicon_up.png" />
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center px-4 py-8 relative">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#fedb98]/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5C7F63]/5 rounded-full blur-3xl -z-10 -translate-x-1/4 translate-y-1/4"></div>

        {/* Verification Card */}
        <section className="w-full max-w-md bg-[#F9F6F0] rounded-xl p-8 md:p-10 text-center shadow-sm relative overflow-hidden">

          {/* Step Indicator */}
          <div className="flex justify-center gap-2 mb-10">
            <div className="h-1 w-8 rounded-full bg-[#5C7F63]/40"></div>
            <div className="h-1 w-8 rounded-full bg-[#5C7F63]"></div>
            <div className="h-1 w-8 rounded-full bg-[#e8e2d8]"></div>
            <div className="h-1 w-8 rounded-full bg-[#e8e2d8]"></div>
          </div>

          <span className="font-semibold text-[10px] tracking-widest uppercase text-[#414941] mb-4 block">
            Step 2 of 4
          </span>
          <h1 className="text-3xl md:text-4xl font-['Noto_Serif'] italic tracking-tight text-[#5C7F63] mb-3">
            Verify your number
          </h1>
          <p className="font-medium text-sm text-[#414941] mb-6">
            We’ve sent a 6-digit code to your mobile number
          </p>

          {error && <p className="text-red-500 text-xs font-bold mb-4">{error}</p>}

          {/* OTP Input Grid */}
          <form className="space-y-10" onSubmit={handleSubmit}>
            <div className="flex justify-between gap-2 max-w-xs mx-auto">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  name="otp"
                  maxLength="1"
                  placeholder="•"
                  className="w-10 h-14 text-center text-xl font-bold rounded-lg bg-white border border-[#c1c9bf]/40 focus:ring-1 focus:ring-[#5C7F63] focus:border-[#5C7F63] outline-none transition-all duration-200"
                  value={data}
                  onChange={e => handleChange(e.target, index)}
                  onFocus={e => e.target.select()}
                  disabled={isLoading}
                />
              ))}
            </div>

            <div className="flex flex-col gap-6">
              <button
                className="w-full bg-[#5C7F63] text-white py-4 rounded-lg font-bold text-base hover:opacity-90 transition-all duration-300 scale-100 active:scale-95 shadow-sm disabled:opacity-50"
                type="submit"
                disabled={isLoading || isResending}
              >
                {isLoading ? 'Verifying...' : 'Verify & Continue'}
              </button>

              <div className="flex items-center justify-center gap-2 group">
                <Timer size={18} className="text-[#414941]" />
                {timer > 0 ? (
                  <span className="text-sm text-[#414941] font-medium">
                    Resend code in <span className="text-[#5C7F63] font-bold">0:{timer < 10 ? `0${timer}` : timer}</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isResending || isLoading}
                    className="text-sm font-bold text-[#5C7F63] hover:underline cursor-pointer disabled:opacity-50"
                  >
                    {isResending ? 'Sending...' : 'Resend OTP now'}
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* Ritual Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#e8e2d8] overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#5C7F63] to-[#735b24] w-2/4"></div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 w-full py-8 px-4 bg-transparent mt-auto">
        <span className="text-[10px] tracking-widest uppercase text-[#414941]">
          © {new Date().getFullYear()} AYURCARE360
        </span>
        <div className="flex space-x-6">
          <Link className="text-[10px] tracking-widest uppercase text-[#414941] hover:text-[#5C7F63] transition-colors duration-300" to="/privacy">
            Privacy Policy
          </Link>
          <Link className="text-[10px] tracking-widest uppercase text-[#414941] hover:text-[#5C7F63] transition-colors duration-300" to="/terms">
            Terms & Conditions
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default VerifyAccountPage;