import exerciseDAO from "../DAO/exerciseDAO";

const create = (context) => {
  const createNewOrUpdate = async (userData) => {
    const exercise = await exerciseDAO.createNewOrUpdate(userData);
    if (exercise) {
      return exercise;
    }
  };

  const getAll = async () => {
    const exercise = await exerciseDAO.getAll();
    if (exercise) {
      return exercise;
    }
  };

  const remove = async (id) => {
    return await exerciseDAO.removeById(id);
  };

  return {
    createNewOrUpdate: createNewOrUpdate,
    remove: remove,
    getAll,
  };
};

export default {
  create: create,
};
