import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, removeToken } from "../utils/auth";

const Navbar = () => {
  const [user, setUser] = useState(getUser());
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // Load cart count from localStorage
  useEffect(() => {
    const loadCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(cart.length);
      } catch {
        setCartCount(0);
      }
    };

    loadCart();

    // Listen for cart updates from other components
    window.addEventListener("storage", loadCart);
    return () => window.removeEventListener("storage", loadCart);
  }, []);

  // Update user from localStorage on load
  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    removeToken();
    setUser(null);
    navigate("/");
    setCartCount(0);
  };

  return (
    <div className="navbg p-3 text-white h-24 flex justify-between items-center shadow-md">

      {/* LOGO */}
      <Link to="/" className="flex flex-col px-2 gap-1 text-xl items-center justify-center">
        <h1>R U C H I</h1>
        <h1 className="text-sm">T R A D E R S</h1>
      </Link>

      {/* RIGHT SECTION */}
      <div className="flex gap-6 items-center">

        {/* CART */}
        <Link to="/cart" className="relative">
          <img src="/cart.png" alt="cart" className="invert w-10" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {/* USER LOGIN / AVATAR */}
        {user ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-orange-600 font-bold flex items-center justify-center">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            {/* Name */}
            <span className="hidden md:block">{user.name}</span>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <img src="/login.png" alt="login" className="invert w-10" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
