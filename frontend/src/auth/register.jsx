import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "", name: "" });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://fullstack-finance-tracker.onrender.com/auth/register",
        formData
      );
      toast.success(res.data.message);
      // alert(res.data.message);
      navigate("/auth/login")
    } catch (err) {
      toast.error(err.response.data.message || "Registration failed");
      // alert(err.response.data.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleRegister}
        className="bg-gray-900 p-6 rounded-xl w-80 space-y-4 shadow-xl border border-purple-600"
      >
        <h2 className="text-2xl font-bold text-center text-purple-400">
          Register
        </h2>

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
          type="text"
          name="name"
          placeholder="Name"
          className="w-full px-4 py-2 bg-black border border-purple-500 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={formData.name}
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
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-2 rounded font-bold hover:brightness-125 transition"
        >
          Register
        </button>
                <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/auth/login" className="text-purple-400 hover:underline">
            Login here
          </Link>
        </p>
      </form>
      <Toaster />
    </div>
  );
};

export default Register;
