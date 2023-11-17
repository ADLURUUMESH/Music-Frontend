import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../../../context";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "react-st-modal";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BeatLoader } from "react-spinners";
import "../../../HomeNext/album_song.css";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";

// LoadingSpinner component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <BeatLoader color="#d1793b" size={30} className="BeatLoader" />
  </div>
);

const TrackSong = () => {
  const ids = useParams();
  const id = ids.id;
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const accessToken = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;
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

  const handlePlayClick = async (users) => {
    setLoading(true);
    try {
      await navigate(`/search/new/${users.id}`, {
        state: { username },
      });
      setLoading(false);
    } catch (error) {
      console.error("Error navigating to the next page:", error);
      setLoading(false);
    }
  };

  const fav = (id) => {
    setLoading(true);
    const data = {
      username: username,
      id: id,
      type: "track",
    };
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
      {loading && <LoadingSpinner />}
      <div className=" align-items-center backg">
        <h2
          style={{
            color: "#DC8441",
            textShadow: "3px 2px 5px rgba(202, 108, 42, 0.40)",
          }}
        >
          {tracks.album && tracks.album.name} Songs
        </h2>

        <div
          className="w-90  rounded p-3 text-align-center boxShadow"
          style={{
            background: "linear-gradient(to right, #DC8441, #f6a461)",
            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
          }}
        >
          {!loading && tracks.album && (
            <table
              className="table back"
              style={{ backgroundColor: "transparent" }}
            >
              <tbody style={{ backgroundColor: "transparent" }}>
                <tr style={{ backgroundColor: "transparent" }}>
                  <td
                    style={{ backgroundColor: "transparent", color: "white" }}
                  >
                    <p
                      style={{
                        color: "#522c0f",
                        textShadow: "3px 2px 5px rgba(255, 255, 255, 0.25)",
                      }}
                    >
                      Track No:-{" "}
                    </p>{" "}
                    <h5
                      style={{
                        color: "white",
                        textShadow: "3px 2px 5px rgba(255, 255, 255, 0.25)",
                      }}
                    >
                      &nbsp;1
                    </h5>
                  </td>
                  <td
                    style={{ backgroundColor: "transparent", color: "white" }}
                  >
                    <p
                      style={{
                        color: "#522c0f",
                        textShadow: "3px 2px 5px rgba(255, 255, 255, 0.25)",
                      }}
                    >
                      Track Name :-{" "}
                    </p>{" "}
                    <h5
                      style={{
                        color: "white",
                        textShadow: "3px 2px 5px rgba(255, 255, 255, 0.25)",
                      }}
                    >
                      &nbsp;{tracks.name}
                    </h5>
                  </td>
                  <td
                    style={{
                      backgroundColor: "transparent",
                      color: "#522c0f",
                    }}
                  >
                    <p>Artist:- </p>{" "}
                    <h5 style={{ color: "white" }}>
                      &nbsp;{tracks.artists[0]?.name}
                    </h5>
                  </td>
                  <td className="td" style={{ backgroundColor: "transparent" }}>
                    <button
                      className="btn "
                      onClick={() => handlePlayClick(tracks)}
                      style={{
                        backgroundColor: "white",
                        width: "190px",
                        fontSize: "23px",
                        textShadow: "3px 2px 5px rgba(255, 255, 255, 0.25)",
                        color: "#DC8441",
                        fontWeight: "bolder",
                        boxShadow:
                          "rgba(0, 0, 0, 0.19) 0px 3px 20px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#EDEADE")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "white")
                      }
                    >
                      Play
                    </button>{" "}
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        fav(tracks.id);
                      }}
                      style={{
                        backgroundColor: "white",
                        fontSize: "23px",
                        textShadow: "3px 2px 5px rgba(255, 255, 255, 0.25)",
                        color: "#DC8441",
                        fontWeight: "bolder",
                        boxShadow:
                          "rgba(0, 0, 0, 0.19) 0px 3px 20px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                        border: "none",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#EDEADE")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "white")
                      }
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
