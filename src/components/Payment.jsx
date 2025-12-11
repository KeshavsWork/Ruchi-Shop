import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    // ✅ Get user & cart
    const user = JSON.parse(localStorage.getItem("ruchi_user"));
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // ✅ Calculate totals
    const subTotal = cartItems.reduce(
      (sum, item) => sum + item.priceUnit * item.qty,
      0
    );

    const discount = subTotal > 2500 ? 150 : 0;
    const finalTotal = subTotal - discount;

    // ✅ Create order object for backend
    const order = {
      user: user?.name || "Guest",
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        priceUnit: item.priceUnit,
        qty: item.qty,
      })),
      totalAmount: finalTotal,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Payment successful! Order placed.");
        localStorage.removeItem("cart");

        // ✅ Trigger navbar cart update
        window.dispatchEvent(new Event("storage"));

        navigate("/");
      } else {
        alert("❌ Order failed");
        console.log(data);
      }
    } catch (err) {
      alert("❌ Backend not reachable. Start FastAPI first.");
      console.error(err);
    }
  };

  return (
    <div className="pay p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Payment</h1>

      <div className="border rounded-lg p-6 shadow-md w-96">
        <h2 className="text-xl font-semibold mb-3">
          Select Payment Method:
        </h2>

        <label className="flex items-center gap-3 mb-2">
          <input
            type="radio"
            name="payment"
            value="Credit Card"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Credit Card
        </label>

        <label className="flex items-center gap-3 mb-2">
          <input
            type="radio"
            name="payment"
            value="Debit Card"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Debit Card
        </label>

        <label className="flex items-center gap-3 mb-2">
          <input
            type="radio"
            name="payment"
            value="UPI"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          UPI (Google Pay / PhonePe)
        </label>

        <label className="flex items-center gap-3 mb-2">
          <input
            type="radio"
            name="payment"
            value="Cash on Delivery"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
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
