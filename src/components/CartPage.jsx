import React from 'react';
import Navbar from './Navbar';
import Cart from './Cart';
import Footer from './Footer';

const CartPage = ({ cartItems, onRemoveFromCart, onUpdateQty }) => {
  return (
    <>
      <Navbar />
      <Cart cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} onUpdateQty={onUpdateQty} />
      <Footer />  
    </>
  );
};

export default CartPage;
