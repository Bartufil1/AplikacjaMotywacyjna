import applicationException from "../service/applicationException";
import auth from "../middleware/auth";
import businessContainer from "../business/business.container";

/**
 * @swagger
 * components:
 *   schemas:
 *     Exercise:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - duration
 *       properties:
 *         name:
 *           type: string
 *           description: Nazwa ćwiczenia
 *         description:
 *           type: string
 *           description: Opis ćwiczenia
 *         duration:
 *           type: number
 *           description: Czas trwania ćwiczenia w sekundach
 *       example:
 *         name: Pompki
 *         description: Ćwiczenie wzmacniające mięśnie klatki piersiowej.
 *         duration: 60
 */

/**
 * @swagger
 * /api/exercise/create:
 *   post:
 *     summary: Tworzy lub aktualizuje dane ćwiczenia
 *     description: Tworzy nowe dane ćwiczenia lub aktualizuje istniejące dane.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exercise'
 *     responses:
 *       200:
 *         description: Dane ćwiczenia zostały zaktualizowane
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 */

const exerciseEndpoint = (router) => {
  router.post("/api/exercise/create", async (request, response, next) => {
    try {
      const result = await businessContainer
        .getExerciseManager(request)
        .createNewOrUpdate(request.body);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  /**
   * @swagger
   * /api/exercise/remove/{id}:
   *   delete:
   *     summary: Usuwa ćwiczenie o podanym identyfikatorze
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Identyfikator ćwiczenia do usunięcia
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Ćwiczenie zostało usunięte
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Exercise'
   */

  router.delete(
    "/api/exercise/remove/:id",
    //auth,
    async (request, response, next) => {
      try {
        let result = await businessContainer
          .getExerciseManager(request)
          .remove(request.body.id);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );
  /**
   * @swagger
   * /api/exercise/getAll:
   *   get:
   *     summary: Pobiera wszystkie dostępne ćwiczenia
   *     responses:
   *       200:
   *         description: Lista wszystkich ćwiczeń
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Exercise'
   */
  router.get("/api/exercise/getAll", async (request, response, next) => {
    try {
      let result = await businessContainer.getExerciseManager(request).getAll();
      console.log(result);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });
};

export default exerciseEndpoint;
