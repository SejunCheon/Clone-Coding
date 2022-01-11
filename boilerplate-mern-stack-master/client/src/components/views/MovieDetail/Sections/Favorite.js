import React from "react";
import { useEffect } from "react";
import Axios from "axios";

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  useEffect(() => {
    let variables = {
      userFrom, // 유저 정보
      movieId, // 좋아하는 영화id
    };

    // 얼마나 많은 사람이 이 영화를 Favorite 리스트에 넣었는지 그 숫자 정보 얻기 fetch, axios를 쓸 수있다
    Axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      console.log(response.data);
      if (response.data.success) {
      } else {
        alert("숫자 정보를 가져오는데 실패 했습니다.");
      }
    });
  }, []);

  return (
    <div>
      <button>Favorite</button>
    </div>
  );
}

export default Favorite;
