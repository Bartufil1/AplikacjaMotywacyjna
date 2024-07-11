import React, { Component } from "react";

import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import axios from "axios";
const Navbar = () => {
  const nav = useNavigate();
  const isNotLog = isExpired(localStorage.getItem("token"));
  const logOut = () => {
    const decodedToken = decodeToken(localStorage.getItem("token"));
    axios
      .delete(`https://at.usermd.net/api/user/logout/${decodedToken.userId}`, {
        data: { userId: decodedToken.userId },
      })
      .then((response) => nav("/"));
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="header">
      <div className="searchDiv">
        <nav>
          <div className="logoCointainer">
            <img src="images/run3.png" className="poster1"></img>
            <Link to="/" style={{ textDecoration: "none", color: "orange" }}>
              <li className="logoLink">LiveStyleWeb</li>
            </Link>
          </div>
        </nav>
        <Search />
        {!isNotLog && (
          <>
            <Link to="/add">
              <button type="button" className="btn addMovie">
                Dodaj Przepis
              </button>
            </Link>
            <Link to="/addWorkout">
              <button type="button" className="btn addMovie">
                Dodaj Trening
              </button>
            </Link>
          </>
        )}
      </div>
      <div className="logRegButton">
        {isNotLog && (
          <Link to="/signin">
            <button type="button" className="btn login">
              Logowanie
            </button>
          </Link>
        )}
        {!isNotLog && (
          <button onClick={logOut} type="button" className="btn register">
            Wyloguj
          </button>
        )}
      </div>
    </div>
  );
};
export default Navbar;
