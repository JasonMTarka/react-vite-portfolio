import { ROOMS, STATUSES } from "./constants";
import { BLUEPRINTS } from "./blueprints";
import type { ManorData } from "./types";

const setStatus = (roomId: string) => {
  // Bottom 3 rows (rows 6, 7, 8) are always inactive
  if (roomId.endsWith("6") || roomId.endsWith("7") || roomId.endsWith("8")) {
    return STATUSES.inactive;
  }
  // Next 3 rows (rows 3, 4, 5) have a 20% chance to be locked
  if (roomId.endsWith("5") || roomId.endsWith("4") || roomId.endsWith("3")) {
    return Math.random() < 0.2 ? STATUSES.locked_hidden : STATUSES.inactive;
  }
  // Next 3 rows (rows 3, 4, 5) have a 50% chance to be locked
  if (roomId.endsWith("2") || roomId.endsWith("1") || roomId.endsWith("0")) {
    return Math.random() < 0.5 ? STATUSES.locked_hidden : STATUSES.inactive;
  }
  return STATUSES.inactive;
};

const manorData: ManorData = {};

Array.from({ length: 49 }).map((_, index) => {
  const roomId = "room_" + index.toString().padStart(2, "0");
  manorData[roomId] = {
    status: setStatus(roomId),
  };
});

["room_18", "room_27", "room_38"].map((room) => {
  manorData[room] = {
    status: STATUSES.active,
  };
});

manorData[ROOMS.entrance_hall] = {
  status: STATUSES.activated,
  blueprint: BLUEPRINTS.entrance_hall,
};

manorData[ROOMS.antechamber] = {
  status: STATUSES.inactive,
  blueprint: BLUEPRINTS.antechamber,
};

export default manorData;
