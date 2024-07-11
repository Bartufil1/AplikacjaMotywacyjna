import React, { Component } from "react";

const Movie = (props) => {
  return (
    <>
      <div className="movie1">
        <img
          width="170px"
          height="auto"
          src={props.img}
          className="poster"
        ></img>
      </div>
    </>
  );
};
export default Movie;
