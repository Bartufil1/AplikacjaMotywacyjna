import applicationException from "../service/applicationException";
import auth from "../middleware/auth";
import businessContainer from "../business/business.container";

const trendingCardEndpoint = (router) => {
  router.post("/api/trendingCard/create", async (request, response, next) => {
    try {
      const result = await businessContainer
        .getTrendingCardManager(request)
        .createNewOrUpdate(request.body);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.delete(
    "/api/trendingCard/remove/:id",
    auth,
    async (request, response, next) => {
      try {
        let result = await businessContainer
          .getTrendingCardManager(request)
          .remove(request.body.id);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );

  router.get("/api/trendingCard/getAll", async (request, response, next) => {
    try {
      let result = await businessContainer
        .getTrendingCardManager(request)
        .getAll();
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });
};

export default trendingCardEndpoint;
