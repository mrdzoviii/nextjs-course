import { Event } from "../dummy-data";

export type FetchEventsParams = {
  orderBy?: string;
  equalTo?: string | number | boolean;
};

export const fetchEvents = async (
  params: FetchEventsParams
): Promise<Event[]> => {
  const query = ["?print=pretty"];
  for (let key in params) {
    query.push(
      key === "orderBy" ? `${key}="${params[key]}"` : `${key}=${params[key]}`
    );
  }
  const queryUrl = query.join("&");
  const response = await fetch(
    `https://next-js-database-default-rtdb.europe-west1.firebasedatabase.app/events.json${queryUrl}`
  );
  const data = await response.json();
  const events = [];
  for (const key in data) {
    events.push({ id: key, ...data[key] });
  }
  return events;
};

export const fetchEvent = async (id: string): Promise<Event | undefined> => {
  const response = await fetch(
    `https://next-js-database-default-rtdb.europe-west1.firebasedatabase.app/events/${id}.json`
  );
  const data = await response.json();
  if (!data) return;
  return { id, ...data };
};

export const fetchEventsByDate = async (dateFilter: {
  year: number;
  month: number;
}): Promise<Event[]> => {
  const { year, month } = dateFilter;

  let filteredEvents = await fetchEvents({});
  return filteredEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
};
