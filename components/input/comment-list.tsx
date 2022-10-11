import { link } from "fs";
import { NextPage } from "next";
import classes from "./comment-list.module.css";
import { Comment } from "./comments";

export interface ICommentListProps {
  comments: Comment[];
}

const CommentList: NextPage<ICommentListProps> = ({ comments }) => {
  return (
    <ul className={classes.comments}>
      {comments.map((comment) => (
        <li key={comment.id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
