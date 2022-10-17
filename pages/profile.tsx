import { GetServerSideProps, NextPage } from "next";

import { Session } from "next-auth";
import { getSession } from "next-auth/react";

import UserProfile from "../components/profile/user-profile";

export interface IProfilePageProps {
  session: Session;
}

const ProfilePage: NextPage<IProfilePageProps> = ({ session }) => {
  return <UserProfile />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return { props: { session } };
};

export default ProfilePage;
