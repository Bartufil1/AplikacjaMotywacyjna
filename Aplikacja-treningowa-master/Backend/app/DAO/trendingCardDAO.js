import mongoose from "mongoose";
import * as _ from "lodash";
import Promise from "bluebird";
import applicationException from "../service/applicationException";
import mongoConverter from "../service/mongoConverter";

const trendingCardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    servings: { type: Number, required: true },
    readyinMinutes: { type: Number, required: true },
    //exercises: [],
    //rating: { type: Number, required: true },
    //minutes: { type: Number, required: true },
    //description: { type: String, required: true },
  },
  {
    collection: "trendingCard",
  }
);

const TrendingCardModel = mongoose.model("trendingCard", trendingCardSchema);

const createNewOrUpdate = (user) => {
  console.log(user);
  return Promise.resolve()
    .then(() => {
      if (!user.id) {
        return new TrendingCardModel(user).save().then((result) => {
          if (result) {
            return mongoConverter(result);
          }
        });
      } else {
        return TrendingCardModel.findByIdAndUpdate(
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
  const result = await TrendingCardModel.findOne({
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
  const result = await TrendingCardModel.findOne({ _id: id });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(
    applicationException.NOT_FOUND,
    "User not found"
  );
};

const getAll = async (id) => {
  const result = await TrendingCardModel.find({});
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(
    applicationException.NOT_FOUND,
    "User not found"
  );
};

const removeById = async (id) => {
  return await TrendingCardModel.findByIdAndRemove(id);
};

export default {
  createNewOrUpdate: createNewOrUpdate,
  getByEmailOrName: getByEmailOrName,
  get: get,
  removeById: removeById,
  getAll,

  model: TrendingCardModel,
};
