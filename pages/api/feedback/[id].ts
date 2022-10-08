import fs from "fs";
import path from "path";
import { NextApiHandler } from "next";
import { Feedback } from "../../../types";

export const buildFeedbackPath = (): string =>
  path.join(process.cwd(), "data", "feedback.json");

export const extractFeedback = (filePath: string): Feedback[] => {
  return JSON.parse(fs.readFileSync(filePath).toString()) as Feedback[];
};

const handler: NextApiHandler = (req, res) => {
  const id = req.query.id;
  const filePath = buildFeedbackPath();
  const fileData = extractFeedback(filePath);
  const feedback = fileData.find((feed) => feed.id === id);
  if (!feedback) {
    res.status(404).json({ message: "Feedback not found" });
  }
  res.status(200).json({ ...feedback });
};

export default handler;
