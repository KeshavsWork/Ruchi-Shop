import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { saveToken, saveUser, getUsers } from "../utils/auth";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const users = getUsers();

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        alert("Invalid email or password");
        setLoading(false);
        return;
      }

      // Fake token for frontend session
      const fakeToken = Date.now().toString();
      saveToken(fakeToken);

      const loggedInUser = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      saveUser(loggedInUser);

      if (setUser) setUser(loggedInUser);

      navigate(from, { replace: true });
    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/Manager.jpg')" }}
    >
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-14 rounded-2xl shadow-lg w-96">
        <h2 className="text-orange-600 text-4xl font-bold text-center mb-6">
          Welcome Back!
        </h2>

        <form onSubmit={handleLogin}>
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
