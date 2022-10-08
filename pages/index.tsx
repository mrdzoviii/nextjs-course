import { GetStaticProps, NextPage } from "next";
import EventList from "../components/events/event-list";
import { Event } from "../dummy-data";
import { fetchEvents } from "../service/service";

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
  const featuredEvents = await fetchEvents({
    orderBy: "isFeatured",
    equalTo: true,
  });
  return { props: { featuredEvents }, revalidate: 60 * 60 * 24 };
};

export default HomePage;
