import fs from "fs/promises";
import path from "path";

import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { Product } from "../types";

export interface IHomePageProps {
  products: Product[];
}

const HomePage: NextPage<IHomePageProps> = ({ products }) => {
  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

//can do server side things
//code won't be run on client-side and this is not part of client bundle
export const getStaticProps: GetStaticProps<IHomePageProps> = async (
  ctx: GetStaticPropsContext
) => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data: { products: Product[] } = JSON.parse(jsonData.toString());

  if (!data) {
    return {
      props: {
        products: [],
      },
      redirect: {
        destination: "/no-data", // redirect user to another page
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 120,
    notFound: true, //404 error instead normal page, e.g if fetch fails then we maybe want to return 404 page
  };
};

export default HomePage;
