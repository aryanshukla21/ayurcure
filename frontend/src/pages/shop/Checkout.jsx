import React, { useState } from 'react';
import { Button } from '../../components/common/Button';

export const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  const cartItems = [
    { name: "Organic Ashwagandha Root Powder", size: "60 Caps", price: 24.00, qty: 1, img: "🌿" },
    { name: "Brahmi Mind & Clarity Elixir", size: "100ml", price: 45.00, qty: 2, img: "💧" }
  ];

  const subtotal = 114.00;
  const shipping = 5.00;
  const total = 119.00;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Secure Checkout</h1>
          <p className="text-gray-500 mt-2">Almost there! Complete your order to start your wellness journey.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Forms */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Shipping Address */}
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-ayur-green text-white flex items-center justify-center text-sm">1</span>
                Shipping Address
              </h3>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Full Name</label>
                  <input type="text" placeholder="e.g. Aria Sharma" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Email Address</label>
                  <input type="email" placeholder="aria@example.com" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Phone Number</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Street Address</label>
                  <input type="text" placeholder="123 Wellness Ave, Suite 100" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">City</label>
                  <input type="text" placeholder="Seattle" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none" />
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">State</label>
                    <input type="text" placeholder="WA" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none" />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">ZIP Code</label>
                    <input type="text" placeholder="98101" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-green outline-none" />
                  </div>
                </div>
              </form>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-ayur-green text-white flex items-center justify-center text-sm">2</span>
                Payment Method
              </h3>

              <div className="space-y-4">
                {/* Card Option */}
                <div 
                  className={`border-2 rounded-2xl p-6 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-ayur-orange bg-orange-50/30' : 'border-gray-100 hover:border-gray-200'}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-ayur-orange' : 'border-gray-300'}`}>
                      {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-ayur-orange rounded-full"></div>}
                    </div>
                    <span className="font-bold text-gray-800">Credit / Debit Card</span>
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <input type="text" placeholder="Card Number" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-orange outline-none bg-white" />
                      <div className="flex gap-4">
                        <input type="text" placeholder="MM / YY" className="w-1/2 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-orange outline-none bg-white" />
                        <input type="text" placeholder="CVV" className="w-1/2 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ayur-orange outline-none bg-white" />
                      </div>
                    </div>
                  )}
                </div>

                {/* PayPal Option */}
                <div 
                  className={`border-2 rounded-2xl p-6 cursor-pointer transition-colors flex items-center gap-3 ${paymentMethod === 'paypal' ? 'border-ayur-orange bg-orange-50/30' : 'border-gray-100 hover:border-gray-200'}`}
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'paypal' ? 'border-ayur-orange' : 'border-gray-300'}`}>
                    {paymentMethod === 'paypal' && <div className="w-2.5 h-2.5 bg-ayur-orange rounded-full"></div>}
                  </div>
                  <span className="font-bold text-gray-800">PayPal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>
              
              <div className="space-y-6 mb-8">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-ayur-green-light flex items-center justify-center text-2xl flex-shrink-0">
                      {item.img}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1">{item.name}</h4>
                      <p className="text-xs text-gray-500 mb-2">{item.size} × {item.qty}</p>
                      <p className="font-black text-ayur-green">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-100 mb-8">
                <div className="flex justify-between text-gray-500 text-sm font-medium">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm font-medium">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-black text-ayur-orange">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button variant="primary" className="w-full py-5 text-lg rounded-xl shadow-xl shadow-ayur-orange/20">
                Place Order
              </Button>
              
              <p className="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-1">
                <span>🔒</span> Secure 256-bit SSL Encryption
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};