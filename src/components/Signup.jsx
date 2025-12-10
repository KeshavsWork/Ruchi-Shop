// src/components/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, saveUsers } from "../utils/auth";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const users = getUsers();

      // Check if email already exists
      const emailExists = users.some((u) => u.email === email);
      if (emailExists) {
        alert("Email already registered!");
        setLoading(false);
        return;
      }

      // Create new user object
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password
      };

      // Save user into localStorage
      const updatedUsers = [...users, newUser];
      saveUsers(updatedUsers);

      alert("Signup successful! Please login.");
      navigate("/login", { replace: true });

    } catch (err) {
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/Manager.jpg')" }}
    >
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-12 rounded-2xl shadow-lg w-96">
        <h2 className="text-orange-600 text-3xl font-bold text-center mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="text-black block text-lg font-semibold">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
              className="w-full mt-1 p-3 rounded-xl bg-white bg-opacity-20 text-black"
            />
          </div>

          <div className="mb-4">
            <label className="text-black block text-lg font-semibold">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              className="w-full mt-1 p-3 rounded-xl bg-white bg-opacity-20 text-black"
            />
          </div>

          <div className="mb-4">
            <label className="text-black block text-lg font-semibold">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              className="w-full mt-1 p-3 rounded-xl bg-white bg-opacity-20 text-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-xl mt-4"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-red-600 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-red-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
