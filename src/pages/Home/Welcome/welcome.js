import React, { useEffect, useState } from "react";
import "./welcome.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (username === null) {
  //     navigate("/");
  //   }
  // }, [username]);

  useEffect(() => {
    // Fetch user history data from your backend
    const obj = { username };
    const fetchData = async () => {
      try {
        const url = "https://music-backend-kinl.onrender.com/Signup-Login/data";
        //const url="http://localhost:5000/Signup-Login/data";
        const response = await axios.post(url, obj);

        setData(response.data);
        setName(response.data.name);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  useEffect(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let greetingMessage = "";

    if (currentHour >= 5 && currentHour < 12) {
      greetingMessage = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      greetingMessage = "Good Afternoon";
    } else if (currentHour >= 17 && currentHour < 21) {
      greetingMessage = "Good Evening";
    } else {
      greetingMessage = "Good Night";
    }

    setGreeting(greetingMessage);
  }, []);
  return (
    <div className="welcome">
      <div className="text-welcome">
        <h1>Welcome</h1>
        <h1 className="name">{name},</h1>
        <h1 className="greeting">{greeting}..!</h1>
      </div>
    </div>
  );
};

export default Welcome;
