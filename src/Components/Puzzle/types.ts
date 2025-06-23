export type Resource = "steps" | "gems" | "keys";
export type Operation = "add" | "subtract";
export type RoomId = `room_${number}`;
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
  [key: RoomId]: RoomData;
}

export interface RoomData {
  status: Status;
  blueprint?: Blueprint;
  arrow?: Direction;
  up?: RoomId;
  down?: RoomId;
  left?: RoomId;
  right?: RoomId;
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
