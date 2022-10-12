import { NextPage } from "next";

import { Post } from "../../type-definitions";

import AllPosts from "../../components/posts/all-posts";

const DUMMY_POSTS: Post[] = [
  {
    slug: "getting-started-nextjs",
    title: "Getting starting with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is React framework for production - it makes building fullstack React apps breeze and ships with built-in SSR.",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-nextjs2",
    title: "Getting starting with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is React framework for production - it makes building fullstack React apps breeze and ships with built-in SSR.",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-nextjs3",
    title: "Getting starting with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is React framework for production - it makes building fullstack React apps breeze and ships with built-in SSR.",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-nextjs4",
    title: "Getting starting with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is React framework for production - it makes building fullstack React apps breeze and ships with built-in SSR.",
    date: "2022-02-10",
  },
];

const AllPostsPage: NextPage = () => {
  return <AllPosts posts={DUMMY_POSTS} />;
};

export default AllPostsPage;
