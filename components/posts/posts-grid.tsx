import { FC } from "react";

import { Post } from "../../type-definitions";

import PostItem from "./post-item";

import classes from "./posts-grid.module.css";

export interface IPostsGridProps {
  posts: Post[];
}

const PostsGrid: FC<IPostsGridProps> = ({ posts }) => {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
};

export default PostsGrid;
