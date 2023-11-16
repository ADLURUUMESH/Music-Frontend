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

import Login from "../pages/Login/Login";
import Signin from "../pages/SignIn/SignIn";

import Tracks from "../pages/Home/Search/SearchForArtist/Tracks";

import SidebarMusicPlayerSearch from "../pages/Home/Music_Player/Sidebar+MusicPlayerSearch";
import SidebarArtistSlide from "../pages/Home/Search/ArtistSlide/SidebarArtistSlide";
import SlidebarArtistNext from "../pages/Home/Artists/SlidebarArtistNext";

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
  {
    path: "/track/:id",
    component: Tracks,
  },

  {
    path: "search/new/:id",
    component: SidebarMusicPlayerSearch,
  },
  {
    path: "/artist/new/:id",
    component: SidebarArtistSlide,
  },
  {
    path: "/artist/:name/:id",
    component: SlidebarArtistNext,
  },
  {
    path: "/favourites",
    component: Favourites,
  },
];
