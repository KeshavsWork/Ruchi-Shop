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
import CartPage from './components/CartPage'

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
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
 
const handleRemoveFromCart = (index) => {
  console.log("Removing item at index:", index);

  const updatedCart = [...cartItems.filter((_, i) => i !== index)];
  setCartItems(updatedCart);

  // Also update localStorage here (for safety)
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  // const updatedCart = cartItems.filter((_, i) => i !== index);
  // setCartItems(updatedCart);
  
};

// const [cartItems, setCartItems] = useState(() => {
//   return JSON.parse(localStorage.getItem("cart")) || [];
// });

// useEffect(() => {
//   localStorage.setItem("cart", JSON.stringify(cartItems));
// }, [cartItems]);

// const handleAddToCart = (product) => {
//   const updatedCart = [...cartItems, product];
//   setCartItems(updatedCart);
// };

// const handleRemoveFromCart = (index) => {
//   const updatedCart = cartItems.filter((_, i) => i !== index);
//   setCartItems(updatedCart);
// };

  // const router = createBrowserRouter([
  //   { path: "/", element: <> <Navbar /> <Search /><Manager onAddToCart={handleAddToCart} /> <Footer/></> },
  //   // { path: "/cart", element: <> <Navbar /><Cart key={cartItems.length}  cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} /> <Footer/></> },
  //   {path: "/cart",
  // element: (
  //   <>
  //     <Navbar />
  //     <Cart
  //       cartItems={cartItems}
  //       onRemoveFromCart={handleRemoveFromCart}
  //     />
  //     <Footer />
  //   </>)},
  //   { path: "/payment", element: <> <Navbar /><Payment /> <Footer/></> },
  //   { path: "/login", element: <> <Navbar /> <Login /> <Footer/></> },
  //   { path: "/signup", element: <> <Navbar /> <Signup /> <Footer/></> },  
  // ]);

  // return (
  //   <div className="min-h-screen flex flex-col">
  //     {/* <Navbar /> */}
  //     {/* <Search/>
  //     <Manager/> */}  
  //     <RouterProvider router={router}></RouterProvider>
  //   </div>
  // )

  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Search />
              <Manager onAddToCart={handleAddToCart} />
              <Footer />
            </>
          } />
          <Route path="/cart" element={
            <CartPage cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
          } />
          <Route path="/payment" element={<><Navbar /><Payment /><Footer /></>} />
          <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
          <Route path="/signup" element={<><Navbar /><Signup /><Footer /></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
