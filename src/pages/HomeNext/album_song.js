import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./album_song.css";
import { useContext } from "react";
import { Context } from "../../context";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "react-st-modal";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { BeatLoader } from "react-spinners";

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <BeatLoader color="#d1793b" size={30} className="BeatLoader" />
  </div>
);

const AlbumSong = () => {
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

  const fav = async (id) => {
    setLoading(true); // Set loading to true when making the API request

    try {
      const data = {
        username: username,
        id: id,
        type: "album",
      };
      const url = "https://music-backend-kinl.onrender.com/Fav/create";
      await axios.post(url, data);

      // If the request is successful, show an alert
      Alert("Added to Favorites..!");
    } catch (error) {
      // If there's an error, show an alert with the error message
      if (error.response && error.response.status === 400) {
        Alert(error.response.data, "");
      } else {
        Alert(error.message, "");
      }
    } finally {
      // Reset loading state after the API request is complete
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      setLoading(true);
      fetch(`https://api.spotify.com/v1/albums?ids=${ids.id}`, parameters)
        .then((res) => res.json())
        .then((data) => setTracks(data.albums))
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [accessToken, ids.id]);

  const handlePlayClick = async (users) => {
    setLoading(true); // Set loading to true when Play button is clicked

    try {
      // Perform the necessary actions for Play button click
      // For example, navigate to the next page
      await navigate(`/new/${users.id}`, {
        state: { username },
      });

      // Reset loading state once the response is received
      setLoading(false);
    } catch (error) {
      console.error("Error navigating to the next page:", error);
      setLoading(false); // Reset loading state in case of an error
    }
  };

  return (
    <div>
      {loading && <LoadingSpinner />}
      <div className="align-items-center backg">
        <h2
          style={{
            color: "#DC8441",
            textShadow: "3px 2px 5px rgba(202, 108, 42, 0.40)",
          }}
        >
          {tracks[0]?.name} Songs
        </h2>

        <div
          className="w-90 bg-white rounded p-3 text-align-center boxShadow"
          style={{
            background: "linear-gradient(to right, #DC8441, #f6a461)",
            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
          }}
        >
          {!loading ? (
            <table
              className="table back"
              style={{ backgroundColor: "transparent" }}
            >
              <tbody style={{ backgroundColor: "transparent" }}>
                {tracks &&
                  tracks.length > 0 &&
                  tracks.map((users, index) => {
                    return (
                      <tr
                        key={index}
                        style={{ backgroundColor: "transparent" }}
                      >
                        <td style={{ backgroundColor: "transparent" }}>
                          <p
                            style={{
                              color: "#522c0f",
                              textShadow:
                                "3px 2px 5px rgba(255, 255, 255, 0.25)",
                            }}
                          >
                            Track No:-{" "}
                          </p>{" "}
                          <h5
                            style={{
                              color: "white",
                              textShadow:
                                "3px 2px 5px rgba(255, 255, 255, 0.25)",
                            }}
                          >
                            &nbsp;{index + 1}
                          </h5>
                        </td>
                        <td style={{ backgroundColor: "transparent" }}>
                          <p
                            style={{
                              color: "#522c0f",
                              textShadow:
                                "3px 2px 5px rgba(255, 255, 255, 0.25)",
                            }}
                          >
                            Track Name :-{" "}
                          </p>{" "}
                          <h5
                            style={{
                              color: "white",
                              textShadow:
                                "3px 2px 5px rgba(255, 255, 255, 0.25)",
                            }}
                          >
                            &nbsp;{users.tracks.items[0].name}
                          </h5>
                        </td>
                        <td style={{ backgroundColor: "transparent" }}>
                          <p
                            style={{
                              color: "#522c0f",
                              textShadow:
                                "3px 2px 5px rgba(255, 255, 255, 0.25)",
                            }}
                          >
                            Artist:-{" "}
                          </p>{" "}
                          <h5
                            style={{
                              color: "white",
                              textShadow:
                                "3px 2px 5px rgba(255, 255, 255, 0.25)",
                            }}
                          >
                            &nbsp;{users.artists[0]?.name}
                          </h5>
                        </td>
                        <td
                          style={{ backgroundColor: "transparent" }}
                          className="td"
                        >
                          <button
                            style={{
                              backgroundColor: "white",
                              width: "190px",
                              fontSize: "23px",
                              textShadow:
                                "3px 2px 5px rgba(255, 255, 255, 0.25)",
                              color: "#DC8441",
                              fontWeight: "bolder",
                              boxShadow:
                                "rgba(0, 0, 0, 0.19) 0px 3px 20px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                              border: "none",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#EDEADE")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.backgroundColor = "white")
                            }
                            className="btn btn-success"
                            onClick={() => handlePlayClick(users)}
                          >
                            Play
                          </button>{" "}
                          <button
                            style={{
                              backgroundColor: "white",
                              fontSize: "23px",
                              textShadow:
                                "3px 2px 5px rgba(255, 255, 255, 0.25)",
                              color: "#DC8441",
                              fontWeight: "bolder",
                              boxShadow:
                                "rgba(0, 0, 0, 0.19) 0px 3px 20px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                              border: "none",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#EDEADE")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.backgroundColor = "white")
                            }
                            onClick={() => {
                              fav(users.id);
                            }}
                            className="btn btn-success"
                          >
                            Add To Favourites
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AlbumSong;
