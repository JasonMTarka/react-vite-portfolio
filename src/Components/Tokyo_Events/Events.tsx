import { useEffect, useState } from "react";
import type { SumidaAPIResponse } from "./eventTypes";
import EventList from "./EventList";
import { VALID_APIS } from "./eventConstants";
import "../../CSS/Events/Event.css";

const Events = () => {
  const [isLoading, setLoading] = useState(true);
  const [sumidaData, setSumidaData] = useState<Partial<SumidaAPIResponse>>({});
  const [bigSightData, setBigSightData] = useState<Partial<SumidaAPIResponse>>(
    {}
  );

  useEffect(() => {
    const fetchData = async () => {
      const LIMIT = 5;

      try {
        const responses = await Promise.all(
          [
            `https://service.api.metro.tokyo.lg.jp/api/t131075d0000000136-d97c9fdbf7d4a3ad38c0cac25c78beb3-0/json?limit=${LIMIT}`,
            `https://service.api.metro.tokyo.lg.jp/api/t001001d0000000001-1db9fd22025886d3d5c9607d5c24fdf0-0/json?limit=${LIMIT}`,
          ].map((url) => {
            return fetch(url, {
              method: "POST",
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({}),
            });
          })
        );

        responses.forEach(async (response, i) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          if (i === 0) {
            setSumidaData(await response.json());
          } else if (i === 1) {
            const resp = await response.json();
            setBigSightData(resp);
          }
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderEventLists = () => {
    return (
      <div className="event-lists-wrapper">
        <EventList
          name="Sumida Events"
          data={sumidaData}
          api={VALID_APIS.Sumida}
        />
        <EventList
          name="Big Sight Events"
          data={bigSightData}
          api={VALID_APIS.BigSight}
        />
      </div>
    );
  };

  return isLoading ? <h2>Loading...</h2> : renderEventLists();
};

export default Events;
