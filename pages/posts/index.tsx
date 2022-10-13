import { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { Post } from "../../type-definitions";

import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../helpers/posts-util";

export interface IAllPostsPage {
  posts: Post[];
}

const AllPostsPage: NextPage<IAllPostsPage> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta name="description" content="List of all courses" />
      </Head>
      <AllPosts posts={posts} />
    </>
  );
};

export const getStaticProps: GetStaticProps<IAllPostsPage> = async () => {
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts,
    },
  };
};

export default AllPostsPage;
