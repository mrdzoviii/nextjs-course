import { FC } from "react";

import { Post } from "../../type-definitions";

import PostsGrid from "./posts-grid";

import classes from "./all-posts.module.css";

export interface IAllPostsProps {
  posts: Post[];
}

const AllPosts: FC<IAllPostsProps> = ({ posts }) => {
  return (
    <section className={classes.posts}>
      <h1>All posts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default AllPosts;
