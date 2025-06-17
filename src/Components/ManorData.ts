import { STATUSES } from "./constants";

export interface ManorData {
  [key: string]: {
    status: string;
    roomType?: string;
    inventory: {
      keys: number;
      gems: number;
    };
  };
}

const generateInventory = () => {
  return { keys: 1, gems: 1 };
};

const manorData: ManorData = {};

Array.from({ length: 49 }).map((_, index) => {
  manorData["room_" + index.toString().padStart(2, "0")] = {
    status: STATUSES.inactive,
    inventory: generateInventory(),
  };
});

["room_18", "room_27", "room_38"].map((room) => {
  manorData[room] = { status: STATUSES.active, inventory: generateInventory() };
});
manorData["room_28"] = {
  status: STATUSES.activated,
  inventory: generateInventory(),
};

for (const room in manorData) {
  manorData[room].inventory = generateInventory();
}

export default manorData;
