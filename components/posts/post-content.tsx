import { FC } from "react";

import { Post } from "../../type-definitions";

import PostHeader from "./post-header";

import classes from "./post-content.module.css";

const DUMMY_POST: Post = {
  slug: "getting-started-nextjs3",
  title: "Getting starting with NextJS",
  image: "getting-started-nextjs.png",
  excerpt:
    "NextJS is React framework for production - it makes building fullstack React apps breeze and ships with built-in SSR.",
  date: "2022-02-10",
  content: "# This is a first post",
};

export interface IPostContentProps {}

const PostContent: FC<IPostContentProps> = () => {
  const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;
  return (
    <article className={classes.content}>
      <PostHeader title={DUMMY_POST.title} image={imagePath} />
      {DUMMY_POST.content}
    </article>
  );
};

export default PostContent;
