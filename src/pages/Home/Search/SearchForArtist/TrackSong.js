import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../../HomeNext/album_song.css";
import { useContext } from "react";
import { Context } from "../../../../context";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "react-st-modal";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { BeatLoader } from "react-spinners";

const TrackSong = () => {
  const ids = useParams();
  const id = ids.id;
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false); // Set initial loading state to false
  const accessToken = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;
  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  console.log("username", username);

  const handlePlayClick = async (users) => {
    setLoading(true); // Set loading to true when Play button is clicked

    try {
      await navigate(`/search/new/${users.id}`, {
        state: { username },
      });

      // Reset loading state once the response is received
      setLoading(false);
    } catch (error) {
      console.error("Error navigating to the next page:", error);
      setLoading(false); // Reset loading state in case of an error
    }
  };

  const fav = (id) => {
    const data = {
      username: username,
      id: id,
      type: "track",
    };
    //const url = "http://localhost:5000/Fav/create";
    const url = "https://music-backend-kinl.onrender.com/Fav/create";
    axios
      .post(url, data)
      .then((res) => {
        if (res.status === 200) {
          Alert("Added to Favourites..!");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          Alert(err.response.data, "");
        } else {
          Alert(err.message, "");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (accessToken) {
      fetch(`https://api.spotify.com/v1/tracks?ids=${ids.id}`, parameters)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.tracks[0]);
          setTracks(data.tracks[0]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [accessToken, ids.id]);

  return (
    <div>
      <div className=" align-items-center backg">
        <h2>{tracks.album && tracks.album.name} Songs</h2>

        <div className="w-90 bg-white rounded p-3 text-align-center boxShadow">
          {loading && (
            <BeatLoader color="#d1793b" size={30} className="BeatLoader" />
          )}

          {!loading && tracks.album && (
            <table className="table back">
              <tbody>
                <tr>
                  <td>
                    <p>Track No:- </p> <h5>1</h5>
                  </td>
                  <td>
                    <p>Track Name :- </p> <h5>{tracks.name}</h5>
                  </td>
                  <td>
                    <p>Artist:- </p> <h5>{tracks.artists[0]?.name}</h5>
                  </td>
                  <td className="td">
                    <button
                      className="btn btn-success"
                      onClick={() => handlePlayClick(tracks)}
                    >
                      Play
                    </button>{" "}
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        fav(tracks.id);
                      }}
                    >
                      Add To Favourites
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
export default TrackSong;
