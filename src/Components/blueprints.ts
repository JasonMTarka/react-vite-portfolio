// import { OPERATIONS, RESOURCES } from "./constants";

export interface Blueprint {
  name: string;
  cost: number;
  draftable: boolean;
  keys?: number;
  gems?: number;
  effect?: Effect;
  message: string;
  doors: number;
  directions: string[];
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
  const draftableBlueprints = Object.values({ ...mutableBlueprintCopy }).filter(
    (bp) => bp.draftable
  );
  const zeroCostBlueprints = draftableBlueprints.filter((bp) => bp.cost === 0);

  // If there are no zero-cost blueprints, just return 3 random draftable blueprints
  if (zeroCostBlueprints.length === 0) {
    return draftableBlueprints.sort(() => 0.5 - Math.random()).slice(0, 3);
  }

  // Always include one random zero-cost blueprint
  const selectedZero =
    zeroCostBlueprints[Math.floor(Math.random() * zeroCostBlueprints.length)];
  // Shuffle the rest and pick up to 2 more (excluding the selected zero-cost blueprint)
  const rest = draftableBlueprints
    .filter((bp) => bp !== selectedZero)
    .sort(() => 0.5 - Math.random());
  return [selectedZero, ...rest.slice(0, 2)];
};

const addRoomProperties = (
  name: string,
  cost: number,
  draftable: boolean,
  message: string,
  keys = 0,
  gems = 0,
  doors = 1
) => {
  // Returns a random array of unique arrow directions up to the number of doors (max 4),
  // but the final array is always sorted as ["left", "up", "down", "right"]
  function getArrowDirections(doors: number): string[] {
    const allDirections = ["←", "↑", "↓", "→"];
    const count = Math.min(doors, 4);
    // Shuffle and pick random directions
    const shuffled = allDirections.slice().sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    // Sort the selected directions in the required order
    return allDirections.filter((dir) => selected.includes(dir));
  }

  const directions: string[] = getArrowDirections(doors);

  return {
    name: name,
    cost: cost,
    draftable: draftable,
    message: message,
    keys: keys,
    gems: gems,
    doors: doors,
    directions: directions,
  };
};

