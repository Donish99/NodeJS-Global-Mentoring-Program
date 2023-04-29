import express from "express";
import config from "./config";
import userRouter from "./routes/user.route";
import groupRouter from "./routes/group.route";
import logMiddleware from "./middlewares/log";
import errorLog from "./middlewares/error.log";

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use(logMiddleware);
  app.use(errorLog);

  app.get("/", (req, res) => res.sendStatus(200));

  app.use("/users", userRouter);
  app.use("/groups", groupRouter);

  app
    .listen(config.port, () => {
      console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on("error", (err) => {
      console.error(err);
      process.exit(1);
    });
}

startServer();
