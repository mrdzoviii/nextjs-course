import { NextApiHandler } from "next";

import { MongoClient, Document } from "mongodb";

const connectDB = async (): Promise<MongoClient> => {
  const host = process.env.DB_HOST;
  const username = process.env.DB_USER;
  const pass = process.env.DB_PASS;
  const client = await MongoClient.connect(
    `mongodb+srv://${username}:${pass}@${host}/?retryWrites=true&w=majority`
  );
  return client;
};

const insertDocument = async (client: MongoClient, document: Document) => {
  const db = client.db("events");
  await db.collection("emails").insertOne(document);
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "POST") {
    const userEmail = req.body.email as string;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    let client;

    try {
      client = await connectDB();
    } catch (err) {
      res.status(500).json({ message: "Connecting to the db failed" });
      return;
    }

    try {
      await insertDocument(client, { email: userEmail });
      client.close();
    } catch (err) {
      res.status(500).json({ message: "Inserting data failed" });
      return;
    }

    res.status(201).json({ message: "Signed up" });
  }
};

export default handler;
