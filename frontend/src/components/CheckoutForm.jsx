import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const CheckoutForm = () => {
  // Get cart total and the ability to refresh the cart
  const { cartTotal, fetchCart } = useCart();

  // State for the form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // State to hold the mock receipt
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page from reloading
    setError(null);
    setReceipt(null);

    try {
      // Call the backend checkout endpoint
      const res = await axios.post('/api/cart/checkout');

      // Save the mock receipt from the backend
      setReceipt(res.data);

      // Clear the form
      setName('');
      setEmail('');

      
      fetchCart();

    } catch (err) {
      setError('Checkout failed. Please try again.');
      console.error(err);
    }
  };

  // Don't show the form if the cart is empty
  if (cartTotal <= 0 && !receipt) {
    return null;
  }

  // If we have a receipt, show it instead of the form
  if (receipt) {
    return (
      <div className="receipt">
        <h3>{receipt.message}</h3>
        <p>Your Total: ${receipt.total}</p>
        <p>Date: {new Date(receipt.timestamp).toLocaleString()}</p>
        <button onClick={() => setReceipt(null)}>New Order</button>
      </div>
    );
  }

  return (
    <div className="checkout-form">
      <h3>Checkout</h3>
      <p>Total: ${cartTotal}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="checkout-btn">
          Complete Purchase
        </button>
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;