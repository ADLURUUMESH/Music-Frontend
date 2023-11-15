import React, { useEffect, useState, useContext } from "react";
import "./Artists.css";
import { Context } from "../../../context";

const Artists = () => {
  const [data, setData] = useState([]);
  const accessToken = useContext(Context);
  console.log(accessToken);
  const id = "5sSzCxHtgL82pYDvx2QyEU,4zCH9qm4R2DADamUHMCa6O";
  // https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6
  // https://api.spotify.com/v1/artists?${id}
  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };
  // useEffect(() => {
  //   fetch(
  //     `https://api.spotify.com/v1/artists?ids=4zCH9qm4R2DADamUHMCa6O%2C2FgHPfRprDaylrSRVf1UlN%2C5sSzCxHtgL82pYDvx2QyEU%2C1mYsTxnqsietFxj1OgoGbG%2C12l1SqSNsg2mI2IcXpPWjR%2C2q1LRGJHpFxovU8Tz6OgRn`,
  //     parameters
  //   )
  //     .then((res) => res.json())
  //     .then((data) => setData(data.artists));
  // }, []);
  useEffect(() => {
    if (accessToken) {
      fetch(
        `https://api.spotify.com/v1/artists?ids=4zCH9qm4R2DADamUHMCa6O%2C2FgHPfRprDaylrSRVf1UlN%2C5sSzCxHtgL82pYDvx2QyEU%2C1mYsTxnqsietFxj1OgoGbG%2C12l1SqSNsg2mI2IcXpPWjR%2C2q1LRGJHpFxovU8Tz6OgRn`,
        parameters
      )
        .then((res) => res.json())
        .then((data) => setData(data.artists))
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [accessToken]); // Run the effect whenever accessToken changes

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
                  <>
                    <div>
                      <li class="card-artist radius">
                        <img src={items.images[0].url} alt=""></img>
                      </li>
                      <h1 className="artist-name">{items.name}</h1>
                    </div>
                  </>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Artists;
