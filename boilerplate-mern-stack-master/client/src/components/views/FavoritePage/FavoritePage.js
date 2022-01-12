import { useState, useEffect } from "react";
import React from "react";
import "./Favorite.css";
import axios from "axios";
import Favorites from "../MovieDetail/Sections/Favorite";

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .post("/api/favorite/getFavoriteMovie", {
        userFrom: localStorage.getItem("userId"),
      })
      .then((res) => {
        if (res.data.success) {
          setFavorites(res.data.favorites);
        } else {
          alert("영화 정보를 가져오는데 실패했습니다.");
        }
      });
  }, []);

  return (
    <div style={{ width: "80%", margin: "3rem auto" }}>
      <h2>Favorite Movies</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <td>Remove from favorites</td>
          </tr>
        </thead>
        <tbody>
          {Favorites.map((favorite, index) => (
            <tr key={index}>
              <td>{favorite.movieTitle}</td>
              <td>{favorite.movieRunTime} mins</td>
              <td>
                <button>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
