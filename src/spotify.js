// import axios from "axios";

// const authEndpoint = "https://accounts.spotify.com/authorize?";
// const clientId = "053e0b7273ca40beb916b87e76914661";
// const redirectUri = "http://localhost:3000";
// const scopes = ["user-library-read", "playlist-read-private"];

// export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
//   "%20"
// )}&response_type=token&show_dialog=true`;

// const apiClient = axios.create({
//   baseURL: "https://api.spotify.com/v1/",
// });

// export const setClientToken = (token) => {
//   apiClient.interceptors.request.use(async function (config) {
//     config.headers.Authorization = "Bearer " + token;
//     return config;
//   });
// };

// export default apiClient;

const [data, setData] = useState("");
const CLIENT_ID = "053e0b7273ca40beb916b87e76914661";
const CLIENT_SECRET_ID = "cde581f0468b41eaa78fa7f39b7d96fe";
const [accessToken, setAccessToken] = useState("");

useEffect(() => {
  var authParameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "grant_type=client_credentials&client_id=" +
      CLIENT_ID +
      "&client_secret=" +
      CLIENT_SECRET_ID,
  };
  fetch("https://accounts.spotify.com/api/token", authParameters)
    .then((result) => result.json())
    .then((data) => setAccessToken(data.access_token));
}, []);
console.log(accessToken);
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
    "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks",
    artistParameters
  )
    .then((response) => response.json())

    .then((data) => console.log(data));

  //New Releases Data

  const newReleasesResponse = await fetch(
    "https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n/tracks",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  if (newReleasesResponse.ok) {
    const newReleasesData = await newReleasesResponse.json();
    console.log("New Releases:", newReleasesData);
  } else {
    console.error("Failed to fetch new releases");
  }
}
search();
