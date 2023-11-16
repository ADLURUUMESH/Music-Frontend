import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../../context";
import { useNavigate, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./MusicPlayer.css";
const MusicPlayerSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;
  const ids = useParams();
  const id = ids.id;
  console.log(id);

  const [songs, setSongs] = useState([]);
  const accessToken = useContext(Context);
  console.log(accessToken);
  // Example list of album IDs

  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  useEffect(() => {
    fetch(`https://api.spotify.com/v1/tracks?ids=${ids.id}`, parameters)
      .then((res) => res.json())
      .then((data) => setSongs(data.tracks));
  }, [accessToken]);
  console.log(songs);
  return (
    <div className="music-card">
      {songs &&
        songs.length > 0 &&
        songs.map((items) => {
          return (
            <>
              <div id="rssBlock">
                <p className="cnnContents">
                  <span className="marqueeStyle">&nbsp;{songs[0].name} </span>
                </p>
              </div>
              <div className="card" style={{ width: "19rem" }}>
                <img
                  className="card-img-top"
                  src={songs[0].album.images[0].url}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <p className="card-text">
                    <audio src={songs[0].preview_url} controls />
                  </p>
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
};

export default MusicPlayerSearch;
