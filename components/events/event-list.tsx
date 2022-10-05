import { Event } from "../../dummy-data";
import EventItem from "./event-item";

export interface IEventListProps {
  events: Event[];
}

export default function EventList({ events }: IEventListProps) {
  return (
    <ul>
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
