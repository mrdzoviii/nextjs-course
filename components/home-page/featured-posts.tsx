import { FC } from "react";

import { Post } from "../../type-definitions";

import PostsGrid from "../posts/posts-grid";

import classes from "./featured-posts.module.css";

export interface IFeaturedPostsProps {
  posts: Post[];
}

const FeaturedPosts: FC<IFeaturedPostsProps> = ({ posts }) => {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default FeaturedPosts;
