import "./App.css";
import { useEffect, useState } from "react";
import Login from "./pages/Login/Login";
import Signin from "./pages/SignIn/SignIn";
import { routes } from "./Routes/routes";
import { Routes, Route } from "react-router-dom";
import Spotify from "./spotify";
import { Context } from "./context";
function App() {
  const CLIENT_ID = "053e0b7273ca40beb916b87e76914661";
  const CLIENT_SECRET_ID = "cde581f0468b41eaa78fa7f39b7d96fe";
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET_ID,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);
  console.log(accessToken);

  return (
    <div className="App">
      <Context.Provider value={accessToken}>
        {/* <Login /> */}
        <Routes>
          {routes &&
            routes.map((item, index) => {
              return (
                <Route
                  key={index}
                  path={item.path}
                  element={<item.component />}
                ></Route>
              );
            })}
        </Routes>
        {/* <Spotify /> */}
      </Context.Provider>
      {/* <Signin /> */}
    </div>
  );
}

export default App;
