import React from 'react';
import { CreditCard, Wallet, Banknote } from 'lucide-react';

const PaymentMethods = ({ selectedPayment, setSelectedPayment }) => {
    const methods = [
        { id: 'wallet', label: 'Digital Wallet', icon: Wallet },
        { id: 'card', label: 'Card Payment', icon: CreditCard },
        { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
    ];

    return (
        <div className="bg-[#fdf6e5] rounded-3xl p-6 md:p-8 border border-[#E8E3D8]">
            <h3 className="text-xs font-bold tracking-wider text-gray-400 uppercase block mb-4">Preferred Payment</h3>
            <div className="flex flex-wrap gap-3">
                {methods.map((method) => {
                    const Icon = method.icon;
                    const isActive = selectedPayment === method.id;
                    return (
                        <button
                            key={method.id}
                            onClick={() => setSelectedPayment(method.id)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all ${isActive
                                ? 'bg-white border-2 border-[#37822e] text-gray-900 shadow-sm'
                                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 shadow-sm'
                                }`}
                        >
                            <Icon size={16} className={isActive ? 'text-[#2D5A27]' : 'text-gray-500'} />
                            {method.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default PaymentMethods;