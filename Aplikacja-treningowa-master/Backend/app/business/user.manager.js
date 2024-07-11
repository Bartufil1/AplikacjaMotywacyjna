import PasswordDAO from "../DAO/passwordDAO";
import TokenDAO from "../DAO/tokenDAO";
import UserDAO from "../DAO/userDAO";
import applicationException from "../service/applicationException";
import sha1 from "sha1";

const create = (context) => {
  function hashString(password) {
    return sha1(password);
  }

  const authenticate = async (name, password) => {
    let userData;
    const user = await UserDAO.getByEmailOrName(name);
    console.log(user);
    if (!user) {
      throw applicationException.new(
        applicationException.UNAUTHORIZED,
        "User with that email does not exist"
      );
    }
    userData = await user;
    await PasswordDAO.authorize(user.id, hashString(password));
    const token = await TokenDAO.create(userData);
    return getToken(token);
  };

  const getToken = (token) => {
    return { token: token.value };
  };

  const createNewOrUpdate = async (userData) => {
    const user = await UserDAO.createNewOrUpdate(userData);
    console.log(user);
    if (await userData.password) {
      return await PasswordDAO.createOrUpdate({
        userId: user.id,
        password: hashString(userData.password),
      });
    } else {
      return user;
    }
  };

  const removeHashSession = async (userId) => {
    return await TokenDAO.remove(userId);
  };

  return {
    authenticate: authenticate,
    createNewOrUpdate: createNewOrUpdate,
    removeHashSession: removeHashSession,
    hashString,
  };
};

export default {
  create: create,
};
