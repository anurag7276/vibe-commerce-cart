import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// 1. Create the Context
const CartContext = createContext();

// 2. Create a "hook" to make it easy to use the context
export const useCart = () => {
  return useContext(CartContext);
};

// 3. Create the Provider Component
// This component will wrap our entire app and provide the cart's value.
export const CartProvider = ({ children }) => {
  // --- State ---
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // --- Function to fetch the cart from the API ---
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/cart');
      setCartItems(res.data.items);
      setCartTotal(res.data.total);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- Fetch the cart when the app first loads ---
  useEffect(() => {
    fetchCart();
  }, []);

  // --- Function to add an item to the cart ---
  const addToCart = async (productId, qty) => {
    try {
      // Tell the backend to add the item
      await axios.post('/api/cart', { productId, qty });
      // Refresh the cart data from the backend to show the new state
      fetchCart();
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // --- Function to remove an item from the cart ---
  const removeFromCart = async (id) => {
    try {
      // Tell the backend to delete the item
      await axios.delete(`/api/cart/${id}`);
      // Refresh the cart data
      fetchCart();
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  // 4. "Provide" the values (state and functions) to all children
  const value = {
    cartItems,
    cartTotal,
    loading,
    addToCart,
    removeFromCart,
    fetchCart // We'll need this for checkout
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};