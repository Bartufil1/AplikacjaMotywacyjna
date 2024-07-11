import recipeDAO from "../DAO/recipeDAO";

const create = (context) => {
  const createNewOrUpdate = async (userData) => {
    const recipe = await recipeDAO.createNewOrUpdate(userData);
    if (recipe) {
      return recipe;
    }
  };

  const getAll = async () => {
    const recipe = await recipeDAO.getAll();
    if (recipe) {
      return recipe;
    }
  };

  const get = async (id) => {
    const recipe = await recipeDAO.get(id);
    if (recipe) {
      return recipe;
    }
  };

  const remove = async (id) => {
    return await recipeDAO.remove(id);
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
