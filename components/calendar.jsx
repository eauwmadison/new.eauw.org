import useSWR from "swr";
import Moment from "react-moment";

import siteData from "../lib/data";

import Event from "./event";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Calendar() {
  const { data, error } = useSWR(
    "https://www.googleapis.com/calendar/v3/calendars/" +
      siteData.site.google_calendar_id +
      "/events?key=" +
      siteData.site.google_calendar_read_only_api_key,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  if (data) console.log(data.items);

  const now = new Date();

  return (
    <>
      <Event event={data.items[0]} />
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
