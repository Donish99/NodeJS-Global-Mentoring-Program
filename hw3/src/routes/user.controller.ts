import { Request, Response } from "express";
import UsersService from "../services/user.service";
import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).max(120).required(),
  address: Joi.string().required(),
});

class UsersController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = userSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.message });
        return;
      }
      const user = await UsersService.createUser(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const { error } = userSchema.validate(req.body);
      if (error) {
        res.status(400).send(error.details[0].message);
        return;
      }
      const user = await UsersService.updateUser(id, req.body);
      if (user === 1) {
        res.status(200).json({ message: `User with id ${id} updated` });
      } else {
        res.status(404).json({ message: `User with id ${id} not found` });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await UsersService.getUserById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: `User with id ${id} not found` });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAutoSuggestUsers(req: Request, res: Response): Promise<void> {
    try {
      const { loginSubstring, limit } = req.query;
      const users = await UsersService.getAutoSuggestUsers(parseInt(limit as string), loginSubstring as string);
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const deletedCount = await UsersService.deleteUser(id);
      if (deletedCount === 1) {
        res.status(200).json({ message: `User with id ${id} deleted` });
      } else {
        res.status(404).json({ message: `User with id ${id} not found` });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new UsersController();
