import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, ChevronLeft, Loader2, AlertCircle } from 'lucide-react';
import AppointmentSuccessModal from '../../components/patient/book-appointment/AppointmentSuccessModal';

const ConsultationPaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Data passed from the booking page
    const { appointmentData, summaryData } = location.state || {};

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null); // 'success' | 'cancelled' | null

    // Security check: if accessed directly without data, kick them back
    useEffect(() => {
        if (!appointmentData) navigate('/patient/book-appointment');
    }, [appointmentData, navigate]);

    const handlePayNow = () => {
        setIsProcessing(true);
        // Simulate payment gateway delay (Razorpay/Stripe mock)
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentStatus('success');
        }, 2500);
    };

    const handleCancelPayment = () => {
        setPaymentStatus('cancelled');
    };

    const totalAmount = summaryData?.fees
        ? (parseFloat(summaryData.fees.consultation) + parseFloat(summaryData.fees.taxes) + parseFloat(summaryData.fees.platform_fee)).toFixed(2)
        : "0.00";

    return (
        <div className="max-w-[1200px] mx-auto p-10 bg-[#FDF9EE] min-h-full">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-[#4A7C59] font-bold mb-8 transition-colors"
            >
                <ChevronLeft size={20} /> Back to Booking
            </button>

            <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#4A7C59] p-3 rounded-2xl text-white shadow-md">
                    <CreditCard size={28} />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Complete Payment</h1>
                    <p className="text-gray-500 font-medium mt-1">Secure checkout for your upcoming consultation</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Side: Payment Interface */}
                <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-50 text-[#4A7C59] px-4 py-2 rounded-bl-2xl font-bold text-xs flex items-center gap-1 border-b border-l border-green-100">
                        <ShieldCheck size={14} /> 100% Secure SSL
                    </div>

                    <h3 className="text-xl font-bold mb-6 mt-4">Payment Details</h3>

                    <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">Total Amount Payable</p>
                        <p className="text-4xl font-extrabold text-gray-900">₹{totalAmount}</p>
                    </div>

                    <button
                        onClick={handlePayNow}
                        disabled={isProcessing}
                        className="w-full bg-[#4A7C59] hover:bg-[#3A6447] disabled:bg-[#4A7C59]/70 text-white py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
                    >
                        {isProcessing ? <><Loader2 className="animate-spin" size={24} /> Processing Payment...</> : 'Pay Securely'}
                    </button>

                    <button
                        onClick={handleCancelPayment}
                        disabled={isProcessing}
                        className="w-full mt-4 text-red-500 hover:text-red-600 font-bold py-4 rounded-2xl hover:bg-red-50 transition-colors"
                    >
                        Cancel Transaction
                    </button>
                </div>

                {/* Right Side: Order Summary */}
                <div className="bg-white rounded-[32px] p-8 border border-[#EFEBE1] shadow-sm h-fit">
                    <h3 className="text-lg font-bold mb-6">Consultation Summary</h3>

                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between border-b border-gray-100 pb-4">
                            <span className="text-gray-500 font-medium">Doctor</span>
                            <span className="font-bold text-gray-900">{summaryData?.doctor?.name}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-4">
                            <span className="text-gray-500 font-medium">Date & Time</span>
                            <span className="font-bold text-[#4A7C59]">{appointmentData?.date} at {appointmentData?.time}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-4">
                            <span className="text-gray-500 font-medium">Consultation Fee</span>
                            <span className="font-bold text-gray-900">₹{summaryData?.fees?.consultation}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-4">
                            <span className="text-gray-500 font-medium">Platform Fee</span>
                            <span className="font-bold text-gray-900">₹{summaryData?.fees?.platform_fee}</span>
                        </div>
                        <div className="flex justify-between pt-2">
                            <span className="text-gray-900 font-extrabold text-lg">Total</span>
                            <span className="font-extrabold text-[#4A7C59] text-xl">₹{totalAmount}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* SUCCESS MODAL */}
            <AppointmentSuccessModal
                isOpen={paymentStatus === 'success'}
                onClose={() => navigate('/patient/appointments')}
                appointmentDetails={{
                    doctorName: summaryData?.doctor?.name,
                    date: appointmentData?.date,
                    time: appointmentData?.time,
                    id: 'PAY-SUCCESS'
                }}
            />

            {/* CANCELLED MODAL */}
            {paymentStatus === 'cancelled' && (
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[32px] p-10 max-w-md w-full shadow-2xl text-center relative animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle size={40} className="text-red-500" />
                        </div>
                        <h2 className="text-3xl font-extrabold mb-4 text-gray-900">Payment Cancelled</h2>
                        <p className="text-gray-500 font-medium mb-8">Your appointment has not been booked because the payment was cancelled. You can try booking again.</p>
                        <button
                            onClick={() => navigate('/patient/book-appointment')}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 rounded-2xl transition-colors"
                        >
                            Return to Booking
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConsultationPaymentPage;