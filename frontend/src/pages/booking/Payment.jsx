import React from 'react';
import { Button } from '../../components/common/Button';

export const Payment = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-[32px] shadow-xl overflow-hidden">

        {/* Header & Progress */}
        <div className="p-8 border-b border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <span className="text-ayur-orange">🌿</span> AyurCure Payment
            </h2>
            <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
              ✕
            </button>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-gray-500">Step 4 of 4: Payment</span>
            <span className="text-sm font-bold text-ayur-orange">100%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-ayur-orange w-full"></div>
          </div>
          <p className="text-sm text-gray-400 mt-4 italic">Securing your session with our Ayurvedic specialist</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* Left: Booking Summary */}
          <div className="p-10 bg-gray-50/50 border-r border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-8">Booking Summary</h3>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 mb-8">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-50">
                <div className="w-16 h-16 bg-ayur-green-light rounded-2xl flex-shrink-0"></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-ayur-orange mb-1">Confirmed Specialist</p>
                  <h4 className="font-bold text-gray-800">Dr. Ananya Sharma</h4>
                  <p className="text-sm text-gray-500">Ayurvedic Practitioner (MD)</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm font-bold text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-ayur-orange">📅</span> Oct 24, 2023
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-ayur-orange">🕒</span> 10:30 AM (45m)
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Consultation Fee</span>
                <span>$50.00</span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium pb-6 border-b border-gray-100">
                <span>Service Tax (GST 10%)</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-gray-800">Total Amount</span>
                <span className="text-2xl font-black text-ayur-orange">$55.00</span>
              </div>
            </div>
          </div>

          {/* Right: Payment Method */}
          <div className="p-10">
            <h3 className="text-xl font-bold text-gray-800 mb-8">Payment Method</h3>

            <div className="space-y-4 mb-10">
              {/* Credit Card Option (Active) */}
              <div className="border-2 border-ayur-orange rounded-2xl p-6 bg-orange-50/30">
                <div className="flex items-center gap-3 mb-6">
                  <input type="radio" checked readOnly className="w-5 h-5 accent-ayur-orange" />
                  <span className="font-bold text-gray-800">Credit / Debit Card</span>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-orange outline-none"
                  />
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="w-1/2 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-orange outline-none"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-1/2 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-orange outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* UPI Option */}
              <div className="border border-gray-200 rounded-2xl p-6 flex items-center gap-3 hover:border-gray-300 cursor-pointer transition-colors">
                <input type="radio" readOnly className="w-5 h-5 accent-ayur-orange" />
                <span className="font-bold text-gray-700">UPI (GPay, PhonePe, etc.)</span>
              </div>

              {/* Net Banking Option */}
              <div className="border border-gray-200 rounded-2xl p-6 flex items-center gap-3 hover:border-gray-300 cursor-pointer transition-colors">
                <input type="radio" readOnly className="w-5 h-5 accent-ayur-orange" />
                <span className="font-bold text-gray-700">Wallets & Net Banking</span>
              </div>
            </div>

            <Button variant="primary" className="w-full py-5 text-lg rounded-xl shadow-xl shadow-ayur-orange/20 flex items-center justify-center gap-2">
              🔒 Pay $55.00 & Confirm Appointment
            </Button>

            <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed px-4">
              Your payment is encrypted and secure. By clicking Pay, you agree to AyurCure's Terms of Service and cancellation policy.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};