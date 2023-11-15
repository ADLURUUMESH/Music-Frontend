import Home from "../pages/Home/home";
import Login from "../pages/Login/Login";
import Signin from "../pages/SignIn/SignIn";

export const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/signup",
    component: Signin,
  },
  {
    path: "/home",
    component: Home,
  },
];
