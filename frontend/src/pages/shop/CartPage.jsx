import React from 'react';
import { Navbar } from '../../components/landing/Navbar';
import { CartItemsList } from '../../components/shop/cartPage/CartItemsList';
import { CouponCode } from '../../components/shop/cartPage/CouponCode';
import { OrderSummaryCard } from '../../components/shop/cartPage/OrderSummaryCard';
import { ProductRecommendations } from '../../components/shop/cartPage/ProductRecommendations';
// import { Footer } from '../../components/landing/Footer'; 

export const CartPage = () => {
    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans flex flex-col">
            {/* <Navbar /> */}

            {/* Breadcrumb / Top Navigation */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex gap-4 text-sm font-medium">
                    <a href="/" className="text-gray-400 hover:text-ayur-green transition-colors">Home</a>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-900 font-bold">Shopping Cart</span>
                </div>
            </div>

            <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 py-12">
                <div className="flex justify-between items-end mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Your Cart</h1>
                    <span className="text-gray-500 font-medium">3 items</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column: Cart Items & Coupon */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        <CartItemsList />
                        <CouponCode />
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-4">
                        <OrderSummaryCard />
                    </div>
                </div>

                {/* Cross-sell Section */}
                <div className="mt-20">
                    <ProductRecommendations />
                </div>
            </main>

            {/* <Footer /> */}
        </div>
    );
};