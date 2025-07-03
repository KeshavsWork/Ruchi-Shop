import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
 
const Cart = ({ cartItems, onRemoveFromCart }) => {
  const [localCart, setLocalCart] = useState(cartItems);
  useEffect(() => {
    setLocalCart(cartItems); // Sync localCart when parent updates cartItems
  }, [cartItems])
  const totalPrice = localCart.reduce((sum, item) => sum + parseFloat(item.price.replace("Rs.", "").replace("/kg", "")), 0);


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      
      {localCart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cartItems.map((item, index) => (
              <div key={index} className="border rounded-lg shadow-lg p-4">
                <img src={item.image} alt={item.name} className="h-32 w-full lg:w-3/4 mb-4 rounded mx-auto" />
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">{item.price}</p>
                <p className="text-gray-500 text-sm">Quality Assured | Freshly Packed</p>
                <button 
                  onClick={() => onRemoveFromCart(index) }
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
             ))}
          </div>

          <div className="mt-6 p-4 border rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold">Total Price: Rs. {totalPrice}</h2>
            <Link to="/payment">
              <button className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Proceed to Buy
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
