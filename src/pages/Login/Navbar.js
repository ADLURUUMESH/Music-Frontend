// components/NavBar.js

import React from "react";
import "./loginStyles.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="nav-bar">
      <h1 className="logo">
        <Link to="/">VibeVerse</Link>
      </h1>
      <ul className="main-nav">
        <li>
          <Link to="/">Log in</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
