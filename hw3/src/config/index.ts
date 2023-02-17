import dotenv from 'dotenv';
import { Sequelize } from "sequelize";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT!, 10),
  DB: {
    name: process.env.DB_NAME!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
  },
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: '/api',
  },
};