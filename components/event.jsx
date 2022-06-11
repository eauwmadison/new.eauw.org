/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import ManagedTooltip from "./managed-tooltip";
import Icon from "./icon";

// to check if event location is link
const isURL = (str) => {
  try {
    new URL(str);
    return true;
  } catch (e) {
    return false;
  }
};

export default function Event({ event }) {
  const [tooltipOpen, setTooltipOpen] = useState(true);

  const hideTooltip = () => setTooltipOpen(false);
  const showTooltip = () => setTooltipOpen(true);

  // for each `a` element in the event description,
  // add mouse events to show/hide the tooltip
  const addMouseEventHandlers = (el) => {
    if (!el) return;
    el.querySelectorAll("a").forEach((child) => {
      child.onmouseover = hideTooltip;
      child.onmouseout = showTooltip;
    });
  };

  const eventStart = new Date(event.start.dateTime || event.start.date);
  const eventEnd = new Date(event.end.dateTime || event.end.date);

  // add 1 day to all-day event start Date to match calendar
  if (event.start.date) {
    eventStart.setDate(eventStart.getDate() + 1);
  }

  return (
    <ManagedTooltip
      title={
        <span className="event-tooltip-child">
          View in Google Calendar
          <Icon icon="Go" />
        </span>
      }
      arrow
      followCursor
      placement="right"
      classes={{
        tooltip: "event-tooltip",
        arrow: "event-tooltip-arrow"
      }}
      disabled={!tooltipOpen}
    >
      <a
        className="event-link"
        href={event.htmlLink}
        target="_blank"
        rel="noreferrer"
        data-tip="View in Google Calendar"
      >
        <div className="event hover">
          {event.attachments[0] &&
            event.attachments[0]?.mimeType.startsWith("image/") && (
              <div className="event-image">
                <img
                  src={
                    "https://drive.google.com/uc?export=view&id=" +
                    event.attachments[0].fileId
                  }
                  alt={event.attachments[0].title}
                />
              </div>
            )}
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
                {eventStart.getDate() !== eventEnd.getDate() && (
                  <>
                    {" "}
                    &ndash;{" "}
                    {eventEnd.toLocaleDateString(undefined, {
                      month: "long",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </>
                )}
              </span>
              {event.location && (
                <span className="event-location">
                  <Icon icon={isURL(event.location) ? "Link" : "Location"} />
                  {isURL(event.location) ? (
                    <a
                      className="event-location-link"
                      href={event.location}
                      target="_blank"
                      rel="noreferrer"
                      onMouseOver={hideTooltip}
                      onMouseOut={showTooltip}
                    >
                      {event.location}
                    </a>
                  ) : (
                    event.location
                  )}
                </span>
              )}
              {event.start.dateTime && event.end.dateTime && (
                <span className="event-time">
                  <Icon icon="Time" />
                  {eventStart.toLocaleTimeString(undefined, {
                    hour: "numeric",
                    minute: "2-digit"
                  })}{" "}
                  &ndash;{" "}
                  {eventEnd.toLocaleTimeString(undefined, {
                    hour: "numeric",
                    minute: "2-digit"
                  })}
                </span>
              )}
            </div>
          </div>
          {event.description && (
            <div
              ref={addMouseEventHandlers}
              className="event-description"
              dangerouslySetInnerHTML={{
                __html: event.description
              }}
            />
          )}
          <div className="event-type">
            <span>Social</span>
          </div>
        </div>
      </a>
    </ManagedTooltip>
  );
}
