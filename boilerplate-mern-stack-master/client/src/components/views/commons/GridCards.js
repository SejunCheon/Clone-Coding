import React from "react";
import { Col } from "antd";
import { IMAGE_BASE_URL } from "../../Config";

function GridCards(props) {
  return (
    <div>
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
    </div>
  );
}

export default GridCards;
