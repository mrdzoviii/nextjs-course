import { GetStaticProps, NextPage } from "next";
import EventList from "../components/events/event-list";
import { Event, getFeaturedEvents } from "../dummy-data";

export interface IHomePageProps {
  featuredEvents: Event[];
}

const HomePage: NextPage<IHomePageProps> = ({ featuredEvents }) => {
  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<IHomePageProps> = async () => {
  const response = await fetch(
    "https://next-js-database-default-rtdb.europe-west1.firebasedatabase.app/events.json?print=pretty&orderBy=%22isFeatured%22&equalTo=true"
  );
  const data = await response.json();
  const events = [];
  for (let key in data) {
    events.push({ id: key, ...data[key] });
  }
  return { props: { featuredEvents: events }, revalidate: 60 * 60 * 24 };
};

export default HomePage;
