import applicationException from "../service/applicationException";
import auth from "../middleware/auth";
import businessContainer from "../business/business.container";

/**
 * @swagger
 * /api/bmi/create:
 *   post:
 *     summary: Tworzy lub aktualizuje dane BMI
 *     description: Tworzy nowe dane BMI dla użytkownika lub aktualizuje istniejące dane.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - weight
 *               - height
 *               - sex
 *               - activityMode
 *               - bmi
 *               - userId
 *             properties:
 *               weight:
 *                 type: string
 *                 description: Waga
 *               height:
 *                 type: string
 *                 description: Wzrost
 *               sex:
 *                 type: string
 *                 description: Płeć
 *               activityMode:
 *                 type: string
 *                 description: Poziom aktywności
 *               bmi:
 *                 type: string
 *                 description: Współczynnik BMI
 *               userId:
 *                 type: string
 *                 description: Identyfikator użytkownika
 *     responses:
 *       200:
 *         description: Dane BMI zostały zaktualizowane
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bmi'
 */

const bmiEndpoint = (router) => {
  router.post("/api/bmi/create", async (request, response, next) => {
    try {
      const result = await businessContainer
        .getBmiManager(request)
        .createNewOrUpdate(request.body);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  /**
   * @swagger
   * /api/bmi/remove/{id}:
   *   delete:
   *     summary: Usuwa dane BMI
   *     description: Usuwa dane BMI dla użytkownika o podanym identyfikatorze.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Identyfikator danych BMI do usunięcia
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Dane BMI zostały usunięte
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Bmi'
   */

  router.delete(
    "/api/bmi/remove/:id",
    auth,
    async (request, response, next) => {
      console.log(request.body.id);
      try {
        let result = await businessContainer
          .getBmiManager(request)
          .remove(request.params.id);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );

  /**
   * @swagger
   * /api/bmi/getAll:
   *   get:
   *     summary: Pobiera wszystkie dane BMI
   *     description: Pobiera listę wszystkich danych BMI dostępnych w systemie.
   *     responses:
   *       200:
   *         description: Lista danych BMI
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Bmi'
   */

  router.get("/api/bmi/getAll", async (request, response, next) => {
    try {
      let result = await businessContainer.getBmiManager(request).getAll();
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  /**
   * @swagger
   * /api/bmi/get/{id}:
   *   get:
   *     summary: Pobiera dane BMI dla konkretnego użytkownika
   *     description: Pobiera dane BMI dla użytkownika o podanym identyfikatorze.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Identyfikator użytkownika
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Dane BMI dla użytkownika
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Bmi'
   */

  router.get("/api/bmi/get/:id", auth, async (request, response, next) => {
    try {
      let result = await businessContainer
        .getBmiManager(request)
        .get(request.params.id);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });
};

export default bmiEndpoint;
