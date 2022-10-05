import Link from "next/link";
import classes from "./button.module.css";

export interface IButtonProps {
  children: JSX.Element | JSX.Element[] | string;
  link: string;
}

export default function Button({ children, link }: IButtonProps) {
  return (
    <Link href={link}>
      <a className={classes.btn}>{children}</a>
    </Link>
  );
}
