import { FC } from "react";
import Link from "next/link";

import { useSession, signOut } from "next-auth/react";

import classes from "./main-navigation.module.css";

const MainNavigation: FC = () => {
  const { data: session, status } = useSession();

  const logOutHandler = () => {
    signOut({ redirect: false });
  };

  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && status !== "loading" && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logOutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
