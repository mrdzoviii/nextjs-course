import { NextApiHandler } from "next";

import { MongoClient } from "mongodb";

import { ContactForm, IContactFormRequest } from "../../type-definitions";

const dbConnectionURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/my-site?retryWrites=true&w=majority`;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const { email, name, message } = req.body as IContactFormRequest;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }
    let client: MongoClient;
    try {
      client = await MongoClient.connect(dbConnectionURL);
    } catch (err) {
      res.status(500).json({ message: "Could not connect to db" });
      return;
    }
    const newMessage = { email, name, message } as ContactForm;
    try {
      const db = client.db();
      const result = await db.collection("messages").insertOne({
        email: newMessage.email,
        name: newMessage.name,
        message: newMessage.message,
      });
      newMessage._id = result.insertedId.toString();
    } catch (err) {
      client.close();
      res.status(500).json({ message: "Storing message failed" });
      return;
    }

    client.close();

    res.status(201).json({
      message: "Successfully stored message",
      storedMessage: newMessage,
    });
  }
};
export default handler;
