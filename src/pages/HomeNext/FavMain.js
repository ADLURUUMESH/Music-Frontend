import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context";
import "./Favourites.css";
import { Alert } from "react-st-modal";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
const FavMain = () => {
  const [users, setUsers] = useState([]);
  const accessToken = useContext(Context);
  const [favSongs, setFavSongs] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;

  useEffect(() => {
    axios
      .get(`https://music-backend-kinl.onrender.com/Fav?username=${username}`)
      .then((result) => setUsers(result.data))
      .catch((err) => console.error(err));
  }, []);

  const fetchDataForUser = async (user) => {
    try {
      let response;

      if (user.type === "album") {
        response = await fetch(
          `https://api.spotify.com/v1/albums?ids=${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
          }
        );
      } else {
        response = await fetch(
          `https://api.spotify.com/v1/tracks?ids=${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
          }
        );
      }

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchDataForAllUsers = async () => {
      try {
        const dataPromises = users.map((user) => fetchDataForUser(user));
        const data = await Promise.all(dataPromises);

        // Filter out null values (failed fetch requests)
        const validData = data.filter((item) => item !== null);
        setFavSongs(validData);
        console.log(validData);
        console.log(validData[0].albums[0].tracks.items[0].name);
      } catch (error) {
        console.error("Error fetching data for all users:", error);
      }
    };

    // Check if users exist
    if (users.length > 0) {
      fetchDataForAllUsers();
    }
  }, [users, accessToken]);

  const handleDelete = (id) => {
    const obj = { username, id };
    const url = "https://music-backend-kinl.onrender.com/Fav/delete";
    axios
      .delete(url, {
        data: {
          username: username,
          id: id,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          // If the deletion is successful, update the state to reflect the changes
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
          setFavSongs((prevFavSongs) =>
            prevFavSongs.filter((song) => song.id !== id)
          );
        } else if (res.status === 404) {
          Alert("User not found", "");
        } else {
          Alert("Failed to delete user", "");
        }
      })
      .catch((err) => {
        Alert("An error occurred while deleting the user: " + err.message, "");
      });
  };

  return (
    <div className="big-container">
      <div className="next-container">
        <table className="table">
          <tbody>
            {favSongs.map((data, index) => {
              const user = users[index];
              return (
                <>
                  {user &&
                  user.type === "album" &&
                  favSongs[index]?.albums &&
                  favSongs[index]?.albums[0]?.tracks?.items ? (
                    // Rendering logic for album type
                    <ListGroup.Item
                      key={index}
                      style={{
                        backgroundColor: "white",
                        position: "relative",
                        display: "flex", // Add flex display for better alignment
                        alignItems: "center", // Align items vertically in the center
                        borderRadius: "30px",
                      }}
                    >
                      <h3 style={{ marginLeft: "30px", paddingRight: "10px" }}>
                        {index + 1}
                      </h3>
                      <img
                        src={favSongs[index].albums[0].images[2].url}
                        alt=""
                        style={{
                          marginLeft: "40px",
                          marginRight: "40px",
                          borderRadius: "30%",
                          width: "64px",
                          height: "64px",
                        }} // Adjust margin for the image
                      />
                      <h3 className="h3" style={{ paddingRight: "20px" }}>
                        {favSongs[index]?.albums[0]?.tracks?.items[0]?.name ||
                          "N/A"}
                      </h3>
                      <div
                        style={{
                          marginLeft: "auto",
                          display: "flex",
                          overflow: "hidden",
                          marginRight: "15px",
                        }}
                      >
                        {/* Move buttons to the right with margin */}
                        <Button
                          className="btn play ms-5 me-5"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(
                              `/artist/new/${favSongs[index].albums[0].id}`,
                              {
                                state: { username },
                              }
                            );
                          }}
                        >
                          Play
                        </Button>
                        <Button
                          className="btn delete ms me-5"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ) : user && user.type === "track" && data.tracks ? (
                    <ListGroup.Item
                      key={index}
                      style={{
                        backgroundColor: "white",
                        position: "relative",
                        display: "flex", // Add flex display for better alignment
                        alignItems: "center", // Align items vertically in the center
                        borderRadius: "30px",
                      }}
                    >
                      <h3 style={{ marginLeft: "30px", paddingRight: "10px" }}>
                        {index + 1}
                      </h3>
                      <img
                        src={favSongs[index]?.tracks[0].album.images[2].url}
                        alt=""
                        style={{
                          marginLeft: "40px",
                          marginRight: "40px",
                          borderRadius: "30%",
                          width: "64px",
                          height: "64px",
                        }} // Adjust margin for the image
                      />
                      <h3 className="h3" style={{ paddingRight: "20px" }}>
                        {data.tracks[0]?.name || "N/A"}
                      </h3>
                      <div
                        style={{
                          marginLeft: "auto",
                          display: "flex",
                          marginRight: "15px",
                        }}
                      >
                        {/* Move buttons to the right with margin */}
                        <Button
                          className="btn play ms-5 me-5"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(
                              `/track/${favSongs[index]?.tracks[0].id}`,
                              {
                                state: { username },
                              }
                            );
                          }}
                          style={{ marginRight: "10px" }}
                        >
                          Play
                        </Button>
                        <Button
                          className="btn delete ms me-5"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ) : (
                    // Rendering logic for track type
                    //
                    // Default case when data is not available
                    <tr key={index}>
                      <td colSpan="4">
                        <h3 className="h3">N/A</h3>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FavMain;
