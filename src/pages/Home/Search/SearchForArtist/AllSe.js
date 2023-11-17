import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Context } from "../../../../context";
import "../Search.css";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
} from "react-bootstrap";
import { BeatLoader } from "react-spinners";
// LoadingSpinner component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <BeatLoader color="#d1793b" size={30} className="BeatLoader" />
  </div>
);

// const CLIENT_ID = "053e0b7273ca40beb916b87e76914661";
// const CLIENT_SECRET = "cde581f0468b41eaa78fa7f39b7d96fe";

function AllSe() {
  const [searchInput, setSearchInput] = useState("");
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [img, setImages] = useState();
  const accessToken = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const [artistID, setArtistID] = useState("");
  let username = location.state ? location.state.username : null;

  useEffect(() => {
    if (username === null) {
      navigate("/");
    }
  }, [username]);

  async function search() {
    //Get request using search to get the Artist ID
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    var artistid = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=album",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.albums.items[0].id;
      });
    setArtistID(artistid);
    var songimg = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=album",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.albums.items[0].images[0].url;
      });

    setImages(songimg);

    console.log("Artist ID is " + artistid);
    var returnedAlbums = await fetch(
      "https://api.spotify.com/v1/albums/" +
        artistid +
        "/tracks" +
        "?include_groups=album&market=IN&limit=50",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAlbums(data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const song = (album) => {};
  return (
    <div>
      {loading && <LoadingSpinner />}
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center", // Horizontal center
            textAlign: "center",
            marginLeft: "350px",
          }}
        >
          <InputGroup className="mb-3" size="lg">
            <FormControl
              placeholder="Search for Album"
              type="input"
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  search();
                }
              }}
              onChange={(event) => setSearchInput(event.target.value)}
              style={{
                maxWidth: "400px",
                boxShadow:
                  "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
              }}
              className="ps-4 pe-4"
            />
            <Button
              onClick={(event) => {
                search();
              }}
              style={{
                background: "linear-gradient(to right, #DC8441, #f6a461)",
                border: "none",
                boxShadow:
                  "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                textShadow: "3px 2px 5px rgba(202, 108, 42, 0.53)",
              }}
            >
              Search
            </Button>
          </InputGroup>
        </div>
      </Container>
      <Container className="card-container">
        <Row className="row row-cols-4">
          {albums.map((album, i) => {
            return (
              <a
                onClick={() => {
                  navigate(`/track/${album.id}`, {
                    state: { username },
                  });
                }}
              >
                <Card key={i} className="card">
                  <Card.Img src={img} />
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
          style={{
            background: "linear-gradient(to right, #DC8441, #f6a461)",
            border: "none",
            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
            textShadow: "3px 2px 5px rgba(202, 108, 42, 0.53)",
            fontSize: "20px",
          }}
        >
          Go Back
        </Button>
      </Container>
    </div>
  );
}

export default AllSe;
