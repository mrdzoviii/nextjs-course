import { MongoClient } from "mongodb";
import { NextApiHandler } from "next";
import { Comment } from "../../../components/input/comments";
const handler: NextApiHandler = async (req, res) => {
  const eventId = req.query.eventid as string;

  const host = process.env.DB_HOST;
  const username = process.env.DB_USER;
  const pass = process.env.DB_PASS;
  const client = await MongoClient.connect(
    `mongodb+srv://${username}:${pass}@${host}/?retryWrites=true&w=majority`
  );

  if (req.method === "POST") {
    const { email, name, text } = req.body as {
      email: string;
      name: string;
      text: string;
    };

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input..." });
      client.close();
      return;
    }
    const comment = { email, name, text, eventId } as Comment;
    const db = client.db("events");
    const result = await db.collection("comments").insertOne(comment);
    comment.id = result.insertedId.toString();
    res.status(201).json({ message: "Added comment.", comment });
  }
  if (req.method === "GET") {
    const db = client.db("events");
    const comments = await db
      .collection("comments")
      .find({ eventId })
      .sort({ _id: -1 })
      .toArray();
    res.status(200).json({ comments });
  }
  client.close();
  return;
};

export default handler;
