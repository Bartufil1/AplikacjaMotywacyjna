import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddWorkout = () => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [set, setSet] = useState("");
  const [image, setImage] = useState("");
  const [sex, setSex] = useState("");

  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState([{ id: "" }]);
  const [rating, setRating] = useState("");
  const [minutes, setMinutes] = useState("");
  const [calories, setCalories] = useState("");
  const [description, setDescription] = useState("");
  const [workoutImage, setWorkoutImage] = useState("");
  const addField = (event) => {
    event.preventDefault();
    const newField = {
      id: allExercises[0].id,
    };
    setExercises([...exercises, newField]);
  };
  const deleteField = (searchIndex, event) => {
    event.preventDefault();
    const newIngredients = exercises.filter(
      (item, index) => index !== searchIndex
    );
    setExercises(newIngredients);
  };

  const handleIngredientsChange = (index, event) => {
    let data = [...exercises];
    data[index][event.target.name] = event.target.value;
    console.log(data);
    setExercises(data);
  };
  const [allExercises, setAllExercises] = useState([]);
  const getExercises = () => {
    axios({
      method: "get",
      url: "http://localhost:3000/api/exercise/getAll",
    })
      .then((response) => {
        console.log(response);
        setAllExercises(response.data);
      })
      .catch((error) => console.log(error));
    //console.log(data);
  };

  useEffect(() => {
    getExercises();
    console.log(allExercises);
  }, []);

  const nav = useNavigate();
  const sendData = (event) => {
    event.preventDefault();
    const data = {
      name: workoutName,
      exercises: exercises.map((item) => item.id),
      rating,
      minutes,
      calories,
      description,
      image: workoutImage,
    };
    console.log(data);
    axios({
      method: "post",
      url: "http://localhost:3000/api/workout/create",
      data: data,
    })
      .then((response) => nav("/panel"))
      .catch((error) => console.log(error));
    console.log(data);
  };

  const sendDataExercises = (event) => {
    event.preventDefault();
    const data = {
      name,
      time,
      set,
      image,
      sex,
    };
    console.log(data);
    axios({
      method: "post",
      url: "http://localhost:3000/api/exercise/create",
      data: data,
    })
      .then((response) => nav("/panel"))
      .catch((error) => console.log(error));
    console.log(data);
  };

  return (
    <div>
      <div className="registerForm">
        <form onSubmit={sendData}>
          <h3> Trening </h3>
          <div className="mb-3">
            <label>Nazwa</label>
            <input
              type="text"
              className="form-control"
              placeholder="Wpisz nazwe "
              value={workoutName}
              onChange={(event) => setWorkoutName(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Obraz</label>
            <input
              type="text"
              className="form-control"
              placeholder="Podaj adres URL"
              value={workoutImage}
              onChange={(event) => setWorkoutImage(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Ocena</label>
            <input
              type="text"
              className="form-control"
              placeholder="Wpisz Opis"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Czas</label>
            <input
              type="text"
              className="form-control"
              placeholder="Wpisz Opis"
              value={minutes}
              onChange={(event) => setMinutes(event.target.value)}
            />
            <div className="mb-3">
              <label>Kalorie</label>
              <input
                type="text"
                className="form-control"
                placeholder="Wpisz Opis"
                value={calories}
                onChange={(event) => setCalories(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Opis</label>
              <input
                type="text"
                className="form-control"
                placeholder="Wpisz Opis"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Wybierz ćwiczenie</label>
              {exercises.map((item, index) => {
                return (
                  <div key={index}>
                    <select
                      name="id"
                      className="form-control"
                      placeholder="dodaj zdjecie skladnika"
                      onChange={(event) =>
                        handleIngredientsChange(index, event)
                      }
                    >
                      <option>Wybierz ćwiczenie</option>
                      {allExercises?.map((item, index) => (
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>

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

      <div className="registerForm">
        <form onSubmit={sendDataExercises}>
          <h3> Ćwiczenie </h3>
          <div className="mb-3">
            <label>Nazwa</label>
            <input
              type="text"
              className="form-control"
              placeholder="Wpisz nazwe "
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Obrazek</label>
            <input
              type="text"
              className="form-control"
              placeholder="Podaj adres URL"
              value={image}
              onChange={(event) => setImage(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Czas</label>
            <input
              type="text"
              className="form-control"
              placeholder="Wpisz Opis"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Serie</label>
            <input
              type="text"
              className="form-control"
              placeholder="Wpisz Opis"
              value={set}
              onChange={(event) => setSet(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Płeć</label>
            <input
              type="text"
              className="form-control"
              placeholder="Wpisz Opis"
              value={sex}
              onChange={(event) => setSex(event.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              {" "}
              Dodaj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddWorkout;
