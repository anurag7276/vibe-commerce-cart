import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

// This is the individual product card
const ProductCard = ({ product , onAddToCart}) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      {/* Call the function on click */}
      <button onClick={() => onAddToCart(product._id)}> 
        Add to Cart
      </button>
    </div>
  );
};

// This is the main grid component
const ProductGrid = () => {
  // 1. Set up state to store our products
  const [products, setProducts] = useState([]); // Default is an empty array
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state

  const { addToCart } = useCart();

  // 2. Fetch data when the component "mounts" (loads)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Make the API call to our backend (thanks to the proxy)
        const res = await axios.get('/api/products');

        // Put the data from the API into our state
        setProducts(res.data);
      } catch (err) {
        // If it fails, save the error message
        setError(err.message);
      } finally {
        // No matter what, stop loading
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // The empty array [] means "run this effect only once"

  // 3. Render the component's UI
  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error loading products: {error}</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        // Pass the function as a prop to the card
        <ProductCard 
          key={product._id} 
          product={product} 
          onAddToCart={() => addToCart(product._id, 1)} // <-- Pass it here
        />
      ))}
    </div>
  );
};

export default ProductGrid;