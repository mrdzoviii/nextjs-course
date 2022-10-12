import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { Post } from "../../type-definitions";

import PostContent from "../../components/posts/post-content";
import { getAllPostFiles, getPostData } from "../../helpers/posts-util";

export interface IPostDetailPageProps {
  post: Post;
}

const PostDetailPage: NextPage<IPostDetailPageProps> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  );
};

export const getStaticProps: GetStaticProps<IPostDetailPageProps> = async (
  ctx
) => {
  const { params } = ctx;
  const slug = params.slug as string;

  const post = getPostData(slug);

  return { props: { post }, revalidate: 60 * 10 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postFiles = getAllPostFiles().map((fileName) =>
    fileName.replace(/\.md$/, "")
  );
  return {
    paths: postFiles.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export default PostDetailPage;
