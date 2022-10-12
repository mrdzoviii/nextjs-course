import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { Post } from "../../type-definitions";

import classes from "./post-item.module.css";

export interface IPostItemProps {
  post: Post;
}

const PostItem: FC<IPostItemProps> = ({ post }) => {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <li className={classes.post}>
      <Link href={`/posts/${post.slug}`}>
        <a>
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${post.image}`}
              alt={post.title}
              height={200}
              width={300}
              layout="responsive"
            />
          </div>
          <div className={classes.content}>
            <h3>{post.title}</h3>
            <time>{formattedDate}</time>
            <p>{post.excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default PostItem;
