import type { Blueprint } from "./ManorData";

export const STATUSES = {
  inactive: "inactive",
  active: "active",
  activated: "activated",
  locked: "locked",
  locked_hidden: "locked_hidden",
};

export const ROOMS = {
  antechamber: "room_20",
  entrance_hall: "room_28",
};

export const BLUEPRINTS: Record<string, Blueprint> = {
  parlor: { name: "Parlor", cost: 0 },
  security: { name: "Security", cost: 1 },
  hallway: { name: "Hallway", cost: 1 },
  entrance_hall: { name: "Entrance Hall", cost: 0 },
  antechamber: { name: "Antechamber", cost: 0 },
};
