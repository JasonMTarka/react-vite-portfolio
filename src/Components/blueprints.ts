// import { OPERATIONS, RESOURCES } from "./constants";

export interface Blueprint {
  name: string;
  cost: number;
  draftable: boolean;
  keys?: number;
  gems?: number;
  effect?: Effect;
  message: string;
}

export type Resource = "steps" | "gems" | "keys";
export type Operation = "add" | "subtract";

export interface Effect {
  resource: Resource;
  operation: Operation;
  amount: number;
  message: string;
}

export const getRandomBlueprints = (): Blueprint[] => {
  // Only include draftable blueprints
  const draftableKeys = Object.keys(BLUEPRINTS).filter(
    (key) => BLUEPRINTS[key].draftable
  );
  const draftableBlueprints = draftableKeys.map((key) => BLUEPRINTS[key]);
  const shuffled = draftableBlueprints.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

// const addEffect = (
//   resource: Resource,
//   operation: Operation,
//   amount: number,
//   message: string
// ) => {
//   return {
//     resource: resource,
//     operation: operation,
//     amount: amount,
//     message: message,
//   };
// };

const addRoomProperties = (
  name: string,
  cost: number,
  draftable: boolean,
  message: string,
  keys = 0,
  gems = 0
) => {
  return {
    name: name,
    cost: cost,
    draftable: draftable,
    message: message,
    keys: keys,
    gems: gems,
  };
};

export const BLUEPRINTS: Record<string, Blueprint> = {
  parlor: addRoomProperties(
    "Parlor",
    0,
    true,
    "You find a cozy parlor with three locked chests and a wind-up key.",
    0,
    3
  ),
  security: addRoomProperties(
    "Security",
    1,
    true,
    "You find a security room with a vast array of monitors."
  ),
  hallway: addRoomProperties(
    "Hallway",
    0,
    true,
    "You enter a non-descript hallway.",
    1
  ),
  aquarium: addRoomProperties(
    "Aquarium",
    1,
    true,
    "You enter an aquarium with elaborately decorated tanks filled with colorful fish."
  ),
  bedroom: addRoomProperties(
    "Bedroom",
    0,
    true,
    "You find a quiet bedroom with a soft bed and a postcard from a town called 'Reddington' on a desk."
  ),
  billiard_room: addRoomProperties(
    "Billiard Room",
    0,
    true,
    "You stumble upon a billiard room with an odd-looking dartboard in the corner.",
    2
  ),
  boudoir: addRoomProperties(
    "Boudoir",
    0,
    true,
    "You enter a soothing boudoir with an out-of-place large, locked safe.",
    1
  ),
  chapel: addRoomProperties(
    "Chapel",
    0,
    true,
    "You find yourself in a chapel with large stained glass windows of unfamiliar angels."
  ),
  closet: addRoomProperties(
    "Closet",
    0,
    true,
    "You open a closet stuffed with coats and boxes full of miscellaneous items on the ground.",
    1,
    1
  ),
  coat_check: addRoomProperties(
    "Coat Check",
    0,
    true,
    "You find yourself at a coat check, though peeking behind the counter you spy more than coats being kept here."
  ),
  commissary: addRoomProperties(
    "Commissary",
    1,
    true,
    "You're surprised to find that the manor has it's own commissary for the staff.  Where are they anyway?"
  ),
  corridor: addRoomProperties("Corridor", 0, true, "A long, narrow corridor."),
  courtyard: addRoomProperties(
    "Courtyard",
    1,
    true,
    "You open the door to an open courtyard with two trees and piles of dirt on the ground."
  ),
  darkroom: addRoomProperties(
    "Darkroom",
    0,
    true,
    "As you enter the room, the red lights flicker out and you find yourself in utter darkness."
  ),
  den: addRoomProperties(
    "Den",
    0,
    true,
    "You feel relaxed as you enter a cozy den arrayed with clocks of all shapes and sizes with a lit fireplace. But who's keeping the fire lit?",
    0,
    1
  ),
  dining_room: addRoomProperties(
    "Dining Room",
    1,
    true,
    "You enter a room with a sturdy dining room table."
  ),
  drawing_room: addRoomProperties(
    "Drawing Room",
    1,
    true,
    "You enter a room with a high-vaulted ceiling with walls covered in drawings.  An easel stands in the middle carrying the portrait of an grandfatherly-man."
  ),
  greenhouse: addRoomProperties(
    "Greenhouse",
    1,
    true,
    "A lush greenhouse full of plants and mysterious flowers that sprout gems.",
    0,
    2
  ),
  guest_bedroom: addRoomProperties(
    "Guest Bedroom",
    0,
    true,
    "A bedroom for guests."
  ),
  kitchen: addRoomProperties(
    "Kitchen",
    1,
    true,
    "A kitchen with modern appliances."
  ),
  laboratory: addRoomProperties(
    "Laboratory",
    1,
    true,
    "A laboratory with bubbling potions."
  ),
  lavatory: addRoomProperties("Lavatory", 0, true, "A small lavatory."),
  nook: addRoomProperties(
    "Nook",
    0,
    true,
    "A reading nook with a comfy chair.",
    1
  ),
  nursery: addRoomProperties(
    "Nursery",
    1,
    true,
    "A nursery with toys and a crib."
  ),
  observatory: addRoomProperties(
    "Observatory",
    1,
    true,
    "A room with a telescope for stargazing."
  ),
  office: addRoomProperties(
    "Office",
    2,
    true,
    "A quiet office with a large desk."
  ),
  pantry: addRoomProperties(
    "Pantry",
    0,
    true,
    "A pantry full of food supplies."
  ),
  passageway: addRoomProperties(
    "Passageway",
    2,
    true,
    "A secret passageway behind a bookshelf."
  ),
  patio: addRoomProperties(
    "Patio",
    1,
    true,
    "A sunny patio with outdoor furniture."
  ),
  rumpus_room: addRoomProperties(
    "Rumpus Room",
    1,
    true,
    "A room for games and fun."
  ),
  spare_room: addRoomProperties("Spare Room", 0, true, "An empty spare room."),
  storeroom: addRoomProperties(
    "Storeroom",
    0,
    true,
    "A storeroom packed with boxes.",
    1,
    1
  ),
  terrace: addRoomProperties(
    "Terrace",
    1,
    true,
    "A terrace with a beautiful view."
  ),
  the_pool: addRoomProperties(
    "The Pool",
    1,
    true,
    "An indoor pool with clear water."
  ),
  utility_closet: addRoomProperties(
    "Utility Closet",
    0,
    true,
    "A closet with cleaning supplies."
  ),
  walk_in_closet: addRoomProperties(
    "Walk-in Closet",
    1,
    true,
    "A spacious walk-in closet.",
    2,
    2
  ),
  east_wing_hall: addRoomProperties(
    "East Wing Hall",
    0,
    false,
    "A hallway in the east wing."
  ),
  west_wing_hall: addRoomProperties(
    "West Wing Hall",
    0,
    false,
    "A hallway in the west wing."
  ),
  entrance_hall: addRoomProperties(
    "Entrance Hall",
    0,
    false,
    "The grand entrance hall."
  ),
  antechamber: addRoomProperties(
    "Antechamber",
    0,
    false,
    "The final antechamber."
  ),
};