export const BLUEPRINTS: Record<string, Blueprint> = {
  parlor: addRoomProperties(
    "Parlor",
    0,
    true,
    "You find a cozy parlor with three locked chests and a wind-up key.",
    0,
    3,
    2
  ),
  security: addRoomProperties(
    "Security",
    1,
    true,
    "You find a security room with a vast array of monitors.",
    0,
    0,
    3
  ),
  hallway: addRoomProperties(
    "Hallway",
    0,
    true,
    "You enter a non-descript hallway.",
    1,
    0,
    3
  ),
  aquarium: addRoomProperties(
    "Aquarium",
    1,
    true,
    "You enter an aquarium with elaborately decorated tanks filled with colorful fish.",
    0,
    0,
    3
  ),
  bedroom: addRoomProperties(
    "Bedroom",
    0,
    true,
    "You find a quiet bedroom with a soft bed and a postcard from a town called 'Reddington' on a desk.",
    0,
    0,
    2
  ),
  billiard_room: addRoomProperties(
    "Billiard Room",
    0,
    true,
    "You stumble upon a billiard room with an odd-looking dartboard in the corner.",
    2,
    0,
    2
  ),
  boudoir: addRoomProperties(
    "Boudoir",
    0,
    true,
    "You enter a soothing boudoir with an out-of-place large, locked safe.",
    1,
    0,
    2
  ),
  chapel: addRoomProperties(
    "Chapel",
    0,
    true,
    "You find yourself in a chapel with large stained glass windows of unfamiliar angels.",
    0,
    0,
    3
  ),
  closet: addRoomProperties(
    "Closet",
    0,
    true,
    "You open a closet stuffed with coats and boxes full of miscellaneous items on the ground.",
    1,
    1,
    1
  ),
  coat_check: addRoomProperties(
    "Coat Check",
    0,
    true,
    "You find yourself at a coat check, though peeking behind the counter you spy more than coats being kept here.",
    0,
    0,
    1
  ),
  commissary: addRoomProperties(
    "Commissary",
    1,
    true,
    "You're surprised to find that the manor has it's own commissary for the staff.  Where are they anyway?",
    0,
    0,
    2
  ),
  corridor: addRoomProperties(
    "Corridor",
    0,
    true,
    "A long, narrow corridor.",
    0,
    0,
    2
  ),
  courtyard: addRoomProperties(
    "Courtyard",
    1,
    true,
    "You open the door to an open courtyard with two trees and piles of dirt on the ground.",
    0,
    0,
    3
  ),
  darkroom: addRoomProperties(
    "Darkroom",
    0,
    true,
    "As you enter the room, the red lights flicker out and you find yourself in utter darkness.",
    0,
    0,
    3
  ),
  den: addRoomProperties(
    "Den",
    0,
    true,
    "You feel relaxed as you enter a cozy den arrayed with clocks of all shapes and sizes with a lit fireplace. But who's keeping the fire lit?",
    0,
    1,
    3
  ),
  dining_room: addRoomProperties(
    "Dining Room",
    1,
    true,
    "You enter a room with a sturdy dining room table.",
    0,
    0,
    3
  ),
  drawing_room: addRoomProperties(
    "Drawing Room",
    1,
    true,
    "You enter a room with a high-vaulted ceiling with walls covered in drawings.  An easel stands in the middle carrying the portrait of an grandfatherly-man.",
    0,
    0,
    3
  ),
  greenhouse: addRoomProperties(
    "Greenhouse",
    1,
    true,
    "A lush greenhouse full of plants and mysterious flowers that sprout gems.",
    0,
    2,
    1
  ),
  guest_bedroom: addRoomProperties(
    "Guest Bedroom",
    0,
    true,
    "A bedroom for guests.",
    0,
    0,
    1
  ),
  kitchen: addRoomProperties(
    "Kitchen",
    1,
    true,
    "A kitchen with modern appliances.",
    0,
    0,
    2
  ),
  laboratory: addRoomProperties(
    "Laboratory",
    1,
    true,
    "A laboratory with bubbling potions.",
    0,
    0,
    2
  ),
  lavatory: addRoomProperties(
    "Lavatory",
    0,
    true,
    "A small lavatory.",
    0,
    0,
    1
  ),
  nook: addRoomProperties(
    "Nook",
    0,
    true,
    "A reading nook with a comfy chair.",
    1,
    0,
    2
  ),
  nursery: addRoomProperties(
    "Nursery",
    1,
    true,
    "A nursery with toys and a crib.",
    0,
    0,
    1
  ),
  observatory: addRoomProperties(
    "Observatory",
    1,
    true,
    "A room with a telescope for stargazing.",
    0,
    0,
    2
  ),
  office: addRoomProperties(
    "Office",
    2,
    true,
    "A quiet office with a large desk.",
    0,
    0,
    2
  ),
  pantry: addRoomProperties(
    "Pantry",
    0,
    true,
    "A pantry full of food supplies.",
    0,
    0,
    2
  ),
  passageway: addRoomProperties(
    "Passageway",
    2,
    true,
    "A secret passageway behind a bookshelf.",
    0,
    0,
    4
  ),
  patio: addRoomProperties(
    "Patio",
    1,
    true,
    "A sunny patio with outdoor furniture.",
    0,
    0,
    2
  ),
  rumpus_room: addRoomProperties(
    "Rumpus Room",
    1,
    true,
    "A room for games and fun.",
    0,
    0,
    2
  ),
  spare_room: addRoomProperties(
    "Spare Room",
    0,
    true,
    "An empty spare room.",
    0,
    0,
    2
  ),
  storeroom: addRoomProperties(
    "Storeroom",
    0,
    true,
    "A storeroom packed with boxes.",
    1,
    1,
    1
  ),
  terrace: addRoomProperties(
    "Terrace",
    1,
    true,
    "A terrace with a beautiful view.",
    0,
    0,
    2
  ),
  the_pool: addRoomProperties(
    "The Pool",
    1,
    true,
    "An indoor pool with clear water.",
    0,
    0,
    3
  ),
  utility_closet: addRoomProperties(
    "Utility Closet",
    0,
    true,
    "A closet with cleaning supplies.",
    0,
    0,
    1
  ),
  walk_in_closet: addRoomProperties(
    "Walk-in Closet",
    1,
    true,
    "A spacious walk-in closet.",
    2,
    2,
    1
  ),
  east_wing_hall: addRoomProperties(
    "East Wing Hall",
    0,
    false,
    "A hallway in the east wing.",
    0,
    0,
    3
  ),
  west_wing_hall: addRoomProperties(
    "West Wing Hall",
    0,
    false,
    "A hallway in the west wing.",
    0,
    0,
    3
  ),
  entrance_hall: addRoomProperties(
    "Entrance Hall",
    0,
    false,
    "The grand entrance hall.",
    0,
    0,
    4
  ),
  antechamber: addRoomProperties(
    "Antechamber",
    0,
    false,
    "The final antechamber.",
    0,
    0,
    4
  ),
};

export const resetBlueprints = () => {
  mutableBlueprintCopy = JSON.parse(JSON.stringify({ ...BLUEPRINTS }));
};

let mutableBlueprintCopy: Record<string, Blueprint> = JSON.parse(
  JSON.stringify({ ...BLUEPRINTS })
);
