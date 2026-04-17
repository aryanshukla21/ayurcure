import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, MapPin, Loader2 } from 'lucide-react';
import { ecommerceApi } from '../../api/ecommerceApi';
import { patientApi } from '../../api/patientApi';
import { useCart } from '../../context/CartContext';

import BillingForm from '../../components/patient/checkout/BillingForm';
import PaymentMethods from '../../components/patient/checkout/PaymentMethods';
import CheckoutSummary from '../../components/patient/checkout/CheckoutSummary';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cartItems, cartTotal, clearCart } = useCart();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [selectedPayment, setSelectedPayment] = useState('card');

    const [formData, setFormData] = useState({
        fullName: '', email: '', mobile: '', address: '', city: '', postalCode: ''
    });

    const tax = cartItems.length > 0 ? 4.50 : 0;
    const total = cartTotal + tax;

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Fetch granular personal profile to prefill billing
                const response = await patientApi.getProfilePersonal();
                const profile = response.profile || response || {};

                setFormData({
                    fullName: profile.name || profile.full_name || '',
                    email: profile.email || '',
                    mobile: profile.phone || '',
                    address: profile.address || '',
                    city: '',
                    postalCode: ''
                });
            } catch (error) {
                console.error('Failed to load profile details', error);
            } finally {
                setIsLoadingProfile(false);
            }
        };
        fetchUserProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePayNow = async () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty. Please add items to proceed.");
            return;
        }

        setIsSubmitting(true);
        try {
            const orderData = {
                items: cartItems.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                total_amount: total,
                discount_applied: 0,
                shipping_address: `${formData.address}, ${formData.city} - ${formData.postalCode}`,
                payment_method: selectedPayment === 'cod' ? 'Cash' : 'Online'
            };

            await ecommerceApi.createOrder(orderData);
            clearCart();
            navigate('/patient/pharmacy-orders');
        } catch (error) {
            console.error('Order placement failed:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoadingProfile) {
        return <div className="flex items-center justify-center min-h-screen bg-[#FDF9EE]"><Loader2 className="w-10 h-10 text-[#4A7C59] animate-spin" /></div>;
    }

    return (
        <div className="min-h-screen bg-[#FDF9EE] p-4 md:p-8 font-sans pb-24">
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Billing Details</h1>
                <p className="text-gray-600 text-sm md:text-base">Complete your pharmacy order with secure checkout.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex-1 flex flex-col gap-6">
                    <BillingForm formData={formData} handleInputChange={handleInputChange} />
                    <PaymentMethods selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} />

                    <div className="bg-[#FDF3E1] border border-[#F5E6CC] rounded-2xl p-5 flex gap-4 w-full md:w-2/3">
                        <div className="bg-[#EBCB8B] w-1 h-full rounded-full"></div>
                        <div>
                            <span className="text-[10px] font-bold tracking-wider text-[#B8860B] uppercase block mb-1">WELLNESS TIP</span>
                            <p className="text-sm text-gray-800 font-medium">Stay hydrated with herbal infusions for natural vitality.</p>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 flex flex-col gap-6">
                    <CheckoutSummary subtotal={cartTotal} tax={tax} total={total} onPayNow={handlePayNow} isSubmitting={isSubmitting} />

                    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex gap-4 items-start">
                        <div className="bg-[#E8F0E9] p-2 rounded-full text-[#4A7C59] shrink-0"><Leaf size={18} /></div>
                        <div>
                            <h4 className="text-sm font-bold text-[#37822e] mb-1">Eco-Friendly Delivery</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">Your medicines will be delivered in biodegradable packaging.</p>
                        </div>
                    </div>

                    <div className="bg-[#2D5A27] rounded-3xl overflow-hidden relative h-48 shadow-md">
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-xl py-2 px-3 text-center">
                            <span className="text-xs font-bold text-gray-800 flex items-center justify-center gap-1">
                                <MapPin size={12} /> Delivery to {formData.postalCode || 'Postal Code'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;