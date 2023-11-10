// App.js

import React, { useEffect, useState } from "react";
import "./loginStyles.css"; // Import your CSS file

import Navbar from "./Navbar";
import LoginForm from "./LoginForm";
import Footer from "./Footer";

function Login() {
  return (
    <div className="Login">
      <Navbar />
      <LoginForm />
      <Footer />
    </div>
  );
}

export default Login;
