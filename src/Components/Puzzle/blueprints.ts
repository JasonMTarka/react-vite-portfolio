import { COLORS, DIRECTIONS, REVERSED_DIRECTIONS } from "./constants";
import type { Blueprint, Direction } from "./types";

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

// Returns a random array of unique arrow directions up to the number of doors (max 4),
// but the final array is always sorted as ["left", "up", "down", "right"]
export const getDoorDirections = (
  doors: number,
  draftingDir: Direction
): Direction[] => {
  // Filter out the opposite of drafting direction so door does not loop back into itself
  // Include multiples for adding weight
  const allDirections: Direction[] = [
    DIRECTIONS.left,
    DIRECTIONS.left,
    DIRECTIONS.up,
    DIRECTIONS.up,
    DIRECTIONS.up,
    DIRECTIONS.down,
    DIRECTIONS.right,
    DIRECTIONS.right,
  ].filter((dir) => dir !== REVERSED_DIRECTIONS[draftingDir]);
  const count = Math.min(doors, 4);
  // Shuffle and pick random directions
  const shuffled = allDirections.slice().sort(() => 0.5 - Math.random());
  // Remove duplicates while preserving order
  const selected: Direction[] = [];
  for (const dir of shuffled) {
    if (!selected.includes(dir) && selected.length < count) {
      selected.push(dir);
    }
  }
  // Sort the selected directions in the required order
  return [
    DIRECTIONS.left,
    DIRECTIONS.up,
    DIRECTIONS.down,
    DIRECTIONS.right,
  ].filter((dir) => selected.includes(dir));
};

