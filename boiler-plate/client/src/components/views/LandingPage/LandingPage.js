import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    axios.get("/api/hello").then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div>
      <h1>이곳은 LandingPage입니다.</h1>
      <p>뿌지직</p>
      <Link to="/login">로그인</Link>
    </div>
  );
}

export default LandingPage;
