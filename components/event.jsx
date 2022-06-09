import ReactTooltip from "react-tooltip";

import Icon from "./icon";

export default function Event({ event }) {
  const eventStart = new Date(event.start.dateTime);
  const eventEnd = new Date(event.end.dateTime);

  return (
    <a
      className="event-link"
      href={event.htmlLink}
      target="_blank"
      rel="noreferrer"
      data-tip="View in Google Calendar"
    >
      <div className="event hover">
        <div className="event-header">
          <span className="event-title">{event.summary}</span>
          <div className="event-info">
            <span className="event-date">
              <Icon icon="Date" />
              {eventStart.toLocaleDateString(undefined, {
                month: "long",
                day: "numeric",
                year: "numeric"
              })}
            </span>
          </div>
        </div>
        <div className="event-description">
          {event.description || "No description"}
        </div>
        <div className="event-type">
          <span>Social</span>
        </div>
      </div>
      <ReactTooltip
        place="right"
        className="event-tooltip"
        border={true}
        getContent={(dataTip) => {
          return (
            <span className="event-tooltip-child">
              {dataTip}
              <Icon icon="Link" />
            </span>
          );
        }}
      />
    </a>
  );
}
