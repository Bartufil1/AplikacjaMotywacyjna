import categoryCardDAO from "../DAO/categoryCardDAO";
const create = (context) => {
  const createNewOrUpdate = async (userData) => {
    const categoryCard = await categoryCardDAO.createNewOrUpdate(userData);
    if (categoryCard) {
      return categoryCard;
    }
  };

  const getAll = async () => {
    const categoryCard = await categoryCardDAO.getAll();
    if (categoryCard) {
      return categoryCard;
    }
  };

  const remove = async (id) => {
    return await categoryCardDAO.remove(id);
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
