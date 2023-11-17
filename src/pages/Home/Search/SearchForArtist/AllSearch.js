import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../../Search/Search.css";
import AllSe from "./AllSe";
import { BeatLoader } from "react-spinners";

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <BeatLoader color="#d1793b" size={30} className="BeatLoader" />
  </div>
);

function AllSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;

  useEffect(() => {
    if (username === null) {
      navigate("/");
    }
  }, [username]);

  const [loading, setLoading] = useState(true); // Set initial loading state to true

  const handleLogout = () => {
    username = "";
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile", { state: { username } });
  };

  const handleHome = () => {
    navigate("/home", { state: { username } });
  };

  const handleSearch = () => {
    navigate("/search", { state: { username } });
  };

  useEffect(() => {
    // Simulate data fetching with a delay
    const fetchData = async () => {
      try {
        // Replace this with your actual data fetching logic
        // For example, fetching data from an API
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false); // Set loading to false after data fetching
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once on component mount

  return (
    <div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 color">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a
                href="/"
                className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none anchor"
              >
                <span className="fs-5 d-none d-sm-inline">
                  <h1>VibeVerse</h1>
                </span>
              </a>
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li className="nav-item">
                  <a
                    className="nav-link align-middle px-0 anchor"
                    onClick={() => handleHome()}
                  >
                    <i className="fs-4 bi-house text-white"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline items-nav1">
                      Home
                    </span>
                  </a>
                </li>
                <div className="box1"></div>
                <li>
                  <a
                    onClick={() => handleSearch()}
                    data-bs-toggle="collapse"
                    className="nav-link px-0 align-middle anchor"
                  >
                    <i className="fs-4 bi-search text-white"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline items-nav1">
                      Search
                    </span>{" "}
                  </a>
                </li>
                <div className="box1"></div>
                <li>
                  <a
                    onClick={() => {
                      navigate("/favourites", { state: { username } });
                    }}
                    className="nav-link px-0 align-middle anchor"
                  >
                    <i className="fs-4 bi-heart text-white"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline items-nav1">
                      Favourites
                    </span>
                  </a>
                </li>
                <div className="box"></div>
                <li>
                  <a
                    onClick={() => {
                      handleProfile();
                    }}
                    data-bs-toggle="collapse"
                    className="nav-link px-0 align-middle anchor"
                  >
                    <i className="fs-4 bi-person text-white"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline items-nav1">
                      Profile
                    </span>
                  </a>
                </li>
              </ul>
              <hr />
              <div className="dropdown pb-4">
                <div className="box" style={{ marginBottom: "10px" }}></div>
                <a
                  href="#"
                  className="d-flex align-items-center text-white text-decoration-none anchor"
                  aria-expanded="false"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <i className="fs-4 bi bi-box-arrow-left"></i>
                  <span className="d-none d-sm-inline mx-1 items-nav1">
                    &nbsp;Log Out
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div
            className="margin1"
            style={{ display: "flex", height: "100vh", width: "1275px" }}
          >
            <div
              className="col py-3 "
              style={{
                position: "relative !important",
                overflowY: "auto",
                height: "100%",
              }}
            >
              <span>
                <h1
                  style={{
                    textAlign: "center",
                    fontSize: "70px",
                    textShadow: "3px 2px 5px rgba(202, 108, 42, 0.53)",
                    color: "#DC8441",
                  }}
                >
                  Search for Album
                </h1>
              </span>
              <br />
              {loading ? <LoadingSpinner /> : <AllSe />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllSearch;
