import UsersController from "../user.controller";
import UsersService from "../../services/user.service";
import { Request, Response } from "express";
import User from "src/models/user.model";

describe("UsersController", () => {
  describe("createUser", () => {
    it("should return a status code of 201", async () => {
      const req: Request = { body: {} } as Request;
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      jest.spyOn(UsersService, "createUser").mockResolvedValue({} as User);

      await UsersController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe("updateUser", () => {
    it("should return a status code of 200", async () => {
      const req: Request = {
        params: { id: "1" },
        body: {},
      } as unknown as Request;
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      jest.spyOn(UsersService, "updateUser").mockResolvedValue(1);

      await UsersController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should return a status code of 404 when the user is not found", async () => {
      const req: Request = {
        params: { id: "1" },
        body: {},
      } as unknown as Request;
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      jest.spyOn(UsersService, "updateUser").mockResolvedValue(0);

      await UsersController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe("getUserById", () => {
    it("should return a status code of 200", async () => {
      const req: Request = { params: { id: "1" } } as unknown as Request;
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      jest.spyOn(UsersService, "getUserById").mockResolvedValue({} as User);

      await UsersController.getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should return a status code of 404 when the user is not found", async () => {
      const req: Request = { params: { id: "1" } } as unknown as Request;
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      jest.spyOn(UsersService, "getUserById").mockResolvedValue(null);

      await UsersController.getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe("getAutoSuggestUsers", () => {
    it("should return a status code of 200", async () => {
      const req: Request = {
        query: { loginSubstring: "a", limit: "10" },
      } as unknown as Request;
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      jest.spyOn(UsersService, "getAutoSuggestUsers").mockResolvedValue([]);

      await UsersController.getAutoSuggestUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
