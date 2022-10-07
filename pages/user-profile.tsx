import { GetServerSideProps, NextPage } from "next";

export interface IUserProfilePageProps {
  userName: string;
}

const UserProfilePage: NextPage<IUserProfilePageProps> = ({ userName }) => {
  return <h1>{userName}</h1>;
};

export const getServerSideProps: GetServerSideProps<
  IUserProfilePageProps
> = async (ctx) => {
  const { params, req, res } = ctx;
  return {
    props: {
      userName: "Max",
    },
  };
};

export default UserProfilePage;
