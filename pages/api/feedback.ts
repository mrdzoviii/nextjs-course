import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  res.status(200).json({ message: "This works!" });
};

export default handler;
