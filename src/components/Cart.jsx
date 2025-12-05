import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const formatPrice = (num) => (Number.isInteger(num) ? num : Number(num.toFixed(2)));

const Cart = ({ cartItems = [], onRemoveFromCart, onUpdateQty }) => {
  // local copy for instant UI updates
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

  const totalPrice = localCart.reduce((sum, item) => {
    const unit = item.priceUnit ?? 0;
    const qty = item.qty ?? 1;
    return sum + unit * qty;
  }, 0);

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
                <div key={item.id ?? index} className="border rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-36 w-full lg:w-3/4 mb-4 rounded object-contain"
                  />

                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">{item.priceLabel ?? `Rs.${formatPrice(unit)}`}</p>
                  {/* <p className="text-gray-500 text-sm">Quality Assured | Freshly Packed</p> */}

                  {/* Quantity controls */}
                  <div className="mt-3 inline-flex items-center gap-2">
                    <button
                      onClick={() => handleQtyChange(index, Math.max(1, qty - 1))}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                      aria-label="decrease"
                    >
                      −
                    </button>
                    <div className="px-4 py-1 w-10 text-center border rounded">{qty}</div>
                    <button
                      onClick={() => handleQtyChange(index, qty + 1)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                      aria-label="increase"
                    >
                      +
                    </button>
                  </div>

                  <div className="mt-3 flex gap-2 items-center">
                    <button
                      onClick={() => onRemoveFromCart(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>

                    <div className="self-center text-sm text-gray-700">
                      Item total: <span className="font-semibold">Rs. {formatPrice(itemTotal)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 border rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold">Total Price: Rs. {formatPrice(totalPrice)}</h2>
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
