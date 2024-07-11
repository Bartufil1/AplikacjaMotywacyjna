import userDAO from "../app/DAO/userDAO";
import passwordDAO from "../app/DAO/passwordDAO";
import tokenDAO from "../app/DAO/tokenDAO";
import applicationException from "../app/service/applicationException";
import businessContainer from "../app/business/business.container";

jest.mock("../app/DAO/userDAO");
jest.mock("../app/DAO/passwordDAO");
jest.mock("../app/DAO/tokenDAO");

describe("Authentication Module", () => {
  describe("authenticate", () => {
    it("should return token for valid user credentials", async () => {
      const mockUser = {
        id: "userId",
        email: "test@example.com",
        password: "hashedPassword",
      };
      userDAO.getByEmailOrName.mockResolvedValue(mockUser);
      passwordDAO.authorize.mockResolvedValue(true);
      const mockToken = { value: "mockTokenValue" };
      tokenDAO.create.mockResolvedValue(mockToken);

      const result = await businessContainer
        .getUserManager()
        .authenticate("test@example.com", "password123");

      expect(result).toEqual({ token: "mockTokenValue" });
    });
  });

  describe("removeHashSession", () => {
    it("should remove token for a given userId", async () => {
      const mockUserId = "userId";
      tokenDAO.remove.mockResolvedValue(true);

      const result = await businessContainer
        .getUserManager()
        .removeHashSession(mockUserId);

      expect(result).toBe(true);
      expect(tokenDAO.remove).toHaveBeenCalledWith(mockUserId);
    });
  });

  describe("hashString", () => {
    it("should hash a string using sha1", () => {
      const result = businessContainer
        .getUserManager()
        .hashString("password123");
      expect(result).toBeDefined();
    });
  });
});
