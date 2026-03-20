import React, { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';
import CartItem from '../../components/patient/cart/CartItem';
import OrderSummaryPanel from '../../components/patient/cart/OrderSummaryPanel';

// Exact mock data matching the UI calculations
const MOCK_CART_ITEMS = [
    {
        id: '1',
        name: 'Ashwagandha Premium Capsules',
        description: '60 Capsules • Stress Relief',
        price: 24.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1611078443555-b16eb3291244?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
        id: '2',
        name: 'Triphala Churna',
        description: '100g • Digestive Health',
        price: 12.50, // 12.50 * 2 = 25.00
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
];

const CartSummary = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch delay for cart hydration
        const fetchCart = setTimeout(() => {
            setCartItems(MOCK_CART_ITEMS);
            setLoading(false);
        }, 600);
        return () => clearTimeout(fetchCart);
    }, []);

    const updateQuantity = (id, newQuantity) => {
        setCartItems(items =>
            items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
        );
    };

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    // Calculations
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const taxes = 4.50; // Static estimation as per UI
    const total = subtotal + taxes;

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full min-h-screen bg-[#FDFBF7]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D5A27]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDF9EE] p-4 md:p-8 font-sans pb-24">

            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Cart Summary</h1>
                <p className="text-gray-600 text-sm md:text-base">
                    Review your selection for a holistic wellness journey.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">

                {/* Left Column: Cart Items */}
                <div className="flex-1">
                    {cartItems.length > 0 ? (
                        <div className="bg-[#fdf7e7] rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-6">
                            {cartItems.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    updateQuantity={updateQuantity}
                                    removeItem={removeItem}
                                />
                            ))}

                            {/* Promo Message */}
                            <div className="mt-8 bg-[#FDFBF7] border border-[#E8E3D8] rounded-2xl p-4 flex items-start sm:items-center gap-3">
                                <div className="bg-[#8B6A47]/10 p-2 rounded-full text-[#8B6A47] shrink-0">
                                    <Leaf size={16} />
                                </div>
                                <p className="text-sm text-gray-700">
                                    You are <span className="font-bold">$10.01</span> away from <span className="font-bold">Free Herbal Tea Sampler</span>. Add more to your wellness kit!
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                            <p className="text-gray-500">Add some holistic products to begin your wellness journey.</p>
                        </div>
                    )}
                </div>

                {/* Right Column: Order Summary */}
                <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0">
                    <OrderSummaryPanel
                        subtotal={subtotal}
                        taxes={taxes}
                        total={total}
                    />
                </div>

            </div>
        </div>
    );
};

export default CartSummary;