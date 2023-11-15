import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
} from "react-bootstrap";

const CLIENT_ID = "053e0b7273ca40beb916b87e76914661";
const CLIENT_SECRET = "cde581f0468b41eaa78fa7f39b7d96fe";

function AllSe() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [img, setImages] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;
  useEffect(() => {
    console.log(username);
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

  //BQBn477CxhUBbMSypfXJn8UU4FBys2JBPkbmgG6lVOinEJR2GqadVfuRFih2EE6Y7QBnCK4A7aeCCmwYVdneO94775ag0ZT1KEaDeni1nXt6zNTU0c;

  async function search() {
    //Get request using search to get the Artist ID
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    var artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=album",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.albums.items[0].id;
      });

    var songimg = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=album",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.albums.items[0].images[0].url;
      });

    setImages(songimg);

    console.log("Artist ID is " + artistID);
    var returnedAlbums = await fetch(
      "https://api.spotify.com/v1/albums/" +
        artistID +
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
  return (
    <div>
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Search for Album"
            type="input"
            onKeyPress={(event) => {
              if (event.key == "Enter") {
                search();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
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
      <Container>
        <Row style={{ marginLeft: "200px" }} className="row row-cols-4">
          {albums.map((album, i) => (
            <Card key={i}>
              <Card.Img src={img} />
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
      <Container style={{ textAlign: "center", fontSize: "20px" }}>
        <Button
          onClick={() => {
            navigate("/search", { state: { username } });
          }}
          style={{ fontSize: "20px" }}
        >
          Go Back
        </Button>
      </Container>
    </div>
  );
}

export default AllSe;
