import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({setUser}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/Manager.jpg')" }}>
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-orange-600 text-3xl font-bold text-center mb-6">Welcome Back!</h2>
        <form>
          <div className="mb-4">
            <label className="text-black block text-sm font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 p-3 rounded-xl bg-white bg-opacity-20 text-black placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="text-black block text-sm font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 p-3 rounded-xl bg-white bg-opacity-20 text-black placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-xl mt-4 transition duration-300">
            Login
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
