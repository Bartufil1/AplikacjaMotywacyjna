import mongoose from "mongoose";
import * as _ from "lodash";
import Promise from "bluebird";
import applicationException from "../service/applicationException";
import mongoConverter from "../service/mongoConverter";
import uniqueValidator from "mongoose-unique-validator";

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    readyinMinutes: { type: Number, required: true },
    servings: { type: Number, required: true },
    aggregateLikes: { type: Number, required: true },
    healthScore: { type: Number, required: true },
    instructions: { type: String, required: true },
    dishTypes: { type: String, required: true },
    extendedIngredients: [],
    image: { type: String, required: false },
  },
  {
    collection: "recipe",
  }
);

const RecipeModel = mongoose.model("recipe", recipeSchema);

const createNewOrUpdate = (user) => {
  console.log(user);
  return Promise.resolve()
    .then(() => {
      if (!user.id) {
        return new RecipeModel(user).save().then((result) => {
          if (result) {
            return mongoConverter(result);
          }
        });
      } else {
        return RecipeModel.findByIdAndUpdate(user.id, _.omit(user, "id"), {
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
  const result = await RecipeModel.findOne({
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
  const result = await RecipeModel.findOne({ _id: id });
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

  model: RecipeModel,
};
