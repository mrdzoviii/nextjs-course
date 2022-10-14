import { NextApiHandler } from "next";

import { LoginRequest } from "../../../types";
import { hashPassword } from "../../../helpers/auth";
import { connectToDatabase } from "./../../../helpers/db";

const handler: NextApiHandler = async (req, res) => {
  const { email, password } = req.body as LoginRequest;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: "Email or password is invalid" });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Created user!" });
};

export default handler;
