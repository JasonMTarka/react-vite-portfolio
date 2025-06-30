import { VALID_APIS } from "./eventConstants";
import type {
  SumidaEvent,
  ValidAPI,
  TokyoPublicAPIResponse,
  BigSightEvent,
  SumidaAPIResponse,
  BigSightAPIResponse,
  EventDisplayData,
} from "./eventTypes";

const EventList = ({
  name,
  data,
  api,
}: {
  name: string;
  data: Partial<TokyoPublicAPIResponse>;
  api: ValidAPI;
}) => {
  const renderEvents = () => {
    if (!data) {
      return null;
    }

    const finalData: EventDisplayData[] = [];

    if (api === VALID_APIS.Sumida) {
      const sumidaData = data as SumidaAPIResponse;
      sumidaData.hits?.forEach((event: SumidaEvent) => {
        finalData.push({
          name: event.イベント名,
          explanation: event.説明,
          startDate: event.開始日,
          endDate: event.終了日,
          url: event.URL,
        });
      });
    }

    if (api === VALID_APIS.BigSight) {
      const BigSightData = data as BigSightAPIResponse;
      BigSightData.hits?.forEach((event: BigSightEvent) => {
        finalData.push({
          name: event.展示会名,
          explanation: event.内容,
          startDate: event["会期(開始)"],
          endDate: event["会期(終了)"],
          url: event.URL,
        });
      });
    }

    return finalData.map((event, idx) => {
      return (
        <div className="event-card" key={idx}>
          <h2>{event.name}</h2>
          <div className="event-dates">{`${event.startDate} - ${event.endDate}`}</div>
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
      <div className="event-list-title">{name}</div>
      {renderEvents()}
    </div>
  );
};

export default EventList;
