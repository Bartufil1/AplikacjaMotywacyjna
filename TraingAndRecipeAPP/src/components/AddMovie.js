import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [readyinMinutes, setReadyinMinutes] = useState("");
  const [servings, setServings] = useState("");
  const [aggregateLikes, setAggregateLikes] = useState("");
  const [healthScore, setHealthScore] = useState("");
  const [instructions, setInstructions] = useState("");
  const [dishTypes, setDishTypes] = useState("");
  const [extendedIngredients, setExtendedIngredients] = useState([
    {
      name: "",
      image: "",
    },
  ]);
  const addField = (event) => {
    event.preventDefault();
    const newField = {
      name: "",
      image: "",
    };
    setExtendedIngredients([...extendedIngredients, newField]);
  };
  const deleteField = (searchIndex, event) => {
    event.preventDefault();
    const newIngredients = extendedIngredients.filter(
      (item, index) => index !== searchIndex
    );
    setExtendedIngredients(newIngredients);
  };

  const handleIngredientsChange = (index, event) => {
    let data = [...extendedIngredients];
    data[index][event.target.name] = event.target.value;
    console.log(data);
    setExtendedIngredients(data);
  };
  const nav = useNavigate();
  const sendData = (event) => {
    event.preventDefault();
    const data = {
      title,
      image,
      readyinMinutes,
      servings,
      aggregateLikes,
      healthScore,
      instructions,
      dishTypes,
      extendedIngredients,
    };
    console.log(data);
    axios({
      method: "post",
      url: "http://localhost:3000/api/recipe/create",
      data: data,
    })
      .then((response) => nav("/panel"))
      .catch((error) => console.log(error));
    console.log(data);
  };
  return (
    <div className="registerForm">
      <form onSubmit={sendData}>
        <h3> Przepisy </h3>
        <div className="mb-3">
          <label>Nazwa</label>
          <input
            type="text"
            className="form-control"
            placeholder="Wpisz nazwe "
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Obraz</label>
          <input
            type="text"
            className="form-control"
            placeholder="Podaj adres URL"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Sposób przygotowania</label>
          <input
            type="text"
            className="form-control"
            placeholder="Wpisz"
            value={instructions}
            onChange={(event) => setInstructions(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Czas przygotowania</label>
          <input
            type="text"
            className="form-control"
            placeholder="Wpisz"
            value={readyinMinutes}
            onChange={(event) => setReadyinMinutes(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Ilość porcji</label>
          <input
            type="text"
            className="form-control"
            placeholder="Wpisz"
            value={servings}
            onChange={(event) => setServings(event.target.value)}
          />
          <div className="mb-3">
            <label>Ilość polubień</label>
            <input
              type="text"
              className="form-control"
              placeholder="Wpisz"
              value={aggregateLikes}
              onChange={(event) => setAggregateLikes(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Punkty zdrowia</label>
            <input
              type="text"
              className="form-control"
              placeholder="Wpisz"
              value={healthScore}
              onChange={(event) => setHealthScore(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Rodzaj dania</label>
            <input
              type="text"
              className="form-control"
              placeholder="Wpisz"
              value={dishTypes}
              onChange={(event) => setDishTypes(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Składniki</label>
            {extendedIngredients.map((item, index) => {
              return (
                <div key={index}>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Dodaj nazwe skladnika"
                    value={item.name}
                    onChange={(event) => handleIngredientsChange(index, event)}
                  />
                  <input
                    name="image"
                    type="text"
                    className="form-control"
                    placeholder="Dodaj zdjecie skladnika"
                    value={item.image}
                    onChange={(event) => handleIngredientsChange(index, event)}
                  />
                  <button
                    type="buton"
                    onClick={(event) => deleteField(index, event)}
                  >
                    Usun pole
                  </button>
                </div>
              );
            })}
            <button type="buton" onClick={(event) => addField(event)}>
              Dodaj pole
            </button>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            {" "}
            Dodaj
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddMovie;
