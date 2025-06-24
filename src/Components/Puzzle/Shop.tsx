import { useState, useEffect } from "react";
import type { RoomData, Resource, ShopOption } from "./types";
import { RESOURCES } from "./constants";

const Shop = ({
  room,
  buyCallback,
}: {
  room: RoomData;
  buyCallback: (resource: Resource, cost: number, amount: number) => void;
}) => {
  const [options, setOptions] = useState<ShopOption[]>([]);

  useEffect(() => {
    const blueprint = room.blueprint;
    if (!blueprint) {
      return;
    }

    switch (blueprint.name) {
      case "Commissary":
        setOptions([
          { resource: RESOURCES.gems, name: "gem", cost: 4, amount: 1 },
          { resource: RESOURCES.keys, name: "key", cost: 10, amount: 1 },
        ]);
        break;
      case "Kitchen":
        setOptions([
          { resource: RESOURCES.steps, name: "Banana", cost: 3, amount: 4 },
          { resource: RESOURCES.steps, name: "Cake", cost: 10, amount: 15 },
        ]);
        break;
    }
  }, [room]);

  const returnButtons = () => {
    return options.map((item, i) => {
      const buyThis = () => {
        return buyCallback(item.resource, item.cost, item.amount);
      };

      return (
        <div key={i}>
          <button className="shop-button" onClick={buyThis}>
            {`Buy 1 ${item.name} ${
              item.amount > 1 ? `(${item.amount} ${item.resource}) ` : ""
            }for ${item.cost} coins`}
          </button>
        </div>
      );
    });
  };

  return (
    <div className="shop">
      <div className="shop-title">{`Welcome to the ${room.blueprint?.name}!`}</div>
      {returnButtons()}
    </div>
  );
};

export default Shop;
