import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuantitySelector from "./QuantitySelector";
import Toast from "./Toast";
import { getUser } from "../utils/auth";

import Kaju from "../assets/kaju-raw-5.jpg";
import Almo from "../assets/Almo.jpg";
import Pistachios from "../assets/Pistachios.jpg";
import Kharik from "../assets/Kharik.webp";
import Raisin from "../assets/raisin.jpg";
import Walnut from "../assets/Walnut.jpg";
import Figs from "../assets/Figs.png";
import Miri from "../assets/Miri.jpg";
import Cardamom from "../assets/Cardamom.jpg";
import ManagerBg from "/Manager.jpg";

const Manager = ({ onAddToCart }) => {
  const navigate = useNavigate();

  const productList = [
    { id: 0, name: "Cashew", price: "Rs.1020/kg", image: Kaju },
    { id: 1, name: "Almonds", price: "Rs.960/kg", image: Almo },
    { id: 2, name: "Pistachios", price: "Rs.1400/kg", image: Pistachios },
    { id: 3, name: "Kharik", price: "Rs.320/Kg", image: Kharik },
    { id: 4, name: "Raisins", price: "Rs.650/Kg", image: Raisin },
    { id: 5, name: "Walnuts", price: "Rs.1300/kg", image: Walnut },
    { id: 6, name: "Figs", price: "Rs.1600/kg", image: Figs },
    { id: 7, name: "Black Pepper", price: "Rs.450/250g", image: Miri },
    { id: 8, name: "Cardamom", price: "Rs.1400/250g", image: Cardamom }
  ];

  const parseUnitPrice = (price) => {
    if (typeof price === "number") return price;
    const match = String(price).replace(",", "").match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[0]) : 0;
  };

  const [qtys, setQtys] = useState(
    productList.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {})
  );

  const [lastAdded, setLastAdded] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);

  const setQty = (id, val) =>
    setQtys((prev) => ({ ...prev, [id]: Math.max(1, val) }));

  const handleAdd = (product) => {
    const user = getUser();
    if (!user) {
      navigate("/login", { state: { from: "/" } });
      return;
    }

    const qty = qtys[product.id] || 1;
    const unit = parseUnitPrice(product.price);

    const normalizedProduct = {
      id: product.id,
      name: product.name,
      image: product.image,
      priceUnit: unit,
      priceLabel: product.price
    };

    onAddToCart(normalizedProduct, qty);

    setLastAdded({ product: normalizedProduct, qty });
    setToastVisible(true);
  };

  return (
    <div
      className="headline manbg bg-cover min-h-screen"
      style={{ backgroundImage: `url(${ManagerBg})` }}
    >
      <div className="text-2xl md:text-5xl flex justify-center py-8 px-3">
        Straight from nature to your home.
      </div>

      <div className="products-container p-8">
        <h1 className="font-bold text-4xl mb-6 text-center">Our Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productList.map((product) => (
            <div
              key={product.id}
              className="product-card bg-white/90 border rounded-lg shadow-md p-4 hover:shadow-2xl transition duration-300 flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full lg:w-3/4 mx-auto object-cover mb-4 rounded"
              />

              <h2 className="text-xl font-semibold mb-1">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-2">{product.price}</p>

              <div className="mb-3">
                <QuantitySelector
                  value={qtys[product.id]}
                  min={1}
                  onChange={(v) => setQty(product.id, v)}
                />
              </div>

              <button
                onClick={() => handleAdd(product)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <Toast
        show={toastVisible}
        message={
          lastAdded
            ? `${lastAdded.product.name} x${lastAdded.qty} added`
            : ""
        }
        onClose={() => {
          setToastVisible(false);
          setLastAdded(null);
        }}
        duration={2000}
      />
    </div>
  );
};

export default Manager;
