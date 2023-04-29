import { NextFunction, Request, Response } from "express";

const logMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const serviceName = req.path.split("/")[1]; // Assumes service name is first segment of URL
  const methodName = req.method;
  const args = req.body;

  console.log(
    `Service ${serviceName}: ${methodName} called with arguments:`,
    args
  );

  next();
};

export default logMiddleware;
