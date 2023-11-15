// components/LoginForm.js

import React, { useState } from "react";
import "./loginStyles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "react-st-modal";
const LoginForm = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const usernameHandler = (e) => {
    setUserName(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const data = {
    username: username,
    password: password,
  };
  const handleClick = (e) => {
    const url = "https://music-backend-kinl.onrender.com/Signup-Login/login";
    // const url = "http://localhost:5000/Signup-Login/login";
    axios
      .post(url, data)
      .then((res) => {
        if (res.status === 200) {
          navigate("/home", { state: { username } });
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          const result = Alert(err.response.data, "");
          // alert(err.response.data);
        } else {
          // alert(err.message);
          const result = Alert(err.message, "");
        }
      });
    e.preventDefault();
    console.log(data);
  };

  if (!loggedIn) {
    return (
      <section className="login" id="login">
        <div className="head">
          <h1 className="company">Listen Music..!</h1>
        </div>
        <p className="msg">Welcome back to VibeVerse</p>
        <div className="form">
          <form>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="text"
              id="username"
              value={username}
              onChange={usernameHandler}
              required
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="••••••••••••••"
              className="password"
              onChange={passwordHandler}
              value={password}
              required
            />
            <br />
            <Link
              to="#"
              className="btn-login"
              id="do-login"
              onClick={handleClick}
            >
              {" "}
              Login
            </Link>

            <Link to="#" className="forgot">
              Forgot Password?
            </Link>
          </form>
          <Link to="/signup" className="account">
            Create New Account?
          </Link>
        </div>
        {/* <audio controls src={props.data} /> */}
      </section>
    );
  } else {
    return null;
  }
};

export default LoginForm;
