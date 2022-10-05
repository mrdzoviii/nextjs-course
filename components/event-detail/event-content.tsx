import classes from "./event-content.module.css";

export interface IEventContentProps {
  children: React.ReactNode;
}

export default function EventContent({ children }: IEventContentProps) {
  return <section className={classes.content}>{children}</section>;
}
