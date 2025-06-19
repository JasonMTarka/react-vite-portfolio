export type Resource = "steps" | "gems" | "keys";
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

export type Direction = "←" | "→" | "↑" | "↓";

export interface Effect {
  resource: Resource;
  operation: Operation;
  amount: number;
  message: string;
}

export interface ManorData {
  [key: string]: {
    status: Status;
    blueprint?: Blueprint;
  };
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
