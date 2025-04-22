import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 
import toast, { Toaster } from "react-hot-toast";
const Login = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
        // alert("Login successful!");
        navigate("/")
    } catch (err) {
      toast.error(err.response.data.message || "Login failed");
      // alert(err.response.data.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-6 rounded-xl w-80 space-y-4 shadow-xl border border-pink-600"
      >
        <h2 className="text-2xl font-bold text-center text-pink-400">Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full px-4 py-2 bg-black border border-purple-500 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 bg-black border border-pink-500 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 py-2 rounded font-bold hover:brightness-125 transition"
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-purple-400 hover:underline">
            Register here
          </Link>
        </p>
      </form>
      <Toaster />
    </div>
  );
};

export default Login;
