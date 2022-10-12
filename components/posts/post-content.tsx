import { FC } from "react";

import ReactMarkdown from "react-markdown";

import { Post } from "../../type-definitions";

import PostHeader from "./post-header";

import classes from "./post-content.module.css";

export interface IPostContentProps {
  post: Post;
}

const PostContent: FC<IPostContentProps> = ({ post }) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
