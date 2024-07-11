import applicationException from "../service/applicationException";
import auth from "../middleware/auth";
import businessContainer from "../business/business.container";

/**
 * @swagger
 * components:
 *   schemas:
 *     PasswordResetRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: Adres e-mail użytkownika
 *       example:
 *         email: jan@example.com
 *
 *     PasswordResetConfirmation:
 *       type: object
 *       required:
 *         - token
 *         - password
 *       properties:
 *         token:
 *           type: string
 *           description: Token resetu hasła
 *         password:
 *           type: string
 *           description: Nowe hasło użytkownika
 *       example:
 *         token: testToken
 *         password: newTestPassword
 */

/**
 * @swagger
 * /api/password/reset:
 *   post:
 *     summary: Wysyła prośbę o zresetowanie hasła
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PasswordResetRequest'
 *     responses:
 *       200:
 *         description: Wysłano prośbę o zresetowanie hasła
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Potwierdzenie wysłania prośby o zresetowanie hasła

*/

const passwordResetEndpoint = (router) => {
  router.post("/api/password/reset", async (request, response, next) => {
    try {
      const result = await businessContainer
        .getPasswordManager(request)
        .createNewOrUpdate(request.body.email);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  /**
   * @swagger
   * /api/password/confirm:
   *   post:
   *     summary: Potwierdza reset hasła za pomocą tokena
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PasswordResetConfirmation'
   *     responses:
   *       200:
   *         description: Hasło zostało zresetowane
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Potwierdzenie zresetowania hasła
   */

  router.post("/api/password/confirm", async (request, response, next) => {
    try {
      const result = await businessContainer
        .getPasswordManager(request)
        .changepassword(request.body.token, request.body.password);
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
          .getPasswordManager(request)
          .remove(request.body.id);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );

  router.get("/api/categoryCard/getAll", async (request, response, next) => {
    try {
      let result = await businessContainer.getPasswordManager(request).getAll();
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });
};

export default passwordResetEndpoint;
