import { NextApiHandler } from "next";
const handler: NextApiHandler = (req, res) => {
  const eventId = req.query.eventId as string;
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
      return;
    }
    const comment = { id: Date.now().toString(), email, name, text };
    console.log(comment);
    res.status(201).json({ message: "Added comment.", comment });
  }
  if (req.method === "GET") {
    const dummyList = [
      {
        id: "c1",
        name: "Max",
        text: "First comment",
      },
      {
        id: "c1",
        name: "Manu",
        text: "Second comment",
      },
    ];
    res.status(200).json({ comments: dummyList });
  }
  return;
};

export default handler;
