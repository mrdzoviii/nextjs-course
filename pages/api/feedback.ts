import fs from "fs";
import path from "path";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    const { email, feedback } = req.body;
    const newFeedback = {
      id: Date.now(),
      email,
      feedback,
    };

    const filePath = path.join(process.cwd(), "data", "feedback.json");
    const fileData = JSON.parse(fs.readFileSync(filePath).toString());
    fileData.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(fileData));

    res.status(201).json({ message: "Success", feedback: newFeedback });
  } else {
    res.status(400).json({ message: "Wrong method" });
  }
};

export default handler;
