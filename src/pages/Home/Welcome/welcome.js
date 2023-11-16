import React, { useEffect, useState } from "react";
import "./welcome.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BeatLoader } from "react-spinners";

// LoadingSpinner component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <BeatLoader color="#d1793b" size={30} className="BeatLoader" />
  </div>
);

const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading state to true

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://music-backend-kinl.onrender.com/Signup-Login/data";
        const response = await axios.post(url, { username });

        await setData(response.data);
        await setName(response.data.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
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
  }, [username]);

  return (
    <div className="welcome">
      {loading && <LoadingSpinner />}
      <div className="text-welcome">
        <h1>Welcome</h1>
        {!loading && <h1 className="name">{name},</h1>}
        <h1 className="greeting">{greeting}..!</h1>
      </div>
    </div>
  );
};

export default Welcome;
