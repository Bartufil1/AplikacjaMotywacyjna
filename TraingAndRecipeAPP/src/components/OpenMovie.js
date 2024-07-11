import React, { Component, useEffect, useState } from "react";
import Movie from "./Movie";
import MovieText from "./MovieText";
import MarkMovie from "./MarkMovie";
import MovieDetails from "./MovieDetails";
import axios from "axios";
import { decodeToken } from "react-jwt";

const OpenMovie = () => {
  const decoded = decodeToken(localStorage.getItem("token") ?? {});
  const isAdmin = decoded?.isAdmin ? decoded.isAdmin : false;
  const [data, setData] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    getFilm();
    getWorkout();
  }, []);
  const getFilm = () => {
    axios({
      method: "get",
      url: "http://localhost:3000/api/recipe/getAll",
    })
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => console.log(error));
    console.log(data);
  };

  const deleteFilm = (filmId) => {
    if (isAdmin) {
      axios({
        method: "delete",
        url: "http://localhost:3000/api/recipe/remove/" + filmId,
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => console.log(error));
      console.log(data);
    }
  };

  const getWorkout = () => {
    axios({
      method: "get",
      url: "http://localhost:3000/api/workout/getAll",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        console.log(response);
        setWorkouts(response.data);
      })
      .catch((error) => console.log(error));
    console.log(data);
  };

  const deleteWorkout = (filmId) => {
    if (isAdmin) {
      axios({
        method: "delete",
        url: "http://localhost:3000/api/workout/remove/" + filmId,
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => console.log(error));
      console.log(data);
    }
  };

  return (
    <div>
      <div className="filmsCointainer">
        {data?.map((data, index) => {
          return (
            <div className="filmCointainer" key={index}>
              <Movie img={data.image} />
              <div className="movieData">
                <MovieText title={data.title} content={data.instructions} />
                <MovieDetails id={data.id} />
                {isAdmin && (
                  <div className="deleteButtonCointainer">
                    <button
                      className="deleteButton"
                      onClick={() => deleteFilm(data.id)}
                    >
                      Usuń{" "}
                    </button>
                  </div>
                )}
                <MarkMovie />
              </div>
            </div>
          );
        })}
      </div>
      <div className="filmsCointainer">
        {workouts?.map((data, index) => {
          return (
            <div className="filmCointainer" key={index}>
              <Movie img={data.image} />
              <div className="movieData">
                <MovieText title={data.name} content={data.description} />
                <MovieDetails id={data.id} />
                {isAdmin && (
                  <div className="deleteButtonCointainer">
                    <button
                      className="deleteButton"
                      onClick={() => deleteWorkout(data.id)}
                    >
                      Usuń{" "}
                    </button>
                  </div>
                )}
                <MarkMovie />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default OpenMovie;
