import { COLORS, DIRECTIONS } from "./constants";
import type { Blueprint, Color, Direction } from "./types";

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

const addBlueprintProperties = (
  name: string,
  cost: number,
  draftable: boolean,
  color: Color,
  message: string,
  keys = 0,
  gems = 0,
  doors = 0
) => {
  // Returns a random array of unique arrow directions up to the number of doors (max 4),
  // but the final array is always sorted as ["left", "up", "down", "right"]
  function getArrowDirections(doors: number): Direction[] {
    const allDirections: Direction[] = [
      DIRECTIONS.left,
      DIRECTIONS.left,
      DIRECTIONS.up,
      DIRECTIONS.up,
      DIRECTIONS.up,
      DIRECTIONS.down,
      DIRECTIONS.right,
      DIRECTIONS.right,
    ];
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
  }

  const directions = getArrowDirections(doors);

  return {
    name: name,
    cost: cost,
    draftable: draftable,
    color: color,
    message: message,
    keys: keys,
    gems: gems,
    doors: doors,
    directions: directions,
  };
};

export const BLUEPRINTS: Record<string, Blueprint> = {
  parlor: addBlueprintProperties(
    "Parlor",
    0,
    true,
    COLORS.blue,
    "You find a cozy parlor with three locked chests and a wind-up key.",
    0,
    3,
    1
  ),
  security: addBlueprintProperties(
    "Security",
    1,
    true,
    COLORS.blue,
    "You find a security room with a vast array of monitors.",
    0,
    0,
    2
  ),
  hallway: addBlueprintProperties(
    "Hallway",
    0,
    true,
    COLORS.orange,
    "You enter a non-descript hallway.",
    1,
    0,
    2
  ),
  aquarium: addBlueprintProperties(
    "Aquarium",
    1,
    true,
    COLORS.blue,
    "You enter an aquarium with elaborately decorated tanks filled with colorful fish.",
    0,
    0,
    2
  ),
  bedroom: addBlueprintProperties(
    "Bedroom",
    0,
    true,
    COLORS.purple,
    "You find a quiet bedroom with a soft bed and a postcard from a town called 'Reddington' on a desk.",
    0,
    0,
    1
  ),
  billiard_room: addBlueprintProperties(
    "Billiard Room",
    0,
    true,
    COLORS.blue,
    "You stumble upon a billiard room with an odd-looking dartboard in the corner.",
    2,
    0,
    1
  ),
  boudoir: addBlueprintProperties(
    "Boudoir",
    0,
    true,
    COLORS.purple,
    "You enter a soothing boudoir with an out-of-place large, locked safe.",
    1,
    0,
    1
  ),
  chapel: addBlueprintProperties(
    "Chapel",
    0,
    true,
    COLORS.red,
    "You find yourself in a chapel with large stained glass windows of unfamiliar angels.",
    0,
    0,
    2
  ),
  closet: addBlueprintProperties(
    "Closet",
    0,
    true,
    COLORS.blue,
    "You open a closet stuffed with coats and boxes full of miscellaneous items on the ground.",
    1,
    1,
    0
  ),
  coat_check: addBlueprintProperties(
    "Coat Check",
    0,
    true,
    COLORS.blue,
    "You find yourself at a coat check, though peeking behind the counter you suspect that more than coats being kept here.",
    0,
    0,
    0
  ),
  commissary: addBlueprintProperties(
    "Commissary",
    1,
    true,
    COLORS.yellow,
    "You're surprised to find that the manor has it's own commissary for the staff.  Where are they anyway?",
    0,
    0,
    1
  ),
  corridor: addBlueprintProperties(
    "Corridor",
    0,
    true,
    COLORS.orange,
    "A long, narrow corridor.",
    0,
    0,
    1
  ),
  courtyard: addBlueprintProperties(
    "Courtyard",
    1,
    true,
    COLORS.yellow,
    "You open the door to an open courtyard with two trees and piles of dirt on the ground.",
    0,
    0,
    2
  ),
  darkroom: addBlueprintProperties(
    "Darkroom",
    0,
    true,
    COLORS.red,
    "As you enter the room, the red lights flicker out and you find yourself in utter darkness.",
    0,
    0,
    2
  ),
  den: addBlueprintProperties(
    "Den",
    0,
    true,
    COLORS.blue,
    "You feel relaxed as you enter a cozy den arrayed with clocks of all shapes and sizes with a lit fireplace. But who's keeping the fire lit?",
    0,
    1,
    2
  ),
  dining_room: addBlueprintProperties(
    "Dining Room",
    1,
    true,
    COLORS.blue,
    "You enter a room with a sturdy dining room table.",
    0,
    0,
    2
  ),
  drawing_room: addBlueprintProperties(
    "Drawing Room",
    1,
    true,
    COLORS.blue,
    "You enter a room with a high-vaulted ceiling with walls covered in drawings.  An easel stands in the middle carrying the portrait of an grandfatherly-man.",
    0,
    0,
    2
  ),
  greenhouse: addBlueprintProperties(
    "Greenhouse",
    1,
    true,
    COLORS.green,
    "You feel a rush of warm, humid air as you enter a lush greenhouse full of plants and mysterious flowers that sprout gems.",
    0,
    2,
    0
  ),
  guest_bedroom: addBlueprintProperties(
    "Guest Bedroom",
    0,
    true,
    COLORS.purple,
    "A bedroom for guests.",
    0,
    0,
    0
  ),
  kitchen: addBlueprintProperties(
    "Kitchen",
    1,
    true,
    COLORS.yellow,
    "A kitchen with modern appliances.",
    0,
    0,
    1
  ),
  laboratory: addBlueprintProperties(
    "Laboratory",
    1,
    true,
    COLORS.blue,
    "A laboratory with bubbling potions.",
    0,
    0,
    1
  ),
  lavatory: addBlueprintProperties(
    "Lavatory",
    0,
    true,
    COLORS.red,
    "A small lavatory.",
    0,
    0,
    0
  ),
  nook: addBlueprintProperties(
    "Nook",
    0,
    true,
    COLORS.blue,
    "A reading nook with a comfy chair.",
    1,
    0,
    1
  ),
  nursery: addBlueprintProperties(
    "Nursery",
    1,
    true,
    COLORS.purple,
    "A nursery with toys and a crib.",
    0,
    0,
    0
  ),
  observatory: addBlueprintProperties(
    "Observatory",
    1,
    true,
    COLORS.blue,
    "A room with a telescope for stargazing.",
    0,
    0,
    1
  ),
  office: addBlueprintProperties(
    "Office",
    2,
    true,
    COLORS.blue,
    "A quiet office with a large desk.",
    0,
    0,
    1
  ),
  pantry: addBlueprintProperties(
    "Pantry",
    0,
    true,
    COLORS.blue,
    "A pantry full of food supplies.",
    0,
    0,
    1
  ),
  passageway: addBlueprintProperties(
    "Passageway",
    2,
    true,
    COLORS.orange,
    "You find yourself at a small room with a single bookcase and several conspicously brightly colored books.  Pulling one of them reveals a hidden door behind the bookcase, painted the same color as the book you chose.",
    0,
    0,
    3
  ),
  patio: addBlueprintProperties(
    "Patio",
    1,
    true,
    COLORS.green,
    "You find a sunny patio with a grill and a small table with a gem on top.",
    0,
    1,
    1
  ),
  rumpus_room: addBlueprintProperties(
    "Rumpus Room",
    1,
    true,
    COLORS.blue,
    "You enter a colorful room full of toys, games, and a mysterious fortune-telling machine named 'Alzara'.",
    0,
    0,
    1
  ),
  spare_room: addBlueprintProperties(
    "Spare Room",
    0,
    true,
    COLORS.blue,
    "You smell paint as you enter the spare room.  It looks like they haven't decided which color to paint the walls yet.",
    0,
    0,
    1
  ),
  storeroom: addBlueprintProperties(
    "Storeroom",
    0,
    true,
    COLORS.blue,
    "You open the door and find a storeroom with a variety of odds-and-ends, including old paintings and a multitiude of boxes.  And also a shiny gem and a key.",
    1,
    1,
    0
  ),
  terrace: addBlueprintProperties(
    "Terrace",
    1,
    true,
    COLORS.green,
    "You open the door and find yourself at a terrace overlooking the exterior of the manor.",
    0,
    0,
    1
  ),
  the_pool: addBlueprintProperties(
    "The Pool",
    1,
    true,
    COLORS.blue,
    "You find a room with a small pool inside.  Are those coins at the bottom?",
    0,
    0,
    2
  ),
  utility_closet: addBlueprintProperties(
    "Utility Closet",
    0,
    true,
    COLORS.blue,
    "You find a small room with a single breaker box.  Opening it, you find switches for the Darkroom, the Garage, the Gymnasium.",
    0,
    0,
    0
  ),
  walk_in_closet: addBlueprintProperties(
    "Walk-in Closet",
    1,
    true,
    COLORS.blue,
    "You enter a walk-in closet that looks frozen in time, a deep layer of dust coating a set of keys and gems on a desk.",
    2,
    2,
    0
  ),
  east_wing_hall: addBlueprintProperties(
    "East Wing Hall",
    0,
    false,
    COLORS.orange,
    "You enter a brightly-lit hall along the east side of the house.",
    0,
    0,
    2
  ),
  west_wing_hall: addBlueprintProperties(
    "West Wing Hall",
    0,
    false,
    COLORS.orange,
    "You enter a musky hall along the western side of the manor.  It seems like no one has been here for years.",
    0,
    0,
    2
  ),
  entrance_hall: addBlueprintProperties(
    "Entrance Hall",
    0,
    false,
    COLORS.blue,
    "You've landed at a grand entrance hall with highly polished floors and three awaiting doors.",
    0,
    0,
    4
  ),
  antechamber: addBlueprintProperties(
    "Antechamber",
    0,
    false,
    COLORS.blue,
    "You've reached the fabled antechamber, a room with stark marble walls and featureless barring a single pedastal in the center with a letter: you've inherited the manor!  But looking to the north, you see a final locked door.  Is there more to come?",
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
