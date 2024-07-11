import mongoose from "mongoose";
import * as _ from "lodash";
import Promise from "bluebird";
import applicationException from "../service/applicationException";
import mongoConverter from "../service/mongoConverter";
import uniqueValidator from "mongoose-unique-validator";

const userRole = {
  admin: "admin",
  user: "user",
};

const userRoles = [userRole.admin, userRole.user];

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: userRoles,
      default: userRole.user,
      required: false,
    },
    active: { type: Boolean, default: true, required: false },
    isAdmin: { type: Boolean, default: true, required: false },
  },
  {
    collection: "user",
  }
);

userSchema.plugin(uniqueValidator);

const UserModel = mongoose.model("user", userSchema);

const createNewOrUpdate = (user) => {
  return Promise.resolve()
    .then(() => {
      if (!user.id) {
        return new UserModel(user).save().then((result) => {
          if (result) {
            return mongoConverter(result);
          }
        });
      } else {
        return UserModel.findByIdAndUpdate(user.id, _.omit(user, "id"), {
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
  console.log(name);
  const result = await UserModel.findOne({
    $or: [{ email: name }, { username: name }],
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
  const result = await UserModel.findOne({ _id: id });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(
    applicationException.NOT_FOUND,
    "User not found"
  );
};

const removeById = async (id) => {
  return await UserModel.findByIdAndRemove(id);
};

export default {
  createNewOrUpdate: createNewOrUpdate,
  getByEmailOrName: getByEmailOrName,
  get: get,
  removeById: removeById,

  userRole: userRole,
  model: UserModel,
};
