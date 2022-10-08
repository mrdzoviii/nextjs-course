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
  if (req.method === "POST") {
    console.log(req.body);
    const { email, feedback } = req.body;
    const newFeedback: Feedback = {
      id: `f${Date.now().toString()}`,
      email,
      feedback,
    };

    const filePath = buildFeedbackPath();
    const fileData = extractFeedback(filePath);
    fileData.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(fileData));
    res.status(201).json({ message: "Success", feedback: newFeedback });
  } else {
    const filePath = buildFeedbackPath();
    const fileData = extractFeedback(filePath);
    res.status(200).json({ feedback: fileData });
  }
};

export default handler;
