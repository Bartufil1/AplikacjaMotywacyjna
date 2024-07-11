import mongoose from "mongoose";
import supertest from "supertest";
import config from "../app/config";
import app from "../app/app";
import userDAO from "../app/DAO/userDAO";

const userMockData = {
  email: "test1234@gmail.com",
  username: "test1234",
  password: "test1234",
};

describe("User tests", () => {
  let user = {};

  beforeEach(async () => {
    await mongoose.connect(config.databaseUrl);
    user = await userDAO.createNewOrUpdate(userMockData);
  });

  afterEach(async () => {
    await userDAO.removeById(user.id);
    user = {};
    await mongoose.connection.close();
  });

  describe("GET /api/exercise/getAll", () => {
    it("should return all exercises", async () => {
      const response = await supertest(app).get(`/api/exercise/getAll`);

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("POST /api/user/create", () => {
    it("should create new user account", async () => {
      const data = {
        email: "test12345@gmail.com",
        username: "test12345",
        password: "test12345",
      };

      const response = await supertest(app).post("/api/user/create").send(data);
      expect(response.statusCode).toBe(200);

      expect(response.body.userId).toBeDefined();

      await userDAO.removeById(response.body.userId);
    });
  });

  describe("POST /api/user/auth", () => {
    it("should return 401 status when provided data is incorrect", async () => {
      const data = {
        username: userMockData.email,
        password: userMockData.password,
      };

      const response = await supertest(app).post("/api/user/auth").send(data);
      expect(response.statusCode).toBe(401);
    });

    it("should return 404 status when user don't exists", async () => {
      const data = {
        username: "bad data",
        password: "bad data",
      };

      const response = await supertest(app).post("/api/user/auth").send(data);
      expect(response.statusCode).toBe(404);
    });
  });
});
