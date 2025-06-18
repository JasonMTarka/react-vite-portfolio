import type { Resource, Operation } from "./blueprints";

export const STATUSES = {
  inactive: "inactive",
  active: "active",
  activated: "activated",
  locked: "locked",
  locked_hidden: "locked_hidden",
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

export const LAYOUT = {
  rows: 9,
  cols: 5,
};

export const STARTING_STEPS = 20;
