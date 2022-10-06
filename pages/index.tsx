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
export const getStaticProps: GetStaticProps<IHomePageProps> = async () => {
  return {
    props: {
      products: [
        { id: "p1", title: "Product 1", description: "Product 1 description" },
      ],
    },
  };
};

export default HomePage;
