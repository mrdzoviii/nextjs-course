import classes from "./event-summary.module.css";

export interface IEventSummaryProps {
  title: string;
}

export default function EventSummary({ title }: IEventSummaryProps) {
  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}
