import { MongoClient } from "mongodb";

const dbConnectionUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/auth-demo?retryWrites=true&w=majority`;

export const connectToDatabase = async (): Promise<MongoClient> => {
  const client = await MongoClient.connect(dbConnectionUrl);
  return client;
};
