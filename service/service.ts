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
