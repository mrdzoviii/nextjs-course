import { NextApiHandler } from "next";

import { IContactFormRequest } from "../../../type-definitions";

const handler: NextApiHandler = (req, res) => {
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

    //STORE IN DB

    const newMessage: IContactFormRequest = { email, name, message };
    res
      .status(201)
      .json({
        message: "Successfully stored message",
        storedMessage: newMessage,
      });
  }
};
export default handler;
