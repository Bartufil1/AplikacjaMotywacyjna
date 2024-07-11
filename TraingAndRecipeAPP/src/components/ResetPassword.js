import React, { Component, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const { token } = useParams();
  const sendData = (event) => {
    event.preventDefault();
    const data = {
      token: token,
      password,
    };
    axios({
      method: "post",
      url: "http://localhost:3000/api/password/confirm",
      data: data,
    })
      .then((response) => {
        nav("/");
        window.location.reload();
      })
      .catch((error) => console.log(error));
    console.log(data);
  };
  return (
    <div className="loginForm">
      <form onSubmit={sendData}>
        <h3>Resetowanie Hasła</h3>
        <div className="mb-3">
          <label>Hasło</label>
          <input
            type="password"
            className="form-control"
            placeholder="Wpisz hasło"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            {" "}
            Zresetuj
          </button>
        </div>
      </form>
    </div>
  );
};
export default ResetPassword;
