import React, { createContext, useState, useContext, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import OrderService from '../services/OrderService';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const { cart } = useCart();

  const createOrder = async (orderData) => {
    try {
      const response = await OrderService.createOrder(orderData);
      console.log("Order created, response data:", response.data);
      setOrderDetails(response.data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const createOrderWithDetails = (contactData) => {
    const newOrderDetails = {
      products: cart, 
      contactDetails: contactData,
      totalAmount: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    };
    console.log("New Order Details:", newOrderDetails);
    setOrderDetails(newOrderDetails); // Zapisz szczegóły zamówienia
  };

  const fetchUserOrders = async () => {
    try {
      const response = await OrderService.getUserOrders();
      setUserOrders(response.data); // Ustawienie zamówień użytkownika
    } catch (error) {
      console.error('Error fetching user orders:', error);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);



  return (
    <OrderContext.Provider value={{ orderDetails, createOrder, createOrderWithDetails, userOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
