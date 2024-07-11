import applicationException from "../service/applicationException";
import auth from "../middleware/auth";
import businessContainer from "../business/business.container";

const categoryCardEndpoint = (router) => {
  router.post("/api/categoryCard/create", async (request, response, next) => {
    try {
      const result = await businessContainer
        .getCategoryCardManager(request)
        .createNewOrUpdate(request.body);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.delete(
    "/api/categoryCard/remove/:id",
    auth,
    async (request, response, next) => {
      try {
        let result = await businessContainer
          .getCategoryCardManager(request)
          .remove(request.body.id);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );

  router.get("/api/categoryCard/getAll", async (request, response, next) => {
    try {
      let result = await businessContainer
        .getCategoryCardManager(request)
        .getAll();
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });
};

export default categoryCardEndpoint;
