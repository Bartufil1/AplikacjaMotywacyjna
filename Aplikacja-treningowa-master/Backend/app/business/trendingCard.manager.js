import trendingCardDAO from "../DAO/trendingCardDAO";

const create = (context) => {
  const createNewOrUpdate = async (userData) => {
    const trendingCard = await trendingCardDAO.createNewOrUpdate(userData);
    if (trendingCard) {
      return trendingCard;
    }
  };

  const getAll = async () => {
    const trendingCard = await trendingCardDAO.getAll();
    if (trendingCard) {
      return trendingCard;
    }
  };

  const remove = async (id) => {
    return await trendingCardDAO.remove(id);
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
