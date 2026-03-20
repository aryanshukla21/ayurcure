import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, MapPin } from 'lucide-react';
import { ecommerceApi } from '../../api/ecommerceApi';

// Components
import BillingForm from '../../components/patient/checkout/BillingForm';
import PaymentMethods from '../../components/patient/checkout/PaymentMethods';
import CheckoutSummary from '../../components/patient/checkout/CheckoutSummary';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // UI Mock Data matching the design
    const [formData, setFormData] = useState({
        fullName: 'Aarav Sharma',
        email: 'aarav.sharma@example.com',
        mobile: '+91 98765 43210',
        address: 'Flat 402, Lotus Residency, Near Central Park',
        city: 'Mumbai',
        postalCode: '400001'
    });

    const [selectedPayment, setSelectedPayment] = useState('card'); // 'wallet', 'card', 'cod'

    // Static pricing from Cart context
    const subtotal = 49.99;
    const tax = 4.50;
    const total = subtotal + tax;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePayNow = async () => {
        setIsSubmitting(true);
        try {
            // Mocking cart items for the backend call
            const mockOrderData = {
                items: [{ product_id: '1', quantity: 1, price: 24.99 }, { product_id: '2', quantity: 2, price: 12.50 }],
                total_amount: total,
                discount_applied: 0,
                shipping_address: `${formData.address}, ${formData.city} - ${formData.postalCode}`,
                payment_method: selectedPayment === 'cod' ? 'Cash' : 'Online'
            };

            await ecommerceApi.placeOrder(mockOrderData);

            // Navigate to Success modal/page (Page 18)
            // For now, we simulate success and go back to store or order history
            alert('Order Placed Successfully!');
            navigate('/patient/pharmacy-orders');

        } catch (error) {
            console.error('Order placement failed:', error);
            // Fallback for UI demonstration if backend is down
            alert('Mock Order Placed Successfully!');
            navigate('/patient/pharmacy-orders');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDF9EE] p-4 md:p-8 font-sans pb-24">

            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Billing Details</h1>
                <p className="text-gray-600 text-sm md:text-base">
                    Complete your pharmacy order with secure checkout.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">

                {/* Left Column: Forms */}
                <div className="flex-1 flex flex-col gap-6">
                    <BillingForm formData={formData} handleInputChange={handleInputChange} />
                    <PaymentMethods selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} />

                    {/* Wellness Tip */}
                    <div className="bg-[#FDF3E1] border border-[#F5E6CC] rounded-2xl p-5 flex gap-4 w-full md:w-2/3">
                        <div className="bg-[#EBCB8B] w-1 h-full rounded-full"></div>
                        <div>
                            <span className="text-[10px] font-bold tracking-wider text-[#B8860B] uppercase block mb-1">WELLNESS TIP</span>
                            <p className="text-sm text-gray-800 font-medium">Stay hydrated with herbal infusions for natural vitality.</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Order Summary & Info Cards */}
                <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 flex flex-col gap-6">
                    <CheckoutSummary
                        subtotal={subtotal}
                        tax={tax}
                        total={total}
                        onPayNow={handlePayNow}
                        isSubmitting={isSubmitting}
                    />

                    {/* Eco-Friendly Delivery Info */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex gap-4 items-start">
                        <div className="bg-[#E8F0E9] p-2 rounded-full text-[#4A7C59] shrink-0">
                            <Leaf size={18} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-[#37822e] mb-1">Eco-Friendly Delivery</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Your medicines will be delivered in biodegradable packaging within 24 hours.
                            </p>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="bg-[#2D5A27] rounded-3xl overflow-hidden relative h-48 shadow-md">
                        {/* Abstract map graphics */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-16 h-16 bg-[#EBCB8B] rounded-full flex items-center justify-center shadow-lg border-4 border-white/20">
                                <div className="w-6 h-6 bg-white rounded-full"></div>
                            </div>
                            {/* Pin tail */}
                            <div className="w-0 h-0 border-l-8 border-r-8 border-t-[12px] border-transparent border-t-[#EBCB8B] absolute -bottom-2 left-1/2 transform -translate-x-1/2"></div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-xl py-2 px-3 text-center">
                            <span className="text-xs font-bold text-gray-800 flex items-center justify-center gap-1">
                                <MapPin size={12} />
                                Delivery to {formData.postalCode || '400001'}
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;