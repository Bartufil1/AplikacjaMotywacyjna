import mongoose from "mongoose";
import * as _ from "lodash";
import Promise from "bluebird";
import applicationException from "../service/applicationException";
import mongoConverter from "../service/mongoConverter";
import uniqueValidator from "mongoose-unique-validator";

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    time: { type: String, required: true },
    set: { type: Number, required: true },
    image: { type: String },
    sex: { type: String, required: true, default: "Man" },
  },
  {
    collection: "exercise",
  }
);

const ExerciseModel = mongoose.model("exercise", exerciseSchema);

const createNewOrUpdate = (user) => {
  return Promise.resolve()
    .then(() => {
      if (!user.id) {
        return new ExerciseModel(user).save().then((result) => {
          if (result) {
            return mongoConverter(result);
          }
        });
      } else {
        return ExerciseModel.findByIdAndUpdate(user.id, _.omit(user, "id"), {
          new: true,
        });
      }
    })
    .catch((error) => {
      if ("ValidationError" === error.name) {
        error = error.errors[Object.keys(error.errors)[0]];
        throw applicationException.new(
          applicationException.BAD_REQUEST,
          error.message
        );
      }
      throw error;
    });
};

const getByEmailOrName = async (name) => {
  const result = await ExerciseModel.findOne({
    $or: [{ email: name }, { name: name }],
  });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(
    applicationException.NOT_FOUND,
    "User not found"
  );
};

const get = async (id) => {
  const result = await ExerciseModel.findOne({ _id: id });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(
    applicationException.NOT_FOUND,
    "User not found"
  );
};

const getAll = async (id) => {
  const result = await ExerciseModel.find({});
  if (result) {
    console.log(result);
    return mongoConverter(result);
  }
  throw applicationException.new(
    applicationException.NOT_FOUND,
    "User not found"
  );
};

const getByIds = async (ids) => {
  const result = await ExerciseModel.find({ _id: { $in: ids } });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(
    applicationException.NOT_FOUND,
    "User not found"
  );
};

const removeById = async (id) => {
  return await ExerciseModel.findByIdAndRemove(id);
};

export default {
  createNewOrUpdate: createNewOrUpdate,
  getByEmailOrName: getByEmailOrName,
  get: get,
  removeById: removeById,
  getAll,
  getByIds,

  model: ExerciseModel,
};
