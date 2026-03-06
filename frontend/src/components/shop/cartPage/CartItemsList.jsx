import React from 'react';
import { CartItemCard } from './CartItemCard';

export const CartItemsList = () => {
    const cartItems = [
        {
            id: 1,
            name: 'Organic Ashwagandha Capsules',
            variant: '60 Capsules - 500mg',
            price: '$24.99',
            quantity: 1,
            icon: '🌿'
        },
        {
            id: 2,
            name: 'Pure Brahmi Powder',
            variant: '100g - Certified Organic',
            price: '$15.00',
            quantity: 1,
            icon: '🍃'
        },
        {
            id: 3,
            name: 'Raw Turmeric Honey',
            variant: '250ml - Hand-crafted',
            price: '$18.50',
            quantity: 2,
            icon: '🍯'
        }
    ];

    return (
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 divide-y divide-gray-50">
            {cartItems.map(item => (
                <CartItemCard key={item.id} item={item} />
            ))}
        </div>
    );
};