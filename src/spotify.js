import React, { useContext, useState } from "react";
import { Context } from "./context";

const Spotify = () => {
  const accessToken = useContext(Context);
  const [data, setData] = useState("");

  const searchInput = "Jailer";

  async function search() {
    console.log("Search for " + searchInput);
    var artistParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    var albumID = await fetch(
      "https://api.spotify.com/v1/albums/0TnOYISbd1XYRBk9myaseg/top-tracks",
      artistParameters
    )
      .then((response) => response.json())

      .then((data) => console.log(data));

    //New Releases Data

    //   const newReleasesResponse = await fetch(
    //     "https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6",
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + accessToken,
    //       },
    //     }
    //   );

    //   if (newReleasesResponse.ok) {
    //     const newReleasesData = await newReleasesResponse.json();
    //     console.log("New Releases:", newReleasesData);
    //   } else {
    //     console.error("Failed to fetch new releases");
    //   }
    // }
    search();
  }
  return <div></div>;
};

export default Spotify;
