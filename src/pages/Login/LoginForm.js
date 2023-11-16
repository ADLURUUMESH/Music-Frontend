import React, { useState } from "react";
import "./loginStyles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "react-st-modal";
import { BeatLoader } from "react-spinners";
// LoadingSpinner component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <BeatLoader color="#d1793b" size={30} className="BeatLoader" />
  </div>
);

const LoginForm = (props) => {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    const url = "https://music-backend-kinl.onrender.com/Signup-Login/login";
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
        } else {
          const result = Alert(err.message, "");
        }
      })
      .finally(() => {
        setLoading(false);
      });

    e.preventDefault();
    console.log(data);
  };

  return (
    <section className="login" id="login">
      {/* Conditionally render the loading spinner */}
      {loading && <LoadingSpinner />}

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
};

export default LoginForm;
