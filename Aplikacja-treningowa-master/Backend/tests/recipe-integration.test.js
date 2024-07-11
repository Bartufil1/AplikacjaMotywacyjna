import mongoose from "mongoose";
import supertest from "supertest";
import config from "../app/config";
import app from "../app/app";
import recipeDAO from "../app/DAO/recipeDAO";

const recipeMockData = {
  title: "test",
  readyinMinutes: 40,
  servings: 10,
  aggregateLikes: 20,
  healthScore: 100,
  instructions: "testing",
  dishTypes: "test",
  extendedIngredients: [],
};

describe("Recipe tests", () => {
  let recipe = {};

  beforeEach(async () => {
    await mongoose.connect(config.databaseUrl);
    recipe = await recipeDAO.createNewOrUpdate(recipeMockData);
  });

  afterEach(async () => {
    await recipeDAO.remove(recipe.id);
    recipe = {};
    await mongoose.connection.close();
  });

  describe("GET /api/recipe/getAll", () => {
    it("should return all recipes", async () => {
      const response = await supertest(app).get(`/api/recipe/getAll`);

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /api/recipe/get/:id", () => {
    it("should return recipe with provided id", async () => {
      const response = await supertest(app).get(`/api/recipe/get/${recipe.id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe("test");
    });
  });

  describe("POST /api/recipe/create", () => {
    it("should create new recipe", async () => {
      const data = {
        title: "test2",
        readyinMinutes: 40,
        servings: 10,
        aggregateLikes: 20,
        healthScore: 100,
        instructions: "testing",
        dishTypes: "test",
        extendedIngredients: [],
      };

      const response = await supertest(app)
        .post("/api/recipe/create")
        .send(data);
      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe("test2");

      await recipeDAO.remove(response.body.id);
    });
  });

  describe("DELETE /api/exercise/remove/:id", () => {
    it("should remove exercise by id", async () => {
      const response = await supertest(app).delete(
        `/api/exercise/remove/${recipe.id}`
      );
      expect(response.statusCode).toBe(200);
    });
  });
});
