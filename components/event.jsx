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

  const eventStart = new Date(event.start.dateTime);

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
