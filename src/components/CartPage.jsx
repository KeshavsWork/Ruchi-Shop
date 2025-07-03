// src/components/CartPage.jsx
import React from 'react';
import Navbar from './Navbar';
import Cart from './Cart';
import Footer from './Footer';

const CartPage = ({ cartItems, onRemoveFromCart }) => {
  return (
    <>
      <Navbar />
      <Cart cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />
      <Footer />
    </>
  );
};

export default CartPage;
