import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Search from './components/Search';
import './App.css';
import Login from './components/Login';
import Payment from './components/Payment';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Manager from './components/Manager';
import CartPage from './components/CartPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/**
 * Helper: extract numeric unit price from strings like:
 * "Rs.260/kg", "Rs.320/Kg", "Rs.240", "260", "Rs 260 per kg"
 */
const parseUnitPrice = (price) => {
  if (typeof price === 'number') return price;
  if (!price) return 0;
  const match = String(price).replace(',', '').match(/(\d+(\.\d+)?)/);
  return match ? parseFloat(match[0]) : 0;
};

function App() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('cart')) || [];
      return saved.map(item => {
        if (item.priceUnit) return item;
        const unit = parseUnitPrice(item.price ?? item.priceLabel);
        return {
          id: item.id ?? Math.random().toString(36).slice(2),
          name: item.name,
          image: item.image,
          priceUnit: unit,
          priceLabel: item.price ?? item.priceLabel ?? `Rs.${unit}`,
          qty: item.qty ?? 1
        };
      });
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(p => p.id === product.id);
      let updatedCart;

      if (idx !== -1) {
        const copy = [...prev];
        copy[idx].qty += qty;
        updatedCart = copy;
      } else {
        updatedCart = [
          ...prev,
          {
            ...product,  // includes priceUnit, priceLabel
            qty
          }
        ];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("storage"));

      return updatedCart;
    });
  };

  const handleRemoveFromCart = (index) => {
    setCartItems((prev) => {
      const updated = prev.filter((_, i) => i !== index);

      localStorage.setItem("cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));

      return updated;
    });
  };

  const handleUpdateQty = (index, newQty) => {
    setCartItems((prev) => {
      const copy = [...prev];
      if (!copy[index]) return prev;

      copy[index] = { ...copy[index], qty: newQty };

      localStorage.setItem("cart", JSON.stringify(copy));
      window.dispatchEvent(new Event("storage"));

      return copy;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Routes>

          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Search />
                <Manager onAddToCart={handleAddToCart} />
                <Footer />
              </>
            }
            
          />

          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateQty={handleUpdateQty}
              />
            }
          />

          <Route path="/payment" element={<><Navbar /><Payment /><Footer /></>} />
          <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
          <Route path="/signup" element={<><Navbar /><Signup /><Footer /></>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
