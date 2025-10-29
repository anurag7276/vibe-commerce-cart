import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  // Get all the values and functions from our global context
  const { cartItems, cartTotal, loading, removeFromCart } = useCart();

  if (loading) {
    return <p>Loading cart...</p>;
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <button onClick={() => removeFromCart(item._id)}>
                Remove
              </button>
            </div>
          ))}
          <hr />
          <div className="cart-total">
            <strong>Total:</strong>
            <strong>${cartTotal}</strong>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;