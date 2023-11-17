import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../../context";
import { useNavigate, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./MusicPlayer.css";
import { BeatLoader } from "react-spinners";
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <BeatLoader color="#d1793b" size={30} className="BeatLoader" />
  </div>
);

const MusicPlayerSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  let username = location.state ? location.state.username : null;
  const ids = useParams();
  const id = ids.id;

  const [songs, setSongs] = useState([]);
  const accessToken = useContext(Context);

  useEffect(() => {
    if (username === null) {
      navigate("/");
    }
  }, [username]);

  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data

    fetch(`https://api.spotify.com/v1/tracks?ids=${ids.id}`, parameters)
      .then((res) => res.json())
      .then((data) => {
        setSongs(data.tracks);
        setLoading(false); // Reset loading state after fetching data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Reset loading state in case of an error
      });
  }, [accessToken]);

  console.log(songs);

  return (
    <div>
      {loading && <LoadingSpinner />}
      {!loading &&
        songs &&
        songs.length > 0 &&
        songs.map((items) => {
          return (
            <>
              <div id="rssBlock">
                <p className="cnnContents">
                  <span className="marqueeStyle" style={{ color: "#DC8441" }}>
                    &nbsp;{songs[0].name}{" "}
                  </span>
                </p>
              </div>
              <div
                className="card"
                style={{ marginLeft: "450px", width: "19rem" }}
              >
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
              {/* <button>{songs[0].next}</button> */}
            </>
          );
        })}
    </div>
  );
};

export default MusicPlayerSearch;
