import fs from "fs/promises";
import path from "path";

import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { Product } from "../types";
import { useEffect, useState } from "react";

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
  return {
    props: {
      products: data.products,
    },
    revalidate: 120,
  };
};

export default HomePage;
