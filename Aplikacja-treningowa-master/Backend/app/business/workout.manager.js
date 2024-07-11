import bmiDAO from "../DAO/bmiDAO";
import exerciseDAO from "../DAO/exerciseDAO";
import workoutDAO from "../DAO/workoutDAO";
import _, { slice } from "lodash";

const create = (context) => {
  const createNewOrUpdate = async (userData) => {
    const workout = await workoutDAO.createNewOrUpdate(userData);
    if (workout) {
      return workout;
    }
  };

  const getAll = async () => {
    const workout = await workoutDAO.getAll();
    if (workout) {
      console.log(workout);
      const newData = await Promise.all(
        workout.map(async (w) => {
          let obj = w;
          obj.exercises = await exerciseDAO.getByIds(w.exercises);
          return obj;
        })
      );
      console.log(newData);
      const d2 = newData.map((d) => {});
      return newData;
    }
  };

  const getAllRandom = async (id) => {
    console.log(id);
    const bmi = await bmiDAO.getByUserId(id);
    console.log("bmi", bmi);
    const workout = await workoutDAO.getAll();

    if (workout) {
      const numbers = workout.map((w, index) => index);
      const shuffle = _.shuffle(numbers).slice(0, 3);
      const randomWorkouts = workout.filter((w, index) => {
        if (shuffle.includes(index)) {
          if (bmi.activityMode === "Sedentary" && w.calories > 50) {
            return true;
          } else if (bmi.activityMode !== "Sedentary" && w.calories < 300) {
            return true;
          }
          return false;
        }
      });
      const newData = await Promise.all(
        randomWorkouts.map(async (w) => {
          let obj = w;
          obj.exercises = await exerciseDAO.getByIds(w.exercises);
          return obj;
        })
      );
      console.log("test", newData);
      const d2 = newData.map((d) => {});
      return newData;
    }
  };

  const get = async (id) => {
    const workout = await workoutDAO.get(id);
    if (workout) {
      const exercises = await exerciseDAO.getByIds(workout.exercises);
      const data = workout;
      data.exercises = exercises;
      return data;
    }
  };

  const remove = async (id) => {
    return await workoutDAO.remove(id);
  };

  return {
    createNewOrUpdate: createNewOrUpdate,
    remove: remove,
    getAll,
    get,
    getAllRandom,
  };
};

export default {
  create: create,
};
