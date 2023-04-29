import { NextFunction, Request, Response } from "express";
import winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log" }),
  ],
});

const errorLog = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error(err.stack);
  res.status(500).send("Internal Server Error");
};

process.on("uncaughtException", (err: Error) => {
  logger.error(err.stack);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled rejection: ${reason}`);
});

export default errorLog;
