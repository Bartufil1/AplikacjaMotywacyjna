import businessContainer from "../business/business.container";
import applicationException from "../service/applicationException";
import auth from "../middleware/auth";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - username
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: email użytkownika
 *         username:
 *           type: string
 *           description: Nazwa użytkownika
 *         password:
 *           type: string
 *           description: hasło użytkownika
 *       example:
 *         email: jan@gmail.com
 *         username: Jan Kowalski
 *         password: test123
 */
const userEndpoint = (router) => {
  /**
   * @swagger
   * /api/user/auth:
   *   post:
   *     summary: Autentykacja użytkownika
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - username
   *               - password
   *             properties:
   *               username:
   *                 type: string
   *                 description: Nazwa użytkownika
   *               password:
   *                 type: string
   *                 description: Hasło użytkownika
   *     responses:
   *       200:
   *         description: Autentykacja udana
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 userId:
   *                   type: string
   *                   description: Identyfikator użytkownika
   *                 token:
   *                   type: string
   *                   description: Token autentykacyjny
   *       401:
   *         description: Błąd autentykacji
   */
  router.post("/api/user/auth", async (request, response, next) => {
    try {
      console.log(request.body);
      let result = await businessContainer
        .getUserManager(request)
        .authenticate(request.body.username, request.body.password);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });
  /**
   * @swagger
   * /api/user/create:
   *   post:
   *     summary: Tworzy nowego użytkownika
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *         description: Dane utworzonego użytkownika
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */

  router.post("/api/user/create", async (request, response, next) => {
    console.log(request.body);
    try {
      const result = await businessContainer
        .getUserManager(request)
        .createNewOrUpdate(request.body);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  /**
   * @swagger
   * /api/user/logout/{userId}:
   *   delete:
   *     summary: Wylogowuje użytkownika
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         description: Identyfikator użytkownika do wylogowania
   *         schema:
   *           type: string
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Potwierdzenie wylogowania
   */

  router.delete(
    "/api/user/logout/:userId",
    auth,
    async (request, response, next) => {
      try {
        let result = await businessContainer
          .getUserManager(request)
          .removeHashSession(request.body.userId);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );
};

export default userEndpoint;
