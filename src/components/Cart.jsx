import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const formatPrice = (num) => (Number.isInteger(num) ? num : Number(num.toFixed(2)));

const Cart = ({ cartItems = [], onRemoveFromCart, onUpdateQty }) => {
  const [localCart, setLocalCart] = useState(cartItems);

  useEffect(() => {
    setLocalCart(cartItems);
  }, [cartItems]);

  const handleQtyChange = (index, newQty) => {
    if (newQty < 1) newQty = 1;
    const updated = [...localCart];
    updated[index] = { ...updated[index], qty: newQty };
    setLocalCart(updated);
    if (onUpdateQty) onUpdateQty(index, newQty);
  };

  const subTotal = localCart.reduce((sum, item) => {
    const unit = item.priceUnit ?? 0;
    const qty = item.qty ?? 1;
    return sum + unit * qty;
  }, 0);

  const discount = subTotal > 2500 ? 150 : 0;
  const finalTotal = subTotal - discount;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {localCart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {localCart.map((item, index) => {
              const unit = item.priceUnit ?? 0;
              const qty = item.qty ?? 1;
              const itemTotal = unit * qty;

              return (
                <div key={index} className="border rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img src={item.image} alt={item.name} className="h-36 w-full lg:w-3/4 mb-4 rounded object-contain" />

                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">{item.priceLabel}</p>

                  <div className="mt-3 inline-flex items-center gap-2">
                    <button onClick={() => handleQtyChange(index, qty - 1)} className="px-3 py-1 bg-gray-200 rounded">−</button>
                    <div className="px-4 py-1 w-10 text-center border rounded">{qty}</div>
                    <button onClick={() => handleQtyChange(index, qty + 1)} className="px-3 py-1 bg-gray-200 rounded">+</button>
                  </div>

                  <div className="mt-3 flex gap-2 items-center">
                    <button onClick={() => onRemoveFromCart(index)} className="px-4 py-2 bg-red-500 text-white rounded">
                      Remove
                    </button>

                    <div className="text-sm">
                      Item total: <b>₹{formatPrice(itemTotal)}</b>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 border rounded-lg shadow-md max-w-lg mx-auto text-center">
            <h2 className="text-lg">Subtotal: ₹{formatPrice(subTotal)}</h2>

            {discount > 0 && (
              <h2 className="text-green-600 font-semibold">
                 Discount Applied: -₹{discount}
              </h2>
            )}

            <h2 className="text-2xl font-bold mt-2">
              Final Payable: ₹{formatPrice(finalTotal)}
            </h2>

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
