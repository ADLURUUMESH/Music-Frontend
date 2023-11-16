import React, { useContext, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../../../context";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
} from "react-bootstrap";

function ArtistNext() {
  const ids = useParams();

  const [searchInput, setSearchInput] = useState("");
  const accessToken = useContext(Context);
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  let username = location.state ? location.state.username : null;

  var searchParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  useEffect(() => {
    fetch(
      "https://api.spotify.com/v1/artists/" +
        ids.id +
        "/albums" +
        "?include_groups=album&market=IN&limit=50",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.items);
        setAlbums(data.items);
      });
  }, [accessToken]);

  console.log(albums);
  return (
    <div>
      <Container>
        <InputGroup className="mb-3" size="lg"></InputGroup>
      </Container>
      <Container className="card-container">
        <Row className="row row-cols-3">
          {albums.map((album, i) => {
            console.log(album);
            return (
              <a
                //  to={`/artist/new/${album.id}`}
                onClick={() => {
                  navigate(`/artist/new/${album.id}`, { state: { username } });
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

export default ArtistNext;
