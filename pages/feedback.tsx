import { GetStaticProps, NextPage } from "next";
import { Feedback } from "../types";
import { buildFeedbackPath, extractFeedback } from "./api/feedback";

export interface IFeedbackPageProps {
  items: Feedback[];
}

const FeedbackPage: NextPage<IFeedbackPageProps> = ({ items }) => {
  const loadFeedback = (id: string) => {
    fetch(`/api/feedback/${id}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <button onClick={() => loadFeedback(item.id)}>Show details</button>
        </li>
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
