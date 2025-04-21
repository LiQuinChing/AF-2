import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-800 text-white px-6 py-4 shadow-md flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold hover:text-gray-200">
        🌍 Countries
      </Link>
      <div className="space-x-4">
        {user ? (
          <>
            <span className="font-semibold">Hi, {user.name}</span>
            <Link
              to="/favorites"
              className="bg-white text-blue-800 font-medium px-3 py-1 rounded hover:bg-gray-100"
            >
              Favorites
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-blue-800 font-medium px-4 py-2 rounded hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-blue-800 font-medium px-4 py-2 rounded hover:bg-gray-100"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
