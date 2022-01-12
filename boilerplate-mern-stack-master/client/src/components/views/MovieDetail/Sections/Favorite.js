import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  useEffect(() => {
    let variables = {
      userFrom, // 유저 정보
      movieId, // 좋아하는 영화id
    };

    // 얼마나 많은 사람이 이 영화를 Favorite 리스트에 넣었는지 그 숫자 정보 얻기 fetch, axios를 쓸 수있다
    axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      console.log(response.data);
      setFavoriteNumber(response.data.favoriteNumber);
      if (response.data.success) {
      } else {
        alert("숫자 정보를 가져오는데 실패 했습니다.");
      }
    });

    axios.post("/api/favorite/favorited", variables).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setFavorited(response.data.favorited);
      } else {
        alert("정보를 가져오는데 실패 했습니다.");
      }
    });
  }, []);

  return (
    <div>
      <button>
        {Favorited ? "Not Favorited" : "Add to Favorite"} {FavoriteNumber}
      </button>
    </div>
  );
}

export default Favorite;
