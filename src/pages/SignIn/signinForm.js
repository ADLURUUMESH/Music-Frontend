import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signinstyles.css";

import { Alert } from "react-st-modal";

import axios from "axios";
import { BeatLoader } from "react-spinners";
// LoadingSpinner component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <BeatLoader color="#d1793b" size={30} className="BeatLoader" />
  </div>
);
const SigninForm = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //   const passwordFirst = useRef("");
  //   const passwordConfirm = useRef("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const PasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  const ConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };
  const data = {
    name: name,
    username: username,
    email: email,
    password: password,
    // confirmPassword: confirmPassword,
  };

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (password === confirmPassword) {
      console.log(data);
      const url = "https://music-backend-kinl.onrender.com/Signup-Login/create";
      // const url = "http://localhost:5000/Signup-Login/create";

      axios
        .post(url, data)
        .then((res) => {
          if (res.status === 200) {
            Alert(
              "Redirected to Login page",
              "Created Account Successfully..!"
            );
            navigate("/");
            setName("");
            setUsername("");
            setConfirmPassword("");
            setPassword("");
            setEmail("");
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            // alert(err.response.data); // Display the response data from the server
            Alert(err.response.data, "");
          } else {
            // alert("An error occurred: " + err.message);
            Alert(err.message, "");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("Password doesn't matched!");
    }
  };
  return (
    <>
      <div className="signin">
        {loading && <LoadingSpinner />}
        <div className="wrapper">
          <h2>Create Account</h2>
          <form onSubmit={submitHandler}>
            <div className="input-box">
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                className="text"
                id="username"
                value={name}
                onChange={nameHandler}
                required
              />
            </div>
            <div className="input-box">
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
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={emailHandler}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Create password"
                name="password"
                value={password}
                onChange={PasswordHandler}
                required
              />
              {/* <FontAwesome className="eye" icon="fa-regular fa-eye" /> */}
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={ConfirmPasswordHandler}
                required
              />
            </div>
            <p className="error">{error}</p>

            <div className="input-box button">
              <input type="submit" value="Sign Up" />
            </div>
            <div className="text">
              <h3>
                Already have an account? <Link to="/">Login now</Link>
              </h3>
            </div>
          </form>
        </div>
        {/* <Dialog dialog={dialog} /> */}
      </div>
    </>
  );
};

export default SigninForm;
