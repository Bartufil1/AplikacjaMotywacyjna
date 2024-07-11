import React, { Component } from "react";

const MovieText = (props) => {
  return (
    <>
      <div>
        <div>
          <h4 className="title">{props.title}</h4>
          <p className="description">{props.content.substring(0, 50)}</p>
        </div>
      </div>
    </>
  );
};
export default MovieText;
