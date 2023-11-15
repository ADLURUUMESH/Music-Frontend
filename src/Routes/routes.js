import MusicPlayer from "../pages/Home/Music_Player/MusicPlayer";
import Home from "../pages/Home/home";
import Favourites from "../pages/HomeNext/Favourites";
import HomeN from "../pages/HomeNext/HomeN";
import Music from "../pages/HomeNext/Music";
import Profile from "../pages/Home/Profile/Profile";
import Search from "../pages/Home/Search/Search";
import AllSe from "../pages/Home/Search/SearchForArtist/AllSe";
import AllSearch from "../pages/Home/Search/SearchForArtist/AllSearch";
import ArtSe from "../pages/Home/Search/SearchForArtist/ArtSe";
import ArtSearch from "../pages/Home/Search/SearchForArtist/ArtSearch";

import AlbumSong from "../pages/HomeNext/album_song";
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
    path: "/home/new/:id",
    component: HomeN,
  },
  {
    path: "/new/:id",
    component: Music,
  },
  {
    path: "/new/favourite/:id",
    component: Favourites,
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
