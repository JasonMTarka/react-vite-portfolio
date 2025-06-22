export type Resource = "step" | "gem" | "key";
export type Operation = "add" | "subtract";
export type Color =
  | "blue"
  | "green"
  | "red"
  | "purple"
  | "yellow"
  | "orange"
  | "black";
export type Status =
  | "inactive"
  | "active"
  | "activated"
  | "current"
  | "locked"
  | "locked_hidden";

export type Direction = "left" | "right" | "up" | "down";

export interface Effect {
  resource: Resource;
  operation: Operation;
  amount: number;
  message: string;
}

export interface ManorData {
  [key: string]: RoomData;
}

export interface RoomData {
  status: Status;
  blueprint?: Blueprint;
  arrow?: Direction;
  up?: string;
  down?: string;
  left?: string;
  right?: string;
}

export interface Blueprint {
  name: string;
  cost: number;
  draftable: boolean;
  color: Color;
  keys?: number;
  gems?: number;
  effect?: Effect;
  message: string;
  doors: number;
  directions: Direction[];
}
