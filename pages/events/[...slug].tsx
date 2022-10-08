import Head from "next/head";
import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/results-title/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../dummy-data";

export default function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug as string[];

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const numYear = +filterData[0];
  const numMonth = +filterData[1];

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const events = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!events || events.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the choosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <Head>
        <title>Filtered events</title>
        <meta
          name="descritpion"
          content={`All events for ${numMonth}/${numYear}`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList events={events} />
    </>
  );
}
