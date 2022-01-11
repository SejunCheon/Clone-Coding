import React from "react";
import { Col } from "antd";
import { IMAGE_BASE_URL } from "../../Config";

function GridCards(props) {
  if (props.LandingPage) {
    return (
      // 한 컬럼에 24 사이즈가 들어간다
      <Col lg={6} md={8} sm={24}>
        <div style={{ position: "relative" }}>
          <a href={`/movies/${props.movieId}`}>
            <img
              style={{ width: "100%", height: "320px" }}
              src={props.image}
              alt={props.movieName}
            />
          </a>
        </div>
      </Col>
    );
  } else {
    return (
      <Col lg={6} md={8} sm={24}>
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "320px" }}
            src={props.image}
            alt={props.characterName}
          />
        </div>
      </Col>
    );
  }
}

export default GridCards;
