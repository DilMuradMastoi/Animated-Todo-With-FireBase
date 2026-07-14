import React from "react";
import { Link, useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseconfig";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className="navbar">

      <div className="navbar-logo">
        🚀 Todo<span>Cloud</span>
      </div>

      <div className="navbar-links">

        <Link to="/" className="nav-link">
          🏠 Home
        </Link>

        <Link to="/login" className="nav-link">
          🔐 Login
        </Link>

        <Link to="/register" className="nav-link">
          📝 Register
        </Link>

        <button className="logout-btn" onClick={logoutUser}>
          🚪 Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;