import type {
  Resource,
  Blueprint,
  Direction,
  RoomId,
  ManorData,
} from "./puzzleTypes";
import { DIRECTIONS, RESOURCES } from "./puzzleConstants";

export const getDay = () => {
  const storedRuns = localStorage.getItem("day");
  return storedRuns ? parseInt(storedRuns, 10) : 1;
};

export const removePlural = (string: string, count: number) => {
  return count > 1 ? string : string.slice(0, -1);
};

export const getExtraResourcesMessage = (resource: Resource, count: number) => {
  return count
    ? `\nYou found ${count} extra ${removePlural(resource, count)}!`
    : "";
};

export const getFoundResourcesMessage = (
  resource: Resource,
  blueprint: Blueprint
) => {
  const count =
    resource === RESOURCES.keys
      ? blueprint.keys
      : resource === RESOURCES.gems
      ? blueprint.gems
      : resource === RESOURCES.coins
      ? blueprint.coins
      : 0;
  return count
    ? `\nThere ${count > 1 ? "were" : "was"} ${count} ${removePlural(
        resource,
        count
      )} inside the ${blueprint.name}.`
    : "";
};

export const createRoomId = (col: number, row: number): RoomId => {
  return ("room_" + col.toString() + row.toString()) as RoomId;
};

// Returns the arrow [col, row]
export const deconstructRoomId = (roomId: string) => {
  return roomId
    .replace("room_", "")
    .split("")
    .map((val) => {
      return parseInt(val, 10);
    });
};

export const generateInventory = () => {
  // Weighted random: 0 (80%), 1 (15%), 2 (5%)
  const weightedRandom = () => {
    const r = Math.random();
    if (r < 0.8) return 0;
    if (r < 0.95) return 1;
    return 2;
  };

  const weightedRandomCoins = () => {
    const r = Math.random();
    if (r < 0.5) return 0;
    if (r < 0.6) return 1;
    if (r < 0.7) return 2;
    if (r < 0.8) return 3;
    if (r < 0.9) return 4;
    if (r < 0.95) return 5;
    return 6;
  };
  return {
    genKeys: weightedRandom(),
    genGems: weightedRandom(),
    genCoins: weightedRandomCoins(),
  };
};

const _calcColRows = (roomId: RoomId, direction: Direction) => {
  const [originCol, originRow] = deconstructRoomId(roomId);
  let newCol = originCol;
  let newRow = originRow;
  if (direction === DIRECTIONS.up) {
    newRow -= 1;
  } else if (direction === DIRECTIONS.down) {
    newRow += 1;
  } else if (direction === DIRECTIONS.left) {
    newCol -= 1;
  } else if (direction === DIRECTIONS.right) {
    newCol += 1;
  }
  if (newCol < 0 || newCol > 4 || newRow < 0 || newRow > 8) {
    return [originCol, originRow];
  }
  return [newCol, newRow];
};

export const moveRooms = {
  up: (currentRoom: RoomId) => {
    const [newCol, newRow] = _calcColRows(currentRoom, DIRECTIONS.up);
    return createRoomId(newCol, newRow);
  },
  down: (currentRoom: RoomId) => {
    const [newCol, newRow] = _calcColRows(currentRoom, DIRECTIONS.down);
    return createRoomId(newCol, newRow);
  },
  left: (currentRoom: RoomId) => {
    const [newCol, newRow] = _calcColRows(currentRoom, DIRECTIONS.left);
    return createRoomId(newCol, newRow);
  },
  right: (currentRoom: RoomId) => {
    const [newCol, newRow] = _calcColRows(currentRoom, DIRECTIONS.right);
    return createRoomId(newCol, newRow);
  },
};

export const arrowDisplay = {
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
};

export const saveProgress = (
  manorState: ManorData,
  resources: Record<Resource, number>,
  currentRoomId: RoomId
) => {
  localStorage.setItem(
    "manorState",
    JSON.stringify({
      manor: manorState,
      resources: resources,
      currentRoomId: currentRoomId,
    })
  );
};
