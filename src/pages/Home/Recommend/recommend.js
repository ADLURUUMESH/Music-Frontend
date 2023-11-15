import React, { useContext, useEffect, useState } from "react";
import "./recommendStyles.css";
import "../Artists/Artists.css";
import { Context } from "../../../context";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

const Recommend = () => {
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
    // "4f9WYw6XMUlo3O9dJ15HvP",
    // "47JGljO2q9Hig0pG3agarw",
    // "0qOjC3f9sN8JWr1SOz7m9Z",
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
    if (accessToken) {
      fetch(
        `https://api.spotify.com/v1/albums?ids=${albumIdsString}`,
        parameters
      )
        .then((res) => res.json())
        .then((data) => setDataRecommend(data.albums))
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [accessToken]);
  // useEffect(() => {
  //   fetch(`https://api.spotify.com/v1/albums?ids=${albumIdsString}`, parameters)
  //     .then((res) => res.json())
  //     .then((data) => setDataRecommend(data.albums));
  // }, []);

  return (
    <>
      <div>
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

// <div>
//   <h1 className="recommend-header">Recommends for You</h1>

//   <div class="container">
//     <ul class="cards">
//       {dataRecommend &&
//         dataRecommend.length > 0 &&
//         dataRecommend.map((items) => {
//           return (
//             <>
//               <div>
//                 <li class="card1">
//                   <img src={items.images[0].url} alt=""></img>
//                 </li>
//                 <h1 className="artist-name">{items.name}</h1>
//               </div>
//             </>
//             // <li class="card">
//             //   <div>
//             //     <div class="card-content">
//             //       <p>
//             //         Lorem ipsum dolor sit amet consectetur adipisicing elit.
//             //         Ab repudiandae magnam harum natus fuga et repellat in
//             //         maiores.
//             //       </p>
//             //       <img src={items.images[0].url}></img>
//             //     </div>
//             //     <h3 class="card-title">{items.name}</h3>
//             //   </div>
//             //   <div class="card-link-wrapper">
//             //     <a href="" class="card-link">
//             //       Learn More
//             //     </a>
//             //   </div>
//             // </li>
//           );
//         })}
{
  /* <li class="card">
            <div>
              <h3 class="card-title">Service 3</h3>
              <div class="card-content">
                <p>
                  Phasellus ultrices lorem vel bibendum ultricies. In hendrerit
                  nulla a ante dapibus pulvinar eu eget quam.
                </p>
              </div>
            </div>
            <div class="card-link-wrapper">
              <a href="" class="card-link">
                Learn More
              </a>
            </div>
          </li>
          <li class="card">
            <div>
              <h3 class="card-title">Service 4</h3>
              <div class="card-content">
                <p>
                  Aenean posuere mauris quam, pellentesque auctor mi bibendum
                  nec. Sed scelerisque lacus nisi, quis auctor lorem ornare vel.
                </p>
              </div>
            </div>
            <div class="card-link-wrapper">
              <a href="" class="card-link">
                Learn More
              </a>
            </div>
          </li>
          <li class="card">
            <div>
              <h3 class="card-title">Service 5</h3>
              <div class="card-content">
                <p>
                  Vestibulum pharetra fringilla felis sit amet tempor. Interdum
                  et malesuada fames ac ante ipsum primis in faucibus. Cras et
                  arcu sit amet est consequat feugiat. Nam ut sapien pulvinar.
                </p>
              </div>
            </div>
            <div class="card-link-wrapper">
              <a href="" class="card-link">
                Learn More
              </a>
            </div>
          </li>
          <li class="card">
            <div>
              <h3 class="card-title">Service 6</h3>
              <div class="card-content">
                <p>
                  Donec ut tincidunt nisl. Vivamus eget eros id elit feugiat
                  mollis. Nam sed sem quis libero finibus tempor.
                </p>
              </div>
            </div>
            <div class="card-link-wrapper">
              <a href="" class="card-link">
                Learn More
              </a>
            </div>
          </li>
          <li class="card">
            <div>
              <h3 class="card-title">Service 7</h3>
              <div class="card-content">
                <p>
                  Aliquam eget nisl auctor, sollicitudin ipsum at, dignissim
                  ligula. Donec tincidunt in elit et pellentesque. Integer
                  posuere metus ac massa mollis euismod.
                </p>
              </div>
            </div>
            <div class="card-link-wrapper">
              <a href="" class="card-link">
                Learn More
              </a>
            </div>
          </li>
          <li class="card">
            <div>
              <h3 class="card-title">Service 8</h3>
              <div class="card-content">
                <p>
                  {" "}
                  Vivamus eget eros id elit feugiat mollis. Nam sed sem quis
                  libero finibus tempor.
                </p>
              </div>
            </div>
            <div class="card-link-wrapper">
              <a href="" class="card-link">
                Learn More
              </a>
            </div>
          </li>
          <li class="card">
            <div>
              <h3 class="card-title">Service 9</h3>
              <div class="card-content">
                <p>
                  Duis id congue turpis. Donec sodales porta felis, nec
                  ultricies ante. Nam placerat vitae metus sit amet tempor.
                  Aliquam ac dictum est.
                </p>
              </div>
            </div>
            <div class="card-link-wrapper">
              <a href="" class="card-link">
                Learn More
              </a>
            </div>
          </li>
          <li class="card">
            <div>
              <h3 class="card-title">Service 10</h3>
              <div class="card-content">
                <p>Pellentesque eget eros eget justo efficitur fermentum.</p>
              </div>
            </div>
            <div class="card-link-wrapper">
              <a href="" class="card-link">
                Learn More
              </a>
            </div>
          </li>
          <li class="card">
            <div>
              <h3 class="card-title">Service 11</h3>
              <div class="card-content">
                <p>
                  Phasellus posuere nec nibh ut tincidunt. Aenean mollis turpis
                  non eros posuere, at luctus leo hendrerit. Integer non libero
                  sapien.
                </p>
              </div>
            </div>
            <div class="card-link-wrapper">
              <a href="" class="card-link">
                Learn More
              </a>
            </div>
          </li>
          <li class="card">
            <div>
              <h3 class="card-title">Service 12</h3>
              <div class="card-content">
                <p>
                  Vestibulum ante ipsum primis in faucibus orci luctus et
                  ultrices posuere cubilia curae; Vestibulum ornare metus ac
                  lectus scelerisque volutpat.
                </p>
              </div>
            </div>
            <div class="card-link-wrapper">
              <a href="" class="card-link">
                Learn More
              </a>
            </div>
          </li> */
}
//       </ul>
//     </div>
//   </div>
// );
// };

// export default Recommend;
