import mongoose from "mongoose";
import * as _ from "lodash";
import Promise from "bluebird";
import applicationException from "../service/applicationException";
import mongoConverter from "../service/mongoConverter";

const categoryCardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    dishTypes: { type: String, required: true },
    servings: { type: Number, required: true },
    readyinMinutes: { type: Number, required: true },

    //exercises: [],
    //rating: { type: Number, required: true },
    //minutes: { type: Number, required: true },
    //description: { type: String, required: true },
  },
  {
    collection: "categoryCard",
  }
);

const CategoryCardModel = mongoose.model("categoryCard", categoryCardSchema);

const createNewOrUpdate = (user) => {
  console.log(user);
  return Promise.resolve()
    .then(() => {
      if (!user.id) {
        return new CategoryCardModel(user).save().then((result) => {
          if (result) {
            return mongoConverter(result);
          }
        });
      } else {
        return CategoryCardModel.findByIdAndUpdate(
          user.id,
          _.omit(user, "id"),
          {
            new: true,
          }
        );
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
  const result = await CategoryCardModel.findOne({
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
  console.log(id);
  const result = await CategoryCardModel.findOne({ _id: id });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(
    applicationException.NOT_FOUND,
    "User not found"
  );
};

const getAll = async (id) => {
  const result = await CategoryCardModel.find({});
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(
    applicationException.NOT_FOUND,
    "User not found"
  );
};

const removeById = async (id) => {
  return await CategoryCardModel.findByIdAndRemove(id);
};

export default {
  createNewOrUpdate: createNewOrUpdate,
  getByEmailOrName: getByEmailOrName,
  get: get,
  removeById: removeById,
  getAll,

  model: CategoryCardModel,
};
