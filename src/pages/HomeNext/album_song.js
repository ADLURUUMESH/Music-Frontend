import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./album_song.css";
import { useContext } from "react";
import { Context } from "../../context";
import { useLocation, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
// import Welcome from "../Welcome/welcome";
// import Recommend from "../Recommend/recommend";
// import { useNavigate, useLocation } from "react-router-dom";
// import Artists from "../Artists/Artists";
// import "../../../images/profile.png";
import ListGroup from "react-bootstrap/ListGroup";
// import "./Profile.css";
// import axios from "axios";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const AlbumSong = () => {
  const ids = useParams();
  const id = ids.id;
  console.log(id);
  const [tracks, setTracks] = useState([]);
  const accessToken = useContext(Context);
  console.log(accessToken);
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;

  // Example list of album IDs

  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  useEffect(() => {
    if (accessToken) {
      fetch(`https://api.spotify.com/v1/albums?ids=${ids.id}`, parameters)
        .then((res) => res.json())
        .then((data) => setTracks(data.albums))
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [accessToken]); // Run the effect whenever accessToken changes
  console.log(tracks);
  //   useEffect(() => {
  //     fetch(https://api.spotify.com/v1/albums?ids=${ids.id}, parameters)
  //       .then((res) => res.json())
  //       .then((data) => setTracks(data.albums));
  //   }, []);
  //   console.log(tracks[0].images[0].url);
  const users = {};
  return (
    <div>
      <div className=" align-items-center backg">
        <h2> {tracks[0]?.name} Songs</h2>
        {/* <img src={tracks[0].images[0]?.url}></img> */}
        <div className="w-90 bg-white rounded p-3 text-align-center boxShadow">
          {/* <Link to="/create" className="btn btn-success">
            Add
          </Link> */}
          <table className="table back">
            {/* <thead>
              <tr>
                <th>Song Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead> */}

            <tbody>
              {tracks &&
                tracks.length > 0 &&
                tracks.map((users, index) => {
                  return (
                    <tr>
                      <td>
                        <p>Track No:- </p> <h5>{index + 1}</h5>
                      </td>
                      <td>
                        <p>Track Name :- </p>{" "}
                        <h5>{users.tracks.items[0].name}</h5>
                      </td>
                      <td>
                        <p>Artist:- </p> <h5>{users.artists[0]?.name}</h5>
                      </td>

                      {/* <td>{users.location}</td> */}
                      <td className="td">
                        <button className="btn btn-success">
                          <a
                            onClick={() => {
                              navigate(`/new/${users.id}`, {
                                state: { username },
                              });
                            }}
                            // to={`/new/${users.id}`}
                            className="text-decoration-none btn-success text-white"
                          >
                            Play
                          </a>
                        </button>{" "}
                        <button className="btn btn-danger">
                          <Link
                            to={`/new/favourite/${users.id}`}
                            className="text-decoration-none text-white"
                          >
                            Add To Favourites
                          </Link>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default AlbumSong;

{
  /* <div className="ms-5">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  style={{
                    maxWidth: "80%",
                    maxHeight: "80%",
                    borderRadius: "50%",
                  }}
                  alt="Profile"
                  className="img"
                />
              </div>
              <div>
                <Card
                  style={{
                    width: "30rem",
                    marginTop: "-100px",
                    boxShadow: "none",
                    transition: "none",
                    backgroundColor: "white",
                    transitionTimingFunction: "ease-in-out",
                  }}
                >
                  <Card.Body>
                    <Card.Title>
                      <center>
                        <h3>Profile</h3>
                      </center>
                    </Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <span style={{ fontWeight: "bold" }}>User Id:</span>{" "}
                      {data._id}
                    </ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item> 
 <span style={{ fontWeight: "bold" }}>Username:</span>{" "}
{data.username}
</ListGroup.Item>
<ListGroup.Item>
<span style={{ fontWeight: "bold" }}>Name:</span>{" "}
{data.name}
</ListGroup.Item>
<ListGroup.Item>
<span style={{ fontWeight: "bold" }}>Email:</span>{" "}
{data.email}
</ListGroup.Item>
</ListGroup>
<center>
<Card.Body className="ms-5">
<Button variant="success" className="me-5">
  Update
</Button>
<Button variant="danger" className="me-5">
  Delete
</Button>
</Card.Body>
</center>
</Card>
</div>
</div>
</div>
</div>
</div>
</div>
);
};

export default Profile; */
}
