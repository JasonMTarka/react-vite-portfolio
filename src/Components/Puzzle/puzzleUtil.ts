import type { Resource, Blueprint } from "./types";
import { RESOURCES } from "./constants";

export const getDay = () => {
  const storedRuns = localStorage.getItem("day");
  return storedRuns ? parseInt(storedRuns, 10) : 1;
};

export const addPlural = (count: number) => {
  return count > 1 ? "s" : "";
};

export const getExtraResourcesMessage = (
  resource: Resource,
  count: number | undefined
) => {
  return count
    ? `\nYou found ${count} extra ${resource}${addPlural(count)}!`
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
      : 0;
  return count
    ? `\nThere ${count > 1 ? "were" : "was"} ${count} ${resource}${addPlural(
        count
      )} inside the ${blueprint.name}.`
    : "";
};

export const createRoomId = (col: number, row: number) => {
  return "room_" + col.toString() + row.toString();
};

export const generateInventory = () => {
  // Weighted random: 0 (80%), 1 (15%), 2 (5%)
  const weightedRandom = () => {
    const r = Math.random();
    if (r < 0.8) return 0;
    if (r < 0.95) return 1;
    return 2;
  };
  return { genKeys: weightedRandom(), genGems: weightedRandom() };
};
