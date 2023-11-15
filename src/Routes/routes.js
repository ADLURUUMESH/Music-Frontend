import Profile from "../pages/Home/Profile/Profile";
import Search from "../pages/Home/Search/Search";
import AllSe from "../pages/Home/Search/SearchForArtist/AllSe";
import AllSearch from "../pages/Home/Search/SearchForArtist/AllSearch";
import ArtSe from "../pages/Home/Search/SearchForArtist/ArtSe";
import ArtSearch from "../pages/Home/Search/SearchForArtist/ArtSearch";
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
  {
    path: "/search",
    component: Search,
  },
  {
    path: "/artsearch",
    component: ArtSearch,
  },
  {
    path: "/artse",
    component: ArtSe,
  },
  {
    path: "/allse",
    component: AllSe,
  },
  {
    path: "/allsearch",
    component: AllSearch,
  },
  {
    path: "/profile",
    component: Profile,
  },
];
