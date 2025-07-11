import { useEffect, useState } from "react";
import type {
  BigSightAPIResponse,
  SumidaAPIResponse,
  VenueData,
  SumidaEvent,
  EventDisplayData,
  ValidAPI,
  TokyoPublicAPIResponse,
  BigSightEvent,
} from "./eventTypes";
import EventList from "./EventList";
import { VALID_APIS } from "./eventConstants";
import "../../CSS/Events/Event.css";

const Events = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<VenueData[]>([]);

  const showError = (name = "Error Loading Events"): VenueData => {
    return {
      name: name,
      data: [
        {
          name: "Error loading events",
          explanation: "Could not load event data.",
          startDate: "",
          endDate: "",
          url: "",
        },
      ],
    };
  };

  const convertData = (response: TokyoPublicAPIResponse, api: ValidAPI) => {
    const convertedData: EventDisplayData[] = [];

    if (api === VALID_APIS.Sumida) {
      const sumidaData = response as SumidaAPIResponse;
      sumidaData.hits?.forEach((event: SumidaEvent) => {
        convertedData.push({
          name: event.イベント名,
          explanation: event.説明,
          startDate: event.開始日,
          endDate: event.終了日,
          url: event.URL,
        });
      });
    } else if (api === VALID_APIS.BigSight) {
      const bigSightData = response as BigSightAPIResponse;
      bigSightData.hits?.forEach((event: BigSightEvent) => {
        convertedData.push({
          name: event.展示会名,
          explanation: event.内容,
          startDate: event["会期(開始)"],
          endDate: event["会期(終了)"],
          url: event.URL,
        });
      });
    }
    return convertedData;
  };

  useEffect(() => {
    const fetchData = async () => {
      const LIMIT = 5;
      const venues = [
        {
          url: `https://service.api.metro.tokyo.lg.jp/api/t131075d0000000136-d97c9fdbf7d4a3ad38c0cac25c78beb3-0/json?limit=${LIMIT}`,
          name: "Sumida Ward",
          api: VALID_APIS.Sumida,
        },
        {
          url: `https://service.api.metro.tokyo.lg.jp/api/t001001d0000000001-1db9fd22025886d3d5c9607d5c24fdf0-0/json?limit=${LIMIT}`,
          name: "Tokyo Big Sight",
          api: VALID_APIS.BigSight,
        },
      ];
      try {
        const results = await Promise.allSettled(
          venues.map((venue) =>
            fetch(venue.url, {
              method: "POST",
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({}),
            })
          )
        );
        const newData = await Promise.all(
          results.map(async (result, i) => {
            if (result.status === "fulfilled" && result.value.ok) {
              try {
                const json = await result.value.json();
                return {
                  name: venues[i].name,
                  data: convertData(json, venues[i].api),
                };
              } catch (err) {
                console.log(err);
                return showError(venues[i].name);
              }
            } else {
              return showError(venues[i].name);
            }
          })
        );
        setData(newData);
      } catch (err) {
        console.log(err);
        setData([showError()]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderEventLists = () => {
    return (
      <div className="event-lists-wrapper">
        {data.map((venue, i) => {
          return <EventList key={i} venue={venue} />;
        })}
      </div>
    );
  };

  return (
    <>
      <div>
        <h1>Events in Tokyo</h1>
        <p>
          Below are lists of events which are listed on Tokyo Open Data and
          accessed through their public APIs.
        </p>
        <a
          href="https://portal.data.metro.tokyo.lg.jp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {"https://portal.data.metro.tokyo.lg.jp/"}
        </a>
      </div>
      {isLoading ? <h2>Loading...</h2> : renderEventLists()}
    </>
  );
};

export default Events;
