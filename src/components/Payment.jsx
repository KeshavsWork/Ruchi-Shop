import React, { useState } from 'react';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    alert(`Payment successful using ${paymentMethod}! Your order is placed.`);
  };

  return (
    <div className="pay p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Payment</h1>
      <div className="border rounded-lg p-6 shadow-md w-96">
        <h2 className="text-xl font-semibold mb-3">Select Payment Method:</h2>
        
        <label className="flex items-center gap-3 mb-2">
          <input type="radio" name="payment" value="Credit Card" onChange={(e) => setPaymentMethod(e.target.value)} />
          Credit Card
        </label>
        
        <label className="flex items-center gap-3 mb-2">
          <input type="radio" name="payment" value="Debit Card" onChange={(e) => setPaymentMethod(e.target.value)} />
          Debit Card
        </label>
        
        <label className="flex items-center gap-3 mb-2">
          <input type="radio" name="payment" value="UPI" onChange={(e) => setPaymentMethod(e.target.value)} />
          UPI (Google Pay / PhonePe)
        </label>
        
        <label className="flex items-center gap-3 mb-2">
          <input type="radio" name="payment" value="Cash on Delivery" onChange={(e) => setPaymentMethod(e.target.value)} />
          Cash on Delivery
        </label>

        <button 
          onClick={handlePayment} 
          className="mt-4 w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
