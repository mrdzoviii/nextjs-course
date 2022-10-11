import { NextApiHandler } from "next";
const handler: NextApiHandler = (req, res) => {
  if (req.method == "POST") {
    const userEmail = req.body.email as string;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    console.log(userEmail);
    res.status(201).json({ message: "Signed up" });
  }
};

export default handler;
