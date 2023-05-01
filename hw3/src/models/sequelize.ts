import { Sequelize } from "sequelize";
import config from "../config";

const sequelize = new Sequelize(config.DB.url, {
  dialect: "postgres",
  logging: false,
});

export default sequelize;
