import Link from "next/link";

import useSWR from "swr";
import Moment from "react-moment";

import siteData from "../lib/data";

import Event from "./event";

const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function Calendar() {
  const { data, error } = useSWR(
    "https://www.googleapis.com/calendar/v3/calendars/" +
      siteData.site.google_calendar_id +
      "/events?key=" +
      siteData.site.google_calendar_read_only_api_key,
    fetcher
  );

  if (error) {
    return (
      <div className="calendar-error">
        An error occurred while trying to fetch our{" "}
        <a href={siteData.site.google_calendar_share_link}>Google Calendar</a>.
        <br />
        Please <Link href="/contact">contact us</Link> to let us know.
        <div className="error">
          Error code: {error.status || "unknown"}
          <br />
          Error message: {error.info.error.message || "unknown"}
        </div>
      </div>
    );
  }
  if (!data) return <div>Loading...</div>;
  if (data) console.log(data.items);

  const now = new Date();

  return (
    <>
      <div className="events">
        <Event event={data.items[0]} />
        <Event event={data.items[1]} />
        <Event event={data.items[2]} />
      </div>
      <div className="time">
        Last updated{" "}
        <Moment fromNow interval={30000}>
          {now}
        </Moment>{" "}
        via{" "}
        <a href={siteData.site.google_calendar_share_link}>Google Calendar</a>.
      </div>
    </>
  );
}
