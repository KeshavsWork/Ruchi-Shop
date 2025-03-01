import { useState , useEffect } from 'react'
import Navbar from './components/Navbar'
import Search from './components/Search'
import './App.css'
import Login from './components/Login'
import Cart from './components/Cart';
import Payment from './components/Payment';
import Footer from './components/Footer'
import Signup from './components/Signup'
import Manager from './components/Manager'


import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);



  const handleAddToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    // localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

const handleRemoveFromCart = (index) => {
  console.log("Removing item at index:", index);
  console.log("Before removal:", cartItems);

  const updatedCart = cartItems.filter((_, i) => i !== index);
  setCartItems(updatedCart);
  
  console.log("After removal:", updatedCart);
};

  

  const router = createBrowserRouter([
    { path: "/", element: <> <Navbar /> <Search /><Manager onAddToCart={handleAddToCart} /> <Footer/></> },
    { path: "/cart", element: <> <Navbar /><Cart  cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} /> <Footer/></> },
    { path: "/payment", element: <> <Navbar /><Payment /> <Footer/></> },
    { path: "/login", element: <> <Navbar /> <Login /> <Footer/></> },
    { path: "/signup", element: <> <Navbar /> <Signup /> <Footer/></> },  
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      {/* <Search/>
      <Manager/> */}  
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
