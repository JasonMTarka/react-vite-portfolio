import { useState } from "react";
import type { VenueData } from "./eventTypes";

const EventList = ({ venue }: { venue: VenueData }) => {
  const [collapsed, setCollapsed] = useState(false);

  const renderEvents = () => {
    return venue.data.map((event, idx) => {
      return (
        <div className="event-card" key={idx}>
          <h2>{event.name}</h2>
          <div className="event-dates">{`${event.startDate} ${
            event.startDate && event.endDate ? " - " : ""
          } ${event.endDate}`}</div>
          <p>{event.explanation}</p>
          <a href={event.url} target="_blank" rel="noopener noreferrer">
            {event.url}
          </a>
        </div>
      );
    });
  };

  return (
    <div className="event-list">
      <div
        className="venue-banner"
        onClick={() => setCollapsed((collapsed) => !collapsed)}
      >
        <span className="venue-title">{venue.name}</span>
      </div>
      {!collapsed ? renderEvents() : null}
    </div>
  );
};

export default EventList;
