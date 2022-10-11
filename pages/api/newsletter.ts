import { NextApiHandler } from "next";

import { MongoClient } from "mongodb";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "POST") {
    const userEmail = req.body.email as string;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    const host = process.env.DB_HOST;
    const username = process.env.DB_USER;
    const pass = process.env.DB_PASS;

    const client = await MongoClient.connect(
      `mongodb+srv://${username}:${pass}@${host}/?retryWrites=true&w=majority`
    );

    const db = client.db("newsletter");
    await db.collection("emails").insertOne({ email: userEmail });

    client.close();

    res.status(201).json({ message: "Signed up" });
  }
};

export default handler;
