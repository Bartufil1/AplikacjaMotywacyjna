import mongoose from "mongoose";
import applicationException from "../service/applicationException";
import mongoConverter from "../service/mongoConverter";

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    token: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.index({ updatedAt: 1 }, { expireAfterSeconds: 600 });

const PasswordReset = mongoose.model("PasswordReset", schema);

const createNewOrUpdate = async (user) => {
  console.log(user);
  return await PasswordReset.updateOne(
    {
      user: user.user,
    },
    { user: user.user, token: user.token },
    { upsert: true }
  );
};

const get = async (id) => {
  const result = await PasswordReset.findOne({ token: id });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(
    applicationException.NOT_FOUND,
    "User not found"
  );
};
const remove = async (id) => {
  return await PasswordReset.findOneAndRemove({
    user: id,
  });
};

export default {
  createNewOrUpdate: createNewOrUpdate,
  model: PasswordReset,
  get,
  remove,
};
