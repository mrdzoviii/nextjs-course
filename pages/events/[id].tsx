import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import ErrorAlert from "../../components/ui/error-alert";
import { Event, getEventById } from "../../dummy-data";
import { fetchEvent, fetchEvents } from "../../service/service";

export interface IEventDetailPageProps {
  event?: Event;
}

const EventDetailPage: NextPage<IEventDetailPageProps> = ({ event }) => {
  if (!event)
    return (
      <ErrorAlert>
        <p> No event found!</p>
      </ErrorAlert>
    );
  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        image={event.image}
        address={event.location}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export const getStaticProps: GetStaticProps<IEventDetailPageProps> = async (
  ctx
) => {
  const eventId = ctx.params.id as string;
  const event = await fetchEvent(eventId);
  if (!event) {
    return { props: {} };
  }
  return {
    props: {
      event,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await fetchEvents({});
  const eventPaths = events.map((event) => ({ params: { id: event.id } }));
  return {
    paths: eventPaths,
    fallback: "blocking",
  };
};

export default EventDetailPage;
