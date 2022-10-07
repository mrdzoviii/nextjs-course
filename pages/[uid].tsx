import { GetServerSideProps, NextPage } from "next";

export interface IUserIdPageProps {
  id: string;
}

const UserIdPage: NextPage<IUserIdPageProps> = ({ id }) => {
  return <h1>{id}</h1>;
};

export const getServerSideProps: GetServerSideProps<IUserIdPageProps> = async (
  ctx
) => {
  const { params } = ctx;
  return {
    props: { id: `userid-${params.uid}` },
  };
};

export default UserIdPage;
