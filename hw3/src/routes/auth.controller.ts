// auth.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config, { logger } from "../config";
import UserService from "../services/user.service";
import Joi from "joi";
import { checkHash } from "src/utils";

const authSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required().min(8),
});

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const { error } = authSchema.validate(req.body);
      if (error) {
        res.status(400).send(error.details[0].message);
        return;
      }
      const { email, password } = req.body;
      const user = await UserService.findByEmail(email);
      if (!user) return res.status(404).json({ message: "User not found" });

      const passwordMatch = checkHash(user.password, password);
      if (!passwordMatch)
        return res.status(401).json({ message: "Incorrect credentials" });

      const token = jwt.sign({ userId: user.id }, config.jwtSecret);
      return res.status(200).json({ token });
    } catch (error: any) {
      logger.error(`Error in AuthController.login: ${error.message}`, {
        args: [req.params.id],
        error,
      });
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new AuthController();
