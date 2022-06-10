/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import ManagedTooltip from "./managed-tooltip";
import Icon from "./icon";

export default function Event({ event }) {
  const [tooltipOpen, setTooltipOpen] = useState(true);

  const hideTooltip = () => setTooltipOpen(false);
  const showTooltip = () => setTooltipOpen(true);

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
          <Icon icon="Link" />
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
          {event.attachments[0] && (
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
                  <span>
                    {" "}
                    &ndash;{" "}
                    {eventEnd.toLocaleDateString(undefined, {
                      month: "long",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </span>
                )}
              </span>
            </div>
          </div>
          <div
            ref={addMouseEventHandlers}
            className="event-description"
            dangerouslySetInnerHTML={{
              __html: event.description || "No description"
            }}
          />
          <div className="event-type">
            <span>Social</span>
          </div>
        </div>
      </a>
    </ManagedTooltip>
  );
}
