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
];
