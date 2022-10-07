import {
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import path from "path";
import fs from "fs/promises";
import { Product } from "../../types";

export interface IProductDetailPageProps {
  product: Product;
}

const ProductDetailPage: NextPage = ({ product }: IProductDetailPageProps) => {
  if (!product) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
};

const getData = async (): Promise<{ products: Product[] }> => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data: { products: Product[] } = JSON.parse(jsonData.toString());
  return data;
};

export const getStaticProps: GetStaticProps<IProductDetailPageProps> = async (
  ctx: GetServerSidePropsContext
) => {
  const { params } = ctx;
  const paramId = params.pid;
  const data = await getData();
  const product = data.products.find((prod) => prod.id === paramId);

  if (!product) {
    return {
      notFound: true,
    };
  }

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
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const params = ids.map((id) => ({ params: { pid: id } }));
  return {
    paths: params,
    fallback: false, //could be blocking then server will wait to fetch data
  };
};

export default ProductDetailPage;
