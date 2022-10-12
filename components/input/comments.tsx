import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import { NextPage } from "next";
import NotificationContext from "../../store/notification-context";

export interface ICommentsProps {
  eventId: string;
}

export type Comment = {
  id: string;
  email: string;
  name: string;
  text: string;
  eventId: string;
};

const Comments: NextPage<ICommentsProps> = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`, { method: "GET" })
        .then((res) => res.json())
        .then((data) => setComments([...data.comments]));
    }
  }, [eventId, showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: {
    email: string;
    name: string;
    text: string;
  }) {
    showNotification({
      title: "Sending comment...",
      message: "Your comment is currently being stored into a db",
      status: "pending",
    });
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...commentData }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then(() =>
        showNotification({
          title: "Success",
          message: "Your comment is saved!",
          status: "success",
        })
      )
      .catch((err) => {
        showNotification({
          title: "Error!",
          status: "error",
          message: err.message || "Something went wrong!",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
};

export default Comments;
