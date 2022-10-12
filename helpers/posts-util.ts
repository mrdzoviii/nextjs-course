import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { Post } from "../type-definitions";

const postsDir = path.join(process.cwd(), "/content/posts");

const getPostData = (fileName: string): Post => {
  const filePath = path.join(postsDir, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, "");
  return { content, ...data, slug: postSlug } as Post;
};

export const getAllPosts = (): Post[] => {
  const postFiles = fs.readdirSync(postsDir);
  return postFiles
    .map((post) => getPostData(post))
    .sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
};

export const getAllFeaturedPosts = (): Post[] => {
  return getAllPosts().filter((post) => post.isFeatured);
};
