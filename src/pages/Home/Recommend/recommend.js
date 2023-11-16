import React, { useContext, useEffect, useState } from "react";
import "./recommendStyles.css";
import "../Artists/Artists.css";
import { Context } from "../../../context";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
// LoadingSpinner component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <BeatLoader color="#d1793b" size={30} className="BeatLoader" />
  </div>
);

const Recommend = () => {
  const [loading, setLoading] = useState(false);
  const [dataRecommend, setDataRecommend] = useState([]);
  const accessToken = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;

  // Example list of album IDs
  const albumIds = [
    "2JTcQYxkWCph2DFYHljgnS",
    "1Qr5Gq4WF1uaiIZkKIKgNN",
    "1D5M0OXMaT1dV9MADSPgIg",
    "5uMlNAH5rFVq9o5sFogsNh",
    "0qOjC3f9sN8JWr1SOz7m9Z",
    "7zAITOBN6eG4UBm4IapAik",
    "72CICJmh1qsqSPbU4xA7Le",
    "0iMTvKrZB1huRE2brpoQnu",
    "4f9WYw6XMUlo3O9dJ15HvP",
  ];
  const albumIdsString = albumIds.join(",");

  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  useEffect(() => {
    setLoading(true);
    if (accessToken) {
      fetch(
        `https://api.spotify.com/v1/albums?ids=${albumIdsString}`,
        parameters
      )
        .then((res) => res.json())
        .then((data) => setDataRecommend(data.albums))
        .then(setLoading(false))
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [accessToken]);

  return (
    <>
      <div>
        {loading && <LoadingSpinner />}
        <h1 className="artist-header">New Releases</h1>
        <div className="container">
          <ul className="cards">
            {dataRecommend &&
              dataRecommend.length > 0 &&
              dataRecommend.map((album) => (
                <>
                  <div>
                    <a
                      onClick={() => {
                        navigate(`/home/new/${album.id}`, {
                          state: { username },
                        });
                      }}
                    >
                      {" "}
                      <li className="card1" key={album.id}>
                        <img src={album.images[0]?.url} alt={album.name} />
                      </li>
                    </a>
                    <h1 className="artist-name">{album.name}</h1>
                  </div>
                </>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Recommend;
