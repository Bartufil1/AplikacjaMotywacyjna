import applicationException from "../service/applicationException";
import auth from "../middleware/auth";
import businessContainer from "../business/business.container";

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: API do zarządzania przepisami kulinarnymi
 *
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       required:
 *         - title
 *         - ingredients
 *         - instructions
 *       properties:
 *         title:
 *           type: string
 *           description: Tytuł przepisu
 *         ingredients:
 *           type: array
 *           description: Składniki przepisu
 *           items:
 *             type: string
 *         instructions:
 *           type: string
 *           description: Instrukcje przygotowania przepisu
 *       example:
 *         title: Spaghetti Bolognese
 *         ingredients:
 *           - 400g mięsa mielonego
 *           - 1 cebula, posiekana
 *           - 2 ząbki czosnku, posiekane
 *         instructions:
 *           - "Rozgrzej oliwę w garnku."
 *           - "Podsmaż cebulę i czosnek."
 *           - "Dodaj mięso mielone i smaż, aż będzie dobrze podsmażone."
 *           - "Dodaj sos pomidorowy i gotuj na małym ogniu."
 */

/**
 * @swagger
 * /api/recipe/create:
 *   post:
 *     summary: Tworzy lub aktualizuje przepis kulinarny
 *     description: Tworzy nowy przepis kulinarny lub aktualizuje istniejący.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       200:
 *         description: Przepis kulinarny został utworzony lub zaktualizowany
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 */

const recipeEndpoint = (router) => {
  router.post("/api/recipe/create", async (request, response, next) => {
    try {
      const result = await businessContainer
        .getRecipeManager(request)
        .createNewOrUpdate(request.body);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  /**
   * @swagger
   * /api/recipe/remove/{id}:
   *   delete:
   *     summary: Usuwa przepis kulinarny
   *     description: Usuwa przepis kulinarny o podanym identyfikatorze.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Identyfikator przepisu kulinarnego do usunięcia
   *     responses:
   *       200:
   *         description: Przepis kulinarny został pomyślnie usunięty
   */

  router.delete(
    "/api/recipe/remove/:id",
    //auth,
    async (request, response, next) => {
      console.log(request.body.id);
      try {
        let result = await businessContainer
          .getRecipeManager(request)
          .remove(request.params.id);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * /api/recipe/getAll:
   *   get:
   *     summary: Pobiera wszystkie dostępne przepisy kulinarne
   *     description: Pobiera listę wszystkich przepisów kulinarnych w systemie.
   *     responses:
   *       200:
   *         description: Lista wszystkich przepisów kulinarnych
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Recipe'
   */

  router.get("/api/recipe/getAll", async (request, response, next) => {
    try {
      let result = await businessContainer.getRecipeManager(request).getAll();
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  /**
   * @swagger
   * /api/recipe/get/{id}:
   *   get:
   *     summary: Pobiera szczegóły przepisu kulinarnego
   *     description: Pobiera szczegóły przepisu kulinarnego o podanym identyfikatorze.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Identyfikator przepisu kulinarnego do pobrania
   *     responses:
   *       200:
   *         description: Szczegóły przepisu kulinarnego
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Recipe'
   */

  router.get(
    "/api/recipe/get/:id",
    //auth,
    async (request, response, next) => {
      try {
        let result = await businessContainer
          .getRecipeManager(request)
          .get(request.params.id);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );
};

export default recipeEndpoint;
