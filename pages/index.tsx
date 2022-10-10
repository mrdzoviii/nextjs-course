import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";
import { Event } from "../dummy-data";
import { fetchEvents } from "../service/service";

export interface IHomePageProps {
  featuredEvents: Event[];
}

const HomePage: NextPage<IHomePageProps> = ({ featuredEvents }) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="descritpion"
          content="Fina a lot of great events to evolve"
        />
      </Head>
      <NewsletterRegistration />
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
