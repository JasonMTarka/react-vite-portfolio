import type { VenueData } from "./eventTypes";

const EventList = ({ venue }: { venue: VenueData }) => {
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
      <div className="event-list-title">{venue.name}</div>
      {renderEvents()}
    </div>
  );
};

export default EventList;
