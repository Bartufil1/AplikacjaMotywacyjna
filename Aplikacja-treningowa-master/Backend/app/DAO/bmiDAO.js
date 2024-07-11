import mongoose from "mongoose";
import * as _ from "lodash";
import Promise from "bluebird";
import applicationException from "../service/applicationException";
import mongoConverter from "../service/mongoConverter";
import uniqueValidator from "mongoose-unique-validator";

const bmiSchema = new mongoose.Schema(
  {
    weight: { type: String, required: true },
    height: { type: String, required: true },
    sex: { type: String, required: true },
    activityMode: { type: String, required: true },
    bmi: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
  },
  {
    collection: "bmi",
  }
);

const BmiModel = mongoose.model("bmi", bmiSchema);
const getByUserId = async (id) => {
  const result = await BmiModel.findOne({
    userId: id,
  });
  console.log(result);
  if (result) {
    return result;
  }
};
const createNewOrUpdate = (user) => {
  console.log(user);
  return Promise.resolve()
    .then(() => {
      if (!user.id) {
        return new BmiModel(user).save().then((result) => {
          if (result) {
            return mongoConverter(result);
          }
        });
      } else {
        return BmiModel.findByIdAndUpdate(user.id, _.omit(user, "id"), {
          new: true,
        });
      }
    })
    .catch((error) => {
      console.log(error);
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
  const result = await BmiModel.findOne({
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
  const result = await BmiModel.findOne({ _id: id });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(
    applicationException.NOT_FOUND,
    "User not found"
  );
};

const getAll = async (id) => {
  const result = await RecipeModel.find({});
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(
    applicationException.NOT_FOUND,
    "User not found"
  );
};

const getByIds = async (ids) => {
  const result = await RecipeModel.find({ _id: { $in: ids } });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(
    applicationException.NOT_FOUND,
    "User not found"
  );
};

const removeById = async (id) => {
  return await RecipeModel.findByIdAndRemove(id);
};

export default {
  createNewOrUpdate: createNewOrUpdate,
  getByEmailOrName: getByEmailOrName,
  get: get,
  remove: removeById,
  getAll,
  getByIds,
  getByUserId,

  model: BmiModel,
};
