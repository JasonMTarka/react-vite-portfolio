import { ROOMS, STATUSES } from "./constants";
import { BLUEPRINTS } from "./blueprints";
import type { ManorData, RoomId } from "./types";

const setStatus = (roomId: RoomId) => {
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

const createManorData = () => {
  const manorData: ManorData = {};

  Array.from({ length: 49 }).map((_, index) => {
    if (index.toString().endsWith("9")) {
      // Don't create rooms below the 1st row
      return;
    }
    const roomId = ("room_" + index.toString().padStart(2, "0")) as RoomId;
    manorData[roomId] = {
      status: setStatus(roomId),
    };
  });

  const firstRooms: RoomId[] = ["room_18", "room_27", "room_38"];
  firstRooms.map((room) => {
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

  for (const roomId in manorData) {
    const room = manorData[roomId as RoomId];

    const [colStr, rowStr] = roomId.replace("room_", "").split("");
    const col = parseInt(colStr, 10);
    const row = parseInt(rowStr, 10);
    const directions = [
      [0, 1], // down
      [0, -1], // up
      [1, 0], // right
      [-1, 0], // left
    ];

    directions.forEach(([dc, dr], index) => {
      const nCol = col + dc;
      const nRow = row + dr;

      // Remove invalid rooms
      if (nCol < 0 || nCol >= 5) {
        return;
      }
      if (nRow >= 9 || nRow < 0) {
        return;
      }

      const neighborId = `room_${nCol}${nRow}` as RoomId;
      if (index === 0) {
        room.down = neighborId;
      }
      if (index === 1) {
        room.up = neighborId;
      }
      if (index === 2) {
        room.right = neighborId;
      }
      if (index === 3) {
        room.left = neighborId;
      }
    });
  }
  return manorData;
};

const manorData = createManorData();

export default manorData;
