import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context";
import "./Favourites.css";
import { Alert } from "react-st-modal";

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
    console.log(obj);
    // const url = `http://localhost:5000/Fav/delete`;
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
          Alert("Favourite deleted successfully", "");
          window.location.reload();
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
                <div className="table-parent">
                  {user.type === "album" ? (
                    // Rendering logic for album type

                    <>
                      <tr key={index}>
                        <td className="td-table">{index + 1}</td>
                        <td>
                          {
                            <img
                              src={favSongs[index].albums[0].images[2].url}
                              alt=""
                            />
                          }
                        </td>
                        <td className="td-table">
                          <h3 className="h3">
                            {" "}
                            {favSongs[index].albums[0].tracks.items[0].name}
                          </h3>
                        </td>
                        {/* <td>{user.username}</td>
                  <td>{user.type}</td>  */}
                        <td className="buttons td-table">
                          <button className="btn btn-success btn-css">
                            <a
                              onClick={(e) => {
                                e.preventDefault(); // Prevent default anchor behavior
                                navigate(
                                  `/artist/new/${favSongs[index].albums[0].id}`,
                                  {
                                    state: { username },
                                  }
                                );
                              }}
                              className="text-decoration-none btn-success text-white "
                            >
                              Play
                            </a>
                          </button>
                          <button
                            className="btn btn-danger btn-css"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ) : (
                    // Rendering logic for track type
                    <>
                      <tr key={index}>
                        <td className="td-table">{index + 1}</td>
                        <td className="td-table">
                          {
                            <img
                              src={
                                favSongs[index]?.tracks[0].album.images[2].url
                              }
                              alt=""
                            />
                          }
                        </td>
                        <td className="td-table">
                          <h3 className="h3">{data.tracks[0]?.name}</h3>
                        </td>
                        {/* <td>{user.username}</td>
                  <td>{user.type}</td>  */}
                        <td className="buttons td-table">
                          <button className="btn btn-success btn-css">
                            <a
                              onClick={(e) => {
                                e.preventDefault(); // Prevent default anchor behavior
                                navigate(
                                  `/track/${favSongs[index]?.tracks[0].id}`,
                                  {
                                    state: { username },
                                  }
                                );
                              }}
                              className="text-decoration-none btn-success text-white "
                            >
                              Play
                            </a>
                          </button>
                          <button
                            className="btn btn-danger btn-css"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  )}
                </div>
                // </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FavMain;
