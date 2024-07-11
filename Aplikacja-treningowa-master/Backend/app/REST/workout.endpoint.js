import applicationException from "../service/applicationException";
import auth from "../middleware/auth";
import businessContainer from "../business/business.container";

/**
 * @swagger
 * tags:
 *   name: Workouts
 *   description: API do zarządzania treningami
 *
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - exercises
 *       properties:
 *         title:
 *           type: string
 *           description: Tytuł treningu
 *         description:
 *           type: string
 *           description: Opis treningu
 *         exercises:
 *           type: array
 *           description: Ćwiczenia w treningu
 *           items:
 *             type: string
 *       example:
 *         title: Trening siłowy
 *         description: Trening skupiający się na wzmacnianiu mięśni.
 *         exercises:
 *           - Przysiady
 *           - Wyciskanie sztangi
 */

/**
 * /api/workout/create:
 *   post:
 *     summary: Tworzy lub aktualizuje trening
 *     description: Tworzy nowy trening lub aktualizuje istniejący.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       200:
 *         description: Trening został utworzony lub zaktualizowany
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 */

const workoutEndpoint = (router) => {
  router.post("/api/workout/create", async (request, response, next) => {
    console.log(request.body);
    try {
      const result = await businessContainer
        .getWorkoutManager(request)
        .createNewOrUpdate(request.body);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  /**
   * /api/workout/remove/{id}:
   *   delete:
   *     summary: Usuwa trening
   *     description: Usuwa trening o podanym identyfikatorze.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Identyfikator treningu do usunięcia
   *     responses:
   *       200:
   *         description: Trening został pomyślnie usunięty
   */

  router.delete(
    "/api/workout/remove/:id",
    auth,
    async (request, response, next) => {
      try {
        let result = await businessContainer
          .getWorkoutManager(request)
          .remove(request.params.id);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );

  /**
   * /api/workout/getAll:
   *   get:
   *     summary: Pobiera wszystkie dostępne treningi
   *     description: Pobiera listę wszystkich treningów w systemie.
   *     responses:
   *       200:
   *         description: Lista wszystkich treningów
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Workout'
   */

  router.get("/api/workout/getAll", auth, async (request, response, next) => {
    try {
      let result = await businessContainer.getWorkoutManager(request).getAll();
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  /**
   * /api/workout/getAllRandom:
   *   get:
   *     summary: Pobiera losowe treningi dla użytkownika
   *     description: Pobiera losowe treningi dla zalogowanego użytkownika.
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista losowych treningów
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Workout'
   */

  router.get(
    "/api/workout/getAllRandom",
    auth,
    async (request, response, next) => {
      try {
        let result = await businessContainer
          .getWorkoutManager(request)
          .getAllRandom(request.user.userId);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );

  /**
   * /api/workout/get/{id}:
   *   get:
   *     summary: Pobiera szczegóły treningu
   *     description: Pobiera szczegóły treningu o podanym identyfikatorze.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Identyfikator treningu do pobrania
   *     responses:
   *       200:
   *         description: Szczegóły treningu
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Workout'
   */

  router.get("/api/workout/get/:id", async (request, response, next) => {
    try {
      console.log("work");
      let result = await businessContainer
        .getWorkoutManager(request)
        .get(request.params.id);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });
};

export default workoutEndpoint;
