import mongoose from "mongoose";
import supertest from "supertest";
import config from "../app/config";
import app from "../app/app";
import exerciseDAO from "../app/DAO/exerciseDAO";

const exerciseMockData = {
  name: "test",
  time: "20 min",
  set: "10",
};

describe("Exercise tests", () => {
  let exercise = {};

  beforeEach(async () => {
    await mongoose.connect(config.databaseUrl);
    exercise = await exerciseDAO.createNewOrUpdate(exerciseMockData);
  });

  afterEach(async () => {
    await exerciseDAO.removeById(exercise.id);
    exercise = {};
    await mongoose.connection.close();
  });

  describe("GET /api/exercise/getAll", () => {
    it("should return all exercises", async () => {
      const response = await supertest(app).get(`/api/exercise/getAll`);

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("POST /api/exercise/create", () => {
    it("should create new exercise", async () => {
      const data = {
        name: "test2",
        time: "20 min",
        set: "10",
      };

      const response = await supertest(app)
        .post("/api/exercise/create")
        .send(data);
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe("test2");
      await exerciseDAO.removeById(response.body.id);
    });
  });

  describe("DELETE /api/exercise/remove/:id", () => {
    it("should remove exercise by id", async () => {
      const response = await supertest(app).delete(
        `/api/exercise/remove/${exercise.id}`
      );
      expect(response.statusCode).toBe(200);
    });
  });
});