export const BLUEPRINTS: Record<string, Blueprint> = {
  parlor: {
    name: "Parlor",
    cost: 0,
    draftable: true,
    color: COLORS.blue,
    message:
      "You find a cozy parlor with three locked chests and a wind-up key.",
    keys: 0,
    gems: 2,
    doors: 1,
    directions: [],
    coins: 0,
  },
  security: {
    name: "Security",
    cost: 1,
    draftable: true,
    color: COLORS.blue,
    message: "You find a security room with a vast array of monitors.",
    keys: 1,
    gems: 0,
    doors: 2,
    directions: [],
    coins: 0,
  },
  hallway: {
    name: "Hallway",
    cost: 0,
    draftable: true,
    color: COLORS.orange,
    message: "You enter a non-descript hallway.",
    keys: 1,
    gems: 0,
    doors: 2,
    directions: [],
    coins: 0,
  },
  aquarium: {
    name: "Aquarium",
    cost: 1,
    draftable: true,
    color: COLORS.blue,
    message:
      "You enter an aquarium with elaborately decorated tanks filled with colorful fish.",
    keys: 0,
    gems: 0,
    doors: 2,
    directions: [],
    coins: 0,
  },
  bedroom: {
    name: "Bedroom",
    cost: 0,
    draftable: true,
    color: COLORS.purple,
    message:
      "You find a quiet bedroom with a soft bed and a postcard from a town called 'Reddington' on a desk.",
    keys: 0,
    gems: 1,
    doors: 1,
    directions: [],
    coins: 0,
  },
  billiard_room: {
    name: "Billiard Room",
    cost: 0,
    draftable: true,
    color: COLORS.blue,
    message:
      "You stumble upon a billiard room with an odd-looking dartboard in the corner.",
    keys: 1,
    gems: 0,
    doors: 1,
    directions: [],
    coins: 0,
  },
  boudoir: {
    name: "Boudoir",
    cost: 0,
    draftable: true,
    color: COLORS.purple,
    message:
      "You enter a soothing boudoir with an out-of-place large, locked safe.",
    keys: 0,
    gems: 1,
    doors: 1,
    directions: [],
    coins: 0,
  },
  chapel: {
    name: "Chapel",
    cost: 0,
    draftable: true,
    color: COLORS.red,
    message:
      "You find yourself in a chapel with large stained glass windows of unfamiliar angels.",
    keys: 0,
    gems: 0,
    doors: 2,
    directions: [],
    coins: 4,
  },
  closet: {
    name: "Closet",
    cost: 0,
    draftable: true,
    color: COLORS.blue,
    message:
      "You open a closet stuffed with coats and boxes full of miscellaneous items on the ground.",
    keys: 1,
    gems: 1,
    doors: 0,
    directions: [],
    coins: 2,
  },
  coat_check: {
    name: "Coat Check",
    cost: 0,
    draftable: true,
    color: COLORS.blue,
    message:
      "You find yourself at a coat check, though peeking behind the counter you suspect that more than coats being kept here.",
    keys: 2,
    gems: 0,
    doors: 0,
    directions: [],
    coins: 0,
  },
  commissary: {
    name: "Commissary",
    cost: 1,
    draftable: true,
    color: COLORS.yellow,
    message:
      "You're surprised to find that the manor has it's own commissary for the staff.  Where are they anyway?",
    keys: 0,
    gems: 2,
    doors: 1,
    directions: [],
    coins: 0,
  },
  corridor: {
    name: "Corridor",
    cost: 0,
    draftable: true,
    color: COLORS.orange,
    message: "A long, narrow corridor.",
    keys: 1,
    gems: 0,
    doors: 1,
    directions: [],
    coins: 0,
  },
  courtyard: {
    name: "Courtyard",
    cost: 1,
    draftable: true,
    color: COLORS.green,
    message:
      "You open the door to an open courtyard with two trees and piles of dirt on the ground.",
    keys: 0,
    gems: 0,
    doors: 2,
    directions: [],
    coins: 0,
  },
  darkroom: {
    name: "Darkroom",
    cost: 0,
    draftable: true,
    color: COLORS.red,
    message:
      "As you enter the room, the red lights flicker out and you find yourself in utter darkness.",
    keys: 0,
    gems: 0,
    doors: 2,
    directions: [],
    coins: 0,
  },
  den: {
    name: "Den",
    cost: 0,
    draftable: true,
    color: COLORS.blue,
    message:
      "You feel relaxed as you enter a cozy den arrayed with clocks of all shapes and sizes with a lit fireplace. But who's keeping the fire lit?",
    keys: 0,
    gems: 1,
    doors: 2,
    directions: [],
    coins: 0,
  },
  dining_room: {
    name: "Dining Room",
    cost: 1,
    draftable: true,
    color: COLORS.blue,
    message: "You enter a room with a sturdy dining room table.",
    keys: 0,
    gems: 0,
    doors: 2,
    directions: [],
    coins: 0,
  },
  drawing_room: {
    name: "Drawing Room",
    cost: 1,
    draftable: true,
    color: COLORS.blue,
    message:
      "You enter a room with a high-vaulted ceiling with walls covered in drawings.  An easel stands in the middle carrying the portrait of an grandfatherly-man.",
    keys: 0,
    gems: 0,
    doors: 2,
    directions: [],
    coins: 0,
  },
  greenhouse: {
    name: "Greenhouse",
    cost: 1,
    draftable: true,
    color: COLORS.green,
    message:
      "You feel a rush of warm, humid air as you enter a lush greenhouse full of plants and mysterious flowers that sprout gems.",
    keys: 0,
    gems: 2,
    doors: 0,
    directions: [],
    coins: 0,
  },
  guest_bedroom: {
    name: "Guest Bedroom",
    cost: 0,
    draftable: true,
    color: COLORS.purple,
    message: "A bedroom for guests.",
    keys: 0,
    gems: 1,
    doors: 0,
    directions: [],
    coins: 0,
  },
  kitchen: {
    name: "Kitchen",
    cost: 1,
    draftable: true,
    color: COLORS.yellow,
    message: "A kitchen with modern appliances.",
    keys: 1,
    gems: 0,
    doors: 1,
    directions: [],
    coins: 0,
  },
  laboratory: {
    name: "Laboratory",
    cost: 1,
    draftable: true,
    color: COLORS.blue,
    message: "A laboratory with bubbling potions.",
    keys: 0,
    gems: 1,
    doors: 1,
    directions: [],
    coins: 0,
  },
  lavatory: {
    name: "Lavatory",
    cost: 0,
    draftable: true,
    color: COLORS.red,
    message: "A small lavatory.",
    keys: 0,
    gems: 0,
    doors: 0,
    directions: [],
    coins: 0,
  },
  nook: {
    name: "Nook",
    cost: 0,
    draftable: true,
    color: COLORS.blue,
    message: "A reading nook with a comfy chair.",
    keys: 1,
    gems: 0,
    doors: 1,
    directions: [],
    coins: 0,
  },
  nursery: {
    name: "Nursery",
    cost: 1,
    draftable: true,
    color: COLORS.purple,
    message: "A nursery with toys and a crib.",
    keys: 0,
    gems: 2,
    doors: 0,
    directions: [],
    coins: 0,
  },
  observatory: {
    name: "Observatory",
    cost: 1,
    draftable: true,
    color: COLORS.blue,
    message: "A room with a telescope for stargazing.",
    keys: 0,
    gems: 1,
    doors: 1,
    directions: [],
    coins: 0,
  },
  office: {
    name: "Office",
    cost: 2,
    draftable: true,
    color: COLORS.blue,
    message: "A quiet office with a large desk.",
    keys: 1,
    gems: 0,
    doors: 1,
    directions: [],
    coins: 4,
  },
  pantry: {
    name: "Pantry",
    cost: 0,
    draftable: true,
    color: COLORS.blue,
    message: "A pantry full of food supplies.",
    keys: 1,
    gems: 0,
    doors: 1,
    directions: [],
    coins: 4,
  },
  passageway: {
    name: "Passageway",
    cost: 2,
    draftable: true,
    color: COLORS.orange,
    message:
      "You find yourself at a central passageway used by manor staff to move around quickly.  You find doors in all directions.",
    keys: 0,
    gems: 0,
    doors: 3,
    directions: [],
    coins: 0,
  },
  secretPassage: {
    name: "Secret Passage",
    cost: 1,
    draftable: true,
    color: COLORS.orange,
    message:
      "You find yourself at a small room with a single bookcase and several conspicously brightly colored books.  Pulling one of them reveals a hidden door behind the bookcase, painted the same color as the book you chose.",
    keys: 1,
    gems: 0,
    doors: 1,
    directions: [],
    coins: 0,
  },
  patio: {
    name: "Patio",
    cost: 1,
    draftable: true,
    color: COLORS.green,
    message:
      "You find a sunny patio with a grill and a small table with a gem on top.",
    keys: 0,
    gems: 1,
    doors: 1,
    directions: [],
    coins: 0,
  },
  rumpus_room: {
    name: "Rumpus Room",
    cost: 1,
    draftable: true,
    color: COLORS.blue,
    message:
      "You enter a colorful room full of toys, games, and a mysterious fortune-telling machine named 'Alzara'.",
    keys: 0,
    gems: 1,
    doors: 1,
    directions: [],
    coins: 8,
  },
  spare_room: {
    name: "Spare Room",
    cost: 0,
    draftable: true,
    color: COLORS.blue,
    message:
      "You smell paint as you enter the spare room.  It looks like they haven't decided which color to paint the walls yet.",
    keys: 0,
    gems: 0,
    doors: 1,
    directions: [],
    coins: 0,
  },
  storeroom: {
    name: "Storeroom",
    cost: 0,
    draftable: true,
    color: COLORS.blue,
    message:
      "You open the door and find a storeroom with a variety of odds-and-ends, including old paintings and a multitiude of boxes.  And also a shiny gem and a key.",
    keys: 1,
    gems: 1,
    doors: 0,
    directions: [],
    coins: 2,
  },
  terrace: {
    name: "Terrace",
    cost: 1,
    draftable: true,
    color: COLORS.green,
    message:
      "You open the door and find yourself at a terrace overlooking the exterior of the manor.",
    keys: 0,
    gems: 1,
    doors: 1,
    directions: [],
    coins: 0,
  },
  the_pool: {
    name: "The Pool",
    cost: 1,
    draftable: true,
    color: COLORS.blue,
    message:
      "You find a room with a small pool inside.  Are those coins at the bottom?",
    keys: 0,
    gems: 0,
    doors: 2,
    directions: [],
    coins: 4,
  },
  utility_closet: {
    name: "Utility Closet",
    cost: 0,
    draftable: true,
    color: COLORS.blue,
    message:
      "You find a small room with a single breaker box.  Opening it, you find switches for the Darkroom, the Garage, the Gymnasium.",
    keys: 1,
    gems: 0,
    doors: 0,
    directions: [],
    coins: 0,
  },
  walk_in_closet: {
    name: "Walk-in Closet",
    cost: 1,
    draftable: true,
    color: COLORS.blue,
    message:
      "You enter a walk-in closet that looks frozen in time, a deep layer of dust coating a set of keys and gems on a desk.",
    keys: 2,
    gems: 2,
    doors: 0,
    directions: [],
    coins: 4,
  },
  east_wing_hall: {
    name: "East Wing Hall",
    cost: 0,
    draftable: false,
    color: COLORS.orange,
    message: "You enter a brightly-lit hall along the east side of the house.",
    keys: 0,
    gems: 0,
    doors: 2,
    directions: [],
    coins: 0,
  },
  west_wing_hall: {
    name: "West Wing Hall",
    cost: 0,
    draftable: false,
    color: COLORS.orange,
    message:
      "You enter a musky hall along the western side of the manor.  It seems like no one has been here for years.",
    keys: 0,
    gems: 0,
    doors: 2,
    directions: [],
    coins: 0,
  },
  entrance_hall: {
    name: "Entrance Hall",
    cost: 0,
    draftable: false,
    color: COLORS.blue,
    message:
      "You've landed at a grand entrance hall with highly polished floors and three awaiting doors.",
    keys: 0,
    gems: 0,
    doors: 4,
    directions: Object.keys(DIRECTIONS) as Direction[],
    coins: 0,
  },
  antechamber: {
    name: "Antechamber",
    cost: 0,
    draftable: false,
    color: COLORS.blue,
    message:
      "You've reached the fabled antechamber, a room with stark marble walls and featureless barring a single pedastal in the center with a letter: you've inherited the manor!  But looking to the north, you see a final locked door.  Is there more to come?",
    keys: 0,
    gems: 0,
    doors: 4,
    directions: Object.keys(DIRECTIONS) as Direction[],
    coins: 0,
  },
};

export const resetBlueprints = () => {
  mutableBlueprintCopy = JSON.parse(JSON.stringify({ ...BLUEPRINTS }));
};

let mutableBlueprintCopy: Record<string, Blueprint> = JSON.parse(
  JSON.stringify({ ...BLUEPRINTS })
);
