import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/event-search";
import { Event } from "../../dummy-data";
import { fetchEvents } from "../../service/service";

export interface IAllEventsPageProps {
  events: Event[];
}

const AllEventsPage: NextPage<IAllEventsPageProps> = ({ events }) => {
  const router = useRouter();

  const onEventsSearchHandler = (year: string, month: string) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name="descritpion"
          content="Fina a lot of great events to evolve"
        />
      </Head>
      <EventsSearch onSearch={onEventsSearchHandler} />
      <EventList events={events} />
    </>
  );
};

export const getStaticProps: GetStaticProps<IAllEventsPageProps> = async () => {
  const events = await fetchEvents({});
  return { props: { events }, revalidate: 60 };
};

export default AllEventsPage;