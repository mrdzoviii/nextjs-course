import { NextPage } from "next";
import classes from "./comment-list.module.css";

export interface ICommentListProps {}

const CommentList: NextPage<ICommentListProps> = () => {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
    </ul>
  );
};

export default CommentList;
