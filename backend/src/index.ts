import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { configDotenv } from "dotenv";
import { buildSchema } from "type-graphql";
import { dataSource } from "./lib/dataSource";
import resolvers from "./resolvers";

configDotenv();

const { env } = process;
if (!env.SERVICE_PORT) throw new Error("Missing env variables!");

const start = async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers,
  });
  const server = new ApolloServer({ schema });
  await startStandaloneServer(server, {
    listen: { port: Number(env.SERVICE_PORT) },
  });
};
start().catch(console.error);
