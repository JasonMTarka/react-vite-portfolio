import { ROOMS, STATUSES, BLUEPRINTS } from "./constants";

export interface ManorData {
  [key: string]: {
    status: string;
    blueprint?: Blueprint;
    inventory: {
      keys: number;
      gems: number;
    };
  };
}

export interface Blueprint {
  name: string;
  cost: number;
}

const setStatus = (roomId: string) => {
  // Bottom 3 rows (rows 6, 7, 8) are always inactive
  if (roomId.endsWith("6") || roomId.endsWith("7") || roomId.endsWith("8")) {
    return STATUSES.inactive;
  }
  // Next 3 rows (rows 3, 4, 5) have a 20% chance to be locked
  if (roomId.endsWith("5") || roomId.endsWith("4") || roomId.endsWith("3")) {
    return Math.random() < 0.2 ? STATUSES.locked_hidden : STATUSES.inactive;
  }
  // Next 3 rows (rows 3, 4, 5) have a 20% chance to be locked
  if (roomId.endsWith("2") || roomId.endsWith("1") || roomId.endsWith("0")) {
    return Math.random() < 0.5 ? STATUSES.locked_hidden : STATUSES.inactive;
  }
  return STATUSES.inactive;
};

const generateInventory = () => {
  // Weighted random: 0 (40%), 1 (30%), 2 (20%), 3 (10%)
  const weightedRandom = () => {
    const r = Math.random();
    if (r < 0.4) return 0;
    if (r < 0.7) return 1;
    if (r < 0.9) return 2;
    return 3;
  };
  return { keys: weightedRandom(), gems: weightedRandom() };
};

const manorData: ManorData = {};

Array.from({ length: 49 }).map((_, index) => {
  const roomId = "room_" + index.toString().padStart(2, "0");
  manorData[roomId] = {
    status: setStatus(roomId),
    inventory: generateInventory(),
  };
});

["room_18", "room_27", "room_38"].map((room) => {
  manorData[room] = {
    status: STATUSES.active,
    inventory: generateInventory(),
  };
});

manorData[ROOMS.entrance_hall] = {
  status: STATUSES.activated,
  inventory: { keys: 0, gems: 0 },
  blueprint: BLUEPRINTS.entrance_hall,
};

manorData[ROOMS.antechamber] = {
  status: STATUSES.inactive,
  inventory: { keys: 0, gems: 0 },
  blueprint: BLUEPRINTS.antechamber,
};

for (const room in manorData) {
  manorData[room].inventory = generateInventory();
}

export default manorData;
