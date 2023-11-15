import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../../context";
import "./MusicPlayer.css";
const MusicPlayer = () => {
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
    fetch(`https://api.spotify.com/v1/albums?ids=${ids.id}`, parameters)
      .then((res) => res.json())
      .then((data) => setSongs(data.albums));
  }, []);
  console.log(songs);
  return (
    <div>
      {songs &&
        songs.length > 0 &&
        songs.map((items) => {
          return (
            <div className="music">
              <div className="boxing">
                <img src={songs[0].images[0].url} />
              </div>
              <audio src={songs[0].tracks.items[0].preview_url} controls />;
            </div>
          );
        })}
    </div>
  );
};

export default MusicPlayer;
