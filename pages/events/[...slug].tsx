import { GetServerSideProps, NextPage } from "next";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/results-title/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { Event, getFilteredEvents } from "../../dummy-data";
import { fetchEventsByDate } from "../../service/service";

export interface IFilteredEventsPageProps {
  events?: Event[];
  date?: number;
}

const FilteredEventsPage: NextPage<IFilteredEventsPageProps> = ({
  events,
  date,
}) => {
  if (!events && !date) {
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

  return (
    <>
      <ResultsTitle date={new Date(date)} />
      <EventList events={events} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  IFilteredEventsPageProps
> = async (ctx) => {
  const params = ctx.params.slug;
  const year = +params[0];
  const month = +params[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return { props: {} };
  }
  const events = await fetchEventsByDate({ year, month });
  const date = new Date(year, month - 1).getTime();
  return {
    props: {
      events,
      date,
    },
  };
};

export default FilteredEventsPage;
