import bmiDAO from "../DAO/bmiDAO";

const create = (context) => {
  const createNewOrUpdate = async (userData) => {
    const bmi = await bmiDAO.createNewOrUpdate(userData);
    if (bmi) {
      return bmi;
    }
  };

  const getAll = async () => {
    const bmi = await bmiDAO.getAll();
    if (bmi) {
      return recipe;
    }
  };

  const get = async (id) => {
    const bmi = await bmiDAO.get(id);
    if (bmi) {
      return bmi;
    }
  };

  const remove = async (id) => {
    return await bmiDAO.remove(id);
  };

  return {
    createNewOrUpdate: createNewOrUpdate,
    remove: remove,
    getAll,
    get,
  };
};

export default {
  create: create,
};
