import type { Resource, Operation, Color, Direction, Status } from "./types";

export const STATUSES: Record<Status, Status> = {
  inactive: "inactive",
  active: "active",
  activated: "activated",
  current: "current",
  locked: "locked",
  locked_hidden: "locked_hidden",
};

export const COLORS: Record<Color, Color> = {
  blue: "blue",
  red: "red",
  yellow: "yellow",
  purple: "purple",
  green: "green",
  orange: "orange",
  black: "black",
};

export const RESOURCES: Record<Resource, Resource> = {
  steps: "steps",
  gems: "gems",
  keys: "keys",
};

export const OPERATIONS: Record<Operation, Operation> = {
  add: "add",
  subtract: "subtract",
};

export const ROOMS = {
  antechamber: "room_20",
  entrance_hall: "room_28",
};

export const DIRECTIONS: Record<Direction, Direction> = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
};

export const LAYOUT = {
  rows: 9,
  cols: 5,
};

export const STARTING_RESOURCES: Record<Resource, number> = {
  steps: 5,
  gems: 0,
  keys: 0,
};
