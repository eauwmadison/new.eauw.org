export default function Event({ event }) {
  const eventDate = new Date(event.start.dateTime);

  return (
    <div className="box">
      <div className="event-date">
        <span className="event-day">
          {eventDate.toLocaleString("default", {
            day: "numeric"
          })}
        </span>
        <span className="event-month">
          {eventDate.toLocaleString("default", {
            month: "short"
          })}
        </span>
      </div>
      <div className="event-info">
        <span className="event-title">{event.summary}</span>
        <span className="event-description">
          {event.description || "No description"}
        </span>
      </div>
    </div>
  );
}
