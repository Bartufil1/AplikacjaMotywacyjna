import passwordResetDAO from "../DAO/passwordResetDAO";
import userDAO from "../DAO/userDAO";
import { v4 as uuidv4 } from "uuid";
import { sendMail } from "../service/mail";
import passwordDAO from "../DAO/passwordDAO";
import businessContainer from "./business.container";

const create = (context) => {
  const createNewOrUpdate = async (userData) => {
    console.log(userData);
    const user = await userDAO.getByEmailOrName(userData);
    if (!user) {
      return;
    }
    const token = uuidv4().toString().replace(/-/g, "");
    console.log(user);
    const preparedData = {
      user: user.id,
      token: token,
    };
    const categoryCard = await passwordResetDAO.createNewOrUpdate(preparedData);
    if (categoryCard) {
      await sendMail(userData, token);
      return categoryCard;
    }
  };
  const changepassword = async (token, newPassword) => {
    const userToken = await passwordResetDAO.get(token);
    if (!userToken) {
      console.log(work);
      return;
    }
    const password = businessContainer.getUserManager().hashString(newPassword);
    console.log(userToken);
    const preparedData = {
      userId: userToken.user,
      password: password,
    };
    console.log(preparedData);
    const p = passwordDAO.createOrUpdate(preparedData);
    const t = remove(userToken.id);
    return p;
  };

  const remove = async (id) => {
    return await passwordResetDAO.remove(id);
  };

  return {
    createNewOrUpdate: createNewOrUpdate,
    remove: remove,
    changepassword,
  };
};

export default {
  create: create,
};
