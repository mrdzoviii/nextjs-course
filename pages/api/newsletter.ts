import { NextApiHandler } from "next";
import { connectDB, insertDocument } from "../../helpers/db-util";

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
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close();
    } catch (err) {
      res.status(500).json({ message: "Inserting data failed" });
      return;
    }

    res.status(201).json({ message: "Signed up" });
  }
};

export default handler;
