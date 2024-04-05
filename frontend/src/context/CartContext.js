import React, { createContext, useState, useContext, useEffect} from 'react';
import CartService from '../services/CartService';
import { AuthContext } from '../context/AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const { currentUser } = useContext(AuthContext); // 

    const fetchCart = async () => {
        if (currentUser) {
            const cartData = await CartService.fetchCart(currentUser.token);
            setCart(cartData);
        }
    };

    const addToCart = async (productId, quantity) => {
        if (currentUser) {
            await CartService.addToCart(productId, quantity, currentUser.token);
            fetchCart();
        }
    };

    const removeFromCart = async (productId, quantity) => {
        if (currentUser) {
            await CartService.removeFromCart(productId, quantity, currentUser.token);
            fetchCart();
        }
    };

    const clearCart = async () => {
        if (currentUser) {
            await CartService.clearCart(currentUser.token);
            fetchCart();
        }
    };

    const fetchTotalAmount = async () => {
        if (currentUser) {
            const total = await CartService.fetchTotalAmount(currentUser.token);
            setTotalAmount(total);
        }
    };

    useEffect(() => {
        fetchCart();
        fetchTotalAmount();
    }, [currentUser, addToCart, removeFromCart]);

    return (
        <CartContext.Provider value={{ cart, totalAmount, addToCart, removeFromCart, clearCart, fetchTotalAmount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
