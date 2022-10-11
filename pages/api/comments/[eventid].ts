import { MongoClient } from "mongodb";
import { NextApiHandler } from "next";
import { Comment } from "../../../components/input/comments";
import {
  connectDB,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";
const handler: NextApiHandler = async (req, res) => {
  const eventId = req.query.eventid as string;

  let client;

  try {
    client = await connectDB();
  } catch (err) {
    res.status(500).json({ message: "Connecting to the db failed" });
    return;
  }

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

    try {
      const result = await insertDocument(client, "comments", { ...comment });
      comment.id = result.insertedId.toString();
      res.status(201).json({ message: "Added comment.", comment });
    } catch (err) {
      res.status(500).json({ message: "Inserting data failed" });
    }
  }
  if (req.method === "GET") {
    try {
      const comments = await getAllDocuments(
        client,
        "comments",
        { eventId },
        { _id: -1 }
      );
      res.status(200).json({ comments });
    } catch (err) {
      res.status(500).json({ message: "Getting comments failed" });
    }
  }
  client.close();
  return;
};

export default handler;
