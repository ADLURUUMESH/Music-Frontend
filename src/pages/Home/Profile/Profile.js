import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Welcome from "../Welcome/welcome";
import Recommend from "../Recommend/recommend";
import { useNavigate, useLocation } from "react-router-dom";
import Artists from "../Artists/Artists";
import ListGroup from "react-bootstrap/ListGroup";
import "./Profile.css";
import axios from "axios";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Alert } from "react-st-modal";
import { Form } from "react-bootstrap";
import { BeatLoader } from "react-spinners";

// LoadingSpinner component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <BeatLoader color="#d1793b" size={30} className="BeatLoader" />
  </div>
);

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPass, setUpdatedPassword] = useState("");
  const [updatedConf, setUpdatedConf] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  const handleLogout = () => {
    username = "";
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile", { state: { username } });
  };

  const handleSearch = () => {
    navigate("/search", { state: { username } });
  };

  const handleHome = () => {
    navigate("/home", { state: { username } });
  };

  useEffect(() => {
    setLoading(true);
    const obj = { username };
    const fetchData = async () => {
      try {
        const url = "https://music-backend-kinl.onrender.com/Signup-Login/data";
        const response = await axios.post(url, obj);
        setData(response.data);
        setName(response.data.name);
      } catch (error) {
        console.error("Error fetching history data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  const handleDelete = () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete your profile?"
    );

    if (shouldDelete) {
      setLoading(true);
      const obj1 = { username };
      // const url = `http://localhost:5000/Signup-Login/delete`;
      const url = "https://music-backend-kinl.onrender.com/Signup-Login/delete";

      // const url1 = "http://localhost:5000/Fav/deleteAll";
      const url1 = "https://music-backend-kinl.onrender.com/Fav/delete";

      axios
        .delete(url, {
          data: {
            username: username,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            Alert("User deleted successfully", "");
            navigate("/signup");
          } else if (res.status === 404) {
            Alert("User not found", "");
          } else {
            Alert("Failed to delete user", "");
          }

          axios
            .delete(url1, {
              data: {
                username: username,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                navigate("/signup");
              } else if (res.status === 404) {
                Alert("User not found", "");
              } else {
                Alert("Failed to delete user", "");
              }
            })
            .catch((err) => {
              Alert(
                "An error occurred while deleting the user: " + err.message,
                ""
              );
            })
            .finally(() => {
              setLoading(false);
            });
        })
        .catch((err) => {
          Alert(
            "An error occurred while deleting the user: " + err.message,
            ""
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // The user canceled the deletion
      // You can add any rollback logic here if needed
    }
  };

  const handleUpdate = () => {
    setShowUpdateForm(true);
  };

  const handleUpdateSubmit = async (event) => {
    let updatedData;
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      event.preventDefault();
      if (updatedConf === updatedPass || updatedPass.length > 8) {
        updatedData = {
          username: data.username,
          name: updatedName,
          email: data.email,
          password: updatedPass,
        };
        // const url = "http://localhost:5000/Signup-Login/update";
        const url =
          "https://music-backend-kinl.onrender.com/Signup-Login/update";

        setLoading(true);

        try {
          const response = await axios.post(url, updatedData);
          if (response.status === 200) {
            Alert("Profile updated successfully", "");
          } else {
            Alert("Profile update failed", "");
          }
        } catch (err) {
          Alert(
            "An error occurred while updating the profile: " + err.message,
            ""
          );
        } finally {
          setLoading(false);
        }

        window.location.reload();
      } else {
        Alert(
          "Passwords not matched or Password is less than 8 characters",
          ""
        );
      }
    }
  };

  return (
    <div>
      {loading && <LoadingSpinner />}
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 color">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a
                href="/"
                class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none anchor"
              >
                <span class="fs-5 d-none d-sm-inline">
                  <h1>VibeVerse</h1>
                </span>
              </a>
              <ul
                class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li class="nav-item">
                  <a
                    onClick={() => {
                      handleHome();
                    }}
                    class="nav-link align-middle px-0 anchor"
                  >
                    <i class="fs-4 bi-house text-white"></i>{" "}
                    <span class="ms-1 d-none d-sm-inline items-nav">Home</span>
                  </a>
                </li>
                <div class="box"></div>
                <li>
                  <a
                    data-bs-toggle="collapse"
                    class="nav-link px-0 align-middle anchor"
                    onClick={() => handleSearch()}
                  >
                    <i class="fs-4 bi-search text-white"></i>{" "}
                    <span class="ms-1 d-none d-sm-inline items-nav">
                      Search
                    </span>{" "}
                  </a>
                </li>
                <div class="box"></div>
                <li>
                  <a
                    onClick={() => {
                      navigate("/favourites", { state: { username } });
                    }}
                    class="nav-link px-0 align-middle anchor"
                  >
                    <i class="fs-4 bi-heart text-white"></i>{" "}
                    <span class="ms-1 d-none d-sm-inline items-nav">
                      Favourites
                    </span>
                  </a>
                </li>
                <div class="box"></div>
                <li>
                  <a
                    onClick={() => {
                      handleProfile();
                    }}
                    data-bs-toggle="collapse"
                    class="nav-link px-0 align-middle anchor"
                  >
                    <i class="fs-4 bi-person text-white"></i>{" "}
                    <span class="ms-1 d-none d-sm-inline items-nav">
                      Profile
                    </span>
                  </a>
                </li>
              </ul>
              <hr />
              <div class="dropdown pb-4">
                <div class="box" style={{ marginBottom: "10px" }}></div>
                <a
                  href="#"
                  class="d-flex align-items-center text-white text-decoration-none anchor"
                  aria-expanded="false"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  {/* <img
                    src="https://github.com/mdo.png"
                    alt="hugenerd"
                    width="30"
                    height="30"
                    class="rounded-circle"
                  /> */}
                  <i class="fs-4 bi bi-box-arrow-left"></i>
                  <span class="d-none d-sm-inline mx-1 items-nav">
                    &nbsp;Log Out
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div
            class="margin"
            style={{ display: "flex", height: "100vh", width: "1275px" }}
          >
            <div
              className="col py-3"
              style={{
                position: "relative !important",
                overflowY: "auto",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="ms-5">
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
                {showUpdateForm ? (
                  <Card
                    className="img11"
                    style={{
                      width: "30rem",
                      marginTop: "-100px",
                      boxShadow: "none",
                      transition: "none",
                      backgroundColor: "white",
                      transitionTimingFunction: "none",
                      transform: "none",
                      fontSize: "20px",
                      color: "black",
                    }}
                  >
                    <Card.Body>
                      <center>
                        <h4 style={{ fontWeight: "bold" }}>Update Form</h4>
                      </center>
                      <Form
                        className="mt-4"
                        noValidate
                        validated={validated}
                        onSubmit={handleUpdateSubmit}
                        style={{ fontWeight: "bold" }}
                      >
                        <Form.Group
                          className="mb-3"
                          controlId="formHorizontalUsername"
                        >
                          <Form.Label>Username</Form.Label>
                          <Form.Control type="text" value={username} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Name:
                          </Form.Label>
                          <Form.Control
                            controlId="validationCustom01"
                            type="text"
                            placeholder="Enter your name"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                            required
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                            Please Enter Name.
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Email:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={data.email}
                            readOnly
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Password:
                          </Form.Label>
                          <Form.Control
                            controlId="validationCustom02"
                            type="password"
                            placeholder="Enter your Password"
                            value={updatedPass}
                            onChange={(e) => setUpdatedPassword(e.target.value)}
                            required
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                            Please choose a Password.
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                          style={{ fontWeight: "bold" }}
                          className="mb-3"
                        >
                          <Form.Label>Confirm Password:</Form.Label>
                          <Form.Control
                            controlId="validationCustom03"
                            type="text"
                            placeholder="Confirm your password"
                            value={updatedConf}
                            onChange={(e) => setUpdatedConf(e.target.value)}
                            required
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                            Please confirm Password.
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Button
                          variant="success"
                          type="submit"
                          className="ms-5 me-5"
                        >
                          Save Changes
                        </Button>
                        <Button
                          className="ms-5"
                          variant="primary"
                          onClick={() => {
                            window.location.reload();
                          }}
                        >
                          Go Back
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                ) : (
                  <Card
                    className="img11"
                    style={{
                      zIndex: 0,
                      width: "30rem",
                      marginTop: "-100px",
                      boxShadow: "none",
                      transition: "none",
                      backgroundColor: "white",
                      transitionTimingFunction: "none",
                      fontSize: "20px",
                      transform: "none",
                      color: "black",
                    }}
                  >
                    <Card.Body>
                      <Card.Title>
                        <center>
                          <h4 style={{ fontWeight: "bold" }}>Profile</h4>
                        </center>
                      </Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>
                        <span style={{ fontWeight: "bold" }}>User Id:</span>{" "}
                        {data._id}
                      </ListGroup.Item>
                      <ListGroup.Item>
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
                        <Button
                          variant="success"
                          className="me-5"
                          onClick={handleUpdate}
                        >
                          Update
                        </Button>
                        <Button
                          variant="danger"
                          className="me-5"
                          onClick={() => {
                            handleDelete();
                          }}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </center>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
