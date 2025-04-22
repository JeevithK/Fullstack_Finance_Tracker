import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const Header = () => {
  const navigate = useNavigate();

  const handlelogout = () => {
    const token = localStorage.getItem("token");
    if (token)
    {
      localStorage.removeItem("token");
      toast.success("Logged out");
    }
  }
  return (
    <header className="bg-gradient-to-r from-purple-800 to-purple-600 text-white px-6 py-4 rounded-b-2xl shadow-md">
      <div className="flex items-center justify-between">
        {/* Left - Title */}
        <h1 className="text-2xl font-bold">💰 Finance Tracker</h1>

        {/* Right - Buttons */}
        <div className="flex gap-4">
          <Link
            to="/"
            className="bg-white text-purple-700 font-semibold px-5 py-2 rounded-xl hover:bg-purple-100 transition"
          >
            🏠 Home
          </Link>
          {/* <Link
            to="/setbudget"
            className="bg-white text-purple-700 font-semibold px-5 py-2 rounded-xl hover:bg-purple-100 transition"
          >
            📝 Set Budget
          </Link> */}

          {localStorage.getItem("token") && (
            <Link
              to={"/auth/login"}
              className="bg-white text-purple-700 font-semibold px-4 py-1 rounded-xl hover:bg-purple-100 transition cursor-pointer"
              onClick={handlelogout}
            >
              Logout
            </Link>
          )}
        </div>
      </div>
      <Toaster/>
    </header>
  );
};

export default Header;
