import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Search.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
} from "react-bootstrap";
import { BeatLoader } from "react-spinners";

const CLIENT_ID = "053e0b7273ca40beb916b87e76914661";
const CLIENT_SECRET = "cde581f0468b41eaa78fa7f39b7d96fe";

// LoadingSpinner component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <BeatLoader color="#d1793b" size={30} className="BeatLoader" />
  </div>
);

function ArtSe() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const artist = "artist";
  let username = location.state ? location.state.username : null;

  useEffect(() => {
    if (username === null) {
      navigate("/");
    }
  }, [username]);

  useEffect(() => {
    //API Access Token
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  async function search() {
    try {
      setLoading(true);

      console.log("Search for " + searchInput);

      //Get request using search to get the Artist ID
      var searchParameters = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };
      var artistID = await fetch(
        "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
        searchParameters
      )
        .then((response) => response.json())
        .then((data) => {
          return data.artists.items[0].id;
        });

      console.log("Artist ID is " + artistID);

      var returnedAlbums = await fetch(
        "https://api.spotify.com/v1/artists/" +
          artistID +
          "/albums" +
          "?include_groups=album&market=IN&limit=50",
        searchParameters
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.items);
          setAlbums(data.items);
        });

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <div>
      {loading && <LoadingSpinner />}
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Search for Artist"
            type="input"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
            class="ps-4 pe-4 justify-content-center"
          />
          <Button
            onClick={(event) => {
              search();
            }}
          >
            Search
          </Button>
        </InputGroup>
      </Container>

      <Container className="card-container">
        <Row className="row row-cols-4">
          {albums.map((album, i) => {
            console.log(album);
            return (
              <a
                onClick={() => {
                  navigate(`/artist/new/${album.id}`, {
                    state: { username },
                  });
                }}
              >
                <Card key={i} className="card">
                  <Card.Img src={album.images[0].url} />
                  <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                  </Card.Body>
                </Card>
              </a>
            );
          })}
        </Row>
      </Container>
      <Container style={{ textAlign: "center", fontSize: "20px" }}>
        <Button
          onClick={() => {
            navigate("/home", { state: { username } });
          }}
          style={{ fontSize: "20px" }}
        >
          Go Back
        </Button>
      </Container>
    </div>
  );
}

export default ArtSe;
