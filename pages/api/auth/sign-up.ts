import { NextApiHandler } from "next";

import { LoginRequest } from "../../../types";
import { hashPassword } from "../../../helpers/auth";
import { connectToDatabase } from "./../../../helpers/db";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
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

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "User with given email already exists" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Created user!" });
    client.close();
  }
};

export default handler;
