import axios from "axios";
import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieDescription = () => {
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    getFilmInfo();
  }, []);
  const [content, setContent] = useState({});
  const getFilmInfo = () => {
    axios
      .get(`https://at.usermd.net/api/movies/${id}`)
      .then((response) => setContent(response.data));
  };
  return (
    <>
      <div>
        <div className="filmdescription">
          <img src={content.image} width="250px"></img>
          <p className="description">{content.content}</p>
        </div>
      </div>
    </>
  );
};
export default MovieDescription;
