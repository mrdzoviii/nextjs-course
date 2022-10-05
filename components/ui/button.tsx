import Link from "next/link";
import classes from "./button.module.css";

export interface IButtonProps {
  children: JSX.Element | JSX.Element[] | string;
  link?: string;
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ children, link, onClick }: IButtonProps) {
  return !!link ? (
    <Link href={link}>
      <a className={classes.btn}>{children}</a>
    </Link>
  ) : (
    <button onClick={onClick} className={classes.btn}>
      {children}
    </button>
  );
}
