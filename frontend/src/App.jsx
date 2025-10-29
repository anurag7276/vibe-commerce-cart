import './App.css'
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm'; 

function App() {
  return (
    <div className="App">
      <h1>Vibe Commerce</h1>
      <hr />

      <div className="app-layout">
        <ProductGrid />

        {/* 2. Create a wrapper for the right column */}
        <div className="sidebar">
          <Cart />
          <CheckoutForm />
        </div>

      </div>
    </div>
  )
}

export default App