import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // Initialize cart from localStorage so it persists on refresh
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('ayurcure_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('ayurcure_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantityToAdd = 1) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantityToAdd }
                        : item
                );
            }
            return [...prev, { ...product, quantity: quantityToAdd }];
        });
    };

    const updateQuantity = (productId, newQuantity) => {
        setCartItems(prev => {
            if (newQuantity <= 0) return prev.filter(item => item.id !== productId);
            return prev.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item);
        });
    };

    // Calculate dynamic cart totals globally
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, cartCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};