import useSWR from "swr";
import siteData from "../lib/data";

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

  return <div>hello</div>;
}
