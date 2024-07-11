import config from "../app/config";
import auth from "../app/middleware/auth";
import jwt from "jsonwebtoken";

describe("Auth Middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return 401 if no token provided", () => {
    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("Access denied. No token provided");
  });

  it("should return 400 if token is invalid", () => {
    req.headers.authorization = "Bearer invalid-token";

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Invalid token");
  });

  it("should call next() if token is valid", () => {
    const validToken = jwt.sign({ userId: "123" }, config.JwtSecret);
    req.headers.authorization = `Bearer ${validToken}`;

    auth(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user.userId).toEqual("123");
  });
});
