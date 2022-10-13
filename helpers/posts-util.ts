import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { Post } from "../type-definitions";

const postsDir = path.join(process.cwd(), "/content/posts");

export const getPostData = (postIdentifier: string): Post => {
  const postSlug = postIdentifier.replace(/\.md$/, "");
  const filePath = path.join(postsDir, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return { content, ...data, slug: postSlug } as Post;
};

export const getAllPostFiles = (): string[] => {
  return fs.readdirSync(postsDir);
};

export const getAllPosts = (): Post[] => {
  const postFiles = getAllPostFiles();
  return postFiles
    .map((post) => getPostData(post))
    .sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
};

export const getAllFeaturedPosts = (): Post[] => {
  return getAllPosts().filter((post) => post.isFeatured);
};
