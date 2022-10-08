import { GetStaticProps, NextPage } from "next";
import { Feedback } from "../types";
import { buildFeedbackPath, extractFeedback } from "./api/feedback";

export interface IFeedbackPageProps {
  items: Feedback[];
}

const FeedbackPage: NextPage<IFeedbackPageProps> = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.feedback}</li>
      ))}
    </ul>
  );
};

export const getStaticProps: GetStaticProps<IFeedbackPageProps> = async () => {
  const filePath = buildFeedbackPath();
  const items = extractFeedback(filePath);
  return {
    props: {
      items,
    },
  };
};

export default FeedbackPage;
