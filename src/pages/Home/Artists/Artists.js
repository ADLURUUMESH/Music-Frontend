import React, { useEffect, useState, useContext } from "react";
import "./Artists.css";
import { Context } from "../../../context";

const Artists = () => {
  const [data, setData] = useState([]);
  const accessToken = useContext(Context);
  console.log(accessToken);
  const id = "5sSzCxHtgL82pYDvx2QyEU";
  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };
  useEffect(() => {
    fetch(`https://api.spotify.com/v1/artists/${id}/albums`, parameters)
      .then((res) => res.json())
      .then((data) => setData(data.items));
  }, []);
  console.log(data);
  return (
    <>
      <div>
        <h1 className="artist-header">Artists</h1>

        <div class="container">
          <ul class="cards">
            {data &&
              data.length > 0 &&
              data.map((items) => {
                return (
                  <li class="card radius">
                    <img src={items.images[0].url} alt=""></img>
                    {/* <h1>{items[0].name}</h1> */}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Artists;
