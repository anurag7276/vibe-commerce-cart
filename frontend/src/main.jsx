import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//  Import new CartProvider
import { CartProvider } from './context/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap the entire App component with the CartProvider */}
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
)