import "./App.css";
import Login from "./pages/Login/Login";
import Signin from "./pages/SignIn/SignIn";
import { routes } from "./Routes/routes";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
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
      {/* <Signin /> */}
    </div>
  );
}

export default App;
