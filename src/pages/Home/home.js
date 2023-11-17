import React, { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "./Sidebar/sidebar";
import { useLocation, useNavigate } from "react-router-dom";

import "./home.css";
const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;

  useEffect(() => {
    if (username === null) {
      navigate("/");
    }
  }, [username]);
  return <Sidebar />;
};

export default Home;
