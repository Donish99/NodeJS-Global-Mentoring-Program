import { Sequelize } from "sequelize";
import config from "../config";

const sequelize = new Sequelize(config.DB.url, { dialect: "postgres" });

export default sequelize;
