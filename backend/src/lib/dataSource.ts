import { DataSource } from "typeorm";
import entities from "../entities";
import { configDotenv } from "dotenv";

configDotenv();
const { env } = process;
if (
  !env.DB_HOST ||
  !env.DB_PASSWORD ||
  !env.DB_DATABASE ||
  !env.DB_USER ||
  !env.ENV
)
  throw new Error("Missing env variables!");

export const dataSource = new DataSource({
  entities,
  synchronize: env.ENV === "dev",
  logging: false,

  type: "postgres",
  host: env.DB_HOST,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
});
