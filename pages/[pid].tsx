import {
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import path from "path";
import fs from "fs/promises";
import { Product } from "../types";

export interface IProductDetailPageProps {
  product: Product;
}

const ProductDetailPage: NextPage = ({ product }: IProductDetailPageProps) => {
  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
};

export const getStaticProps: GetStaticProps<IProductDetailPageProps> = async (
  ctx: GetServerSidePropsContext
) => {
  const { params } = ctx;
  const paramId = params.pid;
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data: { products: Product[] } = JSON.parse(jsonData.toString());
  const product = data.products.find((prod) => prod.id === paramId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data: { products: Product[] } = JSON.parse(jsonData.toString());

  return {
    paths: [
      { params: { pid: "p1" } },
      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
    ],
    fallback: false,
  };
};

export default ProductDetailPage;
