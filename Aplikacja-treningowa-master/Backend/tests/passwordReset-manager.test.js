import passwordResetDAO from "../app/DAO/passwordResetDAO";
import userDAO from "../app/DAO/userDAO";
import businessContainer from "../app/business/business.container";

jest.mock("../app/DAO/userDAO");
jest.mock("../app/DAO/passwordResetDAO");
jest.mock("../app/service/mail");

describe("createNewOrUpdate", () => {
  it("should create password reset and send email for existing user", async () => {
    const userData = { email: "test@example.com" };
    const user = { id: "123", email: userData.email };
    const token = "mocked-token";
    const preparedData = { user: user.id, token };
    userDAO.getByEmailOrName.mockResolvedValue(user);
    passwordResetDAO.createNewOrUpdate.mockResolvedValue(preparedData);

    const result = await businessContainer
      .getPasswordManager()
      .createNewOrUpdate(userData);

    expect(result).toEqual(preparedData);
    expect(userDAO.getByEmailOrName).toHaveBeenCalledWith(userData);
  });

  it("should not create password reset for non-existing user", async () => {
    const userData = { email: "nonexistent@example.com" };

    userDAO.getByEmailOrName.mockResolvedValue(null);

    const result = await businessContainer
      .getPasswordManager()
      .createNewOrUpdate(userData);
    expect(result).toBeUndefined();
  });
});
