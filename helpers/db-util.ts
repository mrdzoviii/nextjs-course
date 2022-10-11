import { MongoClient, Document, Filter, InsertOneResult, Sort } from "mongodb";

export const connectDB = async (): Promise<MongoClient> => {
  const host = process.env.DB_HOST;
  const username = process.env.DB_USER;
  const pass = process.env.DB_PASS;
  const client = await MongoClient.connect(
    `mongodb+srv://${username}:${pass}@${host}/events?retryWrites=true&w=majority`
  );
  return client;
};

export const insertDocument = async (
  client: MongoClient,
  collection: string,
  document: Document
): Promise<InsertOneResult<Document>> => {
  const db = client.db();
  return await db.collection(collection).insertOne(document);
};

export const getAllDocuments = async (
  client: MongoClient,
  collection: string,
  find?: Filter<Document>,
  sort?: Sort
) => {
  const db = client.db();
  return await db.collection(collection).find(find).sort(sort).toArray();
};
