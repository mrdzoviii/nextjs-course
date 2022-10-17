import { FC } from "react";

import ProfileForm from "./profile-form";

import classes from "./user-profile.module.css";

const UserProfile: FC = () => {
  // const router = useRouter();
  // const { data: session, status } = useSession();

  // // Redirect away if NOT auth
  // if (status === "loading") {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  // if (!session) {
  //   router.replace("/auth");
  // }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
