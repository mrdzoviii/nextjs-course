import { Event } from "../../dummy-data";
import EventItem from "./event-item";
import classes from "./event-list.module.css";

export interface IEventListProps {
  events: Event[];
}

export default function EventList({ events }: IEventListProps) {
  return (
    <ul className={classes.list}>
      {events.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          image={event.image}
          title={event.title}
          location={event.location}
          date={event.date}
        />
      ))}
    </ul>
  );
}
