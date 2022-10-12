import { GetStaticProps, NextPage } from "next";

import { Post } from "../type-definitions";

import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getAllFeaturedPosts } from "../helpers/posts-util";

export interface IHomePageProps {
  posts: Post[];
}

const HomePage: NextPage<IHomePageProps> = ({ posts }) => {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
};

export const getStaticProps: GetStaticProps<IHomePageProps> = async () => {
  const featuredPosts = getAllFeaturedPosts();
  return {
    props: {
      posts: featuredPosts,
    },
  };
};

export default HomePage;
