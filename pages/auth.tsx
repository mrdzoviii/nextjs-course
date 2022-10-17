import { GetServerSideProps, NextPage } from "next";

import { getSession } from "next-auth/react";

import AuthForm from "../components/auth/auth-form";

const AuthPage: NextPage = () => {
  return <AuthForm />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
};

export default AuthPage;
