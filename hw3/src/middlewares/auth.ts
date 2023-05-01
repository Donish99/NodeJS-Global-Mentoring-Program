import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.path === "/login") {
    // skip check for login route
    return next();
  }

  const token = req.headers["x-auth-token"]?.[0];
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const decodedToken = jwt.verify(token, config.jwtSecret);
    next();
  } catch (err) {
    // handle invalid token
    return res.status(403).send("Forbidden");
  }
};

export default checkAuth;
