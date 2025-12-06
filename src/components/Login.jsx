// src/components/Login.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { saveToken, saveUser, decodeToken } from "../utils/auth";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // FastAPI login endpoint expects {email, password} and returns {access_token, token_type}
      const res = await axios.post("http://localhost:8000/auth/login", { email, password });
      const token = res.data?.access_token || res.data?.token || null;
      if (!token) throw new Error("No token returned");

      // Save token
      saveToken(token);

      // decode minimal user info from token if present (sub, role)
      const payload = decodeToken(token);
      const user = {
        id: payload?.sub,
        role: payload?.role,
        name: payload?.name || ""
      };

      // Save user in localStorage for quick access and call setUser
      saveUser(user);
      if (typeof setUser === "function") setUser(user);

      // Navigate back to the page user came from
      navigate(from, { replace: true });
    } catch (error) {
      const msg = error?.response?.data?.detail || error.message || "Invalid credentials";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/Manager.jpg')" }}>
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-14 rounded-2xl shadow-lg w-96">
        <h2 className="text-orange-600 text-4xl font-bold text-center mb-6">Welcome Back!</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="text-black block text-lg font-semibold">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 p-3 rounded-xl bg-white bg-opacity-20 text-black placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="text-black block text-lg font-semibold">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 p-3 rounded-xl bg-white bg-opacity-20 text-black placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-xl mt-4 transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-red-600 text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-700 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
