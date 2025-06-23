import "../../CSS/Puzzle/Puzzle.css";
import React, { useCallback, useEffect, useState } from "react";
import Room from "./Room";
import manorData from "./manorData";
import {
  STATUSES,
  ROOMS,
  LAYOUT,
  RESOURCES,
  DIRECTIONS,
  STARTING_RESOURCES,
} from "./constants";
import { getRandomBlueprints, resetBlueprints } from "./blueprints";
import ChoiceBox from "./ChoiceBox";
import type { Blueprint, Direction, ManorData } from "./types";
import {
  getDay,
  getExtraResourcesMessage,
  getFoundResourcesMessage,
  createRoomId,
  generateInventory,
  moveRooms,
  reversedDirections,
} from "./puzzleUtil";
import ResourceDisplay from "./ResourceDisplay";
import ResetButton from "./ResetButton";
import MessageDisplay from "./MessageDisplay";

const startingState = JSON.stringify(manorData);

const Puzzle: React.FC = () => {
  const [message, setMessage] = useState([
    "Use the WASD or arrow keys to move to an active room.",
  ]);

  const [manorState, setManorState] = useState<ManorData>({ ...manorData });
  const [resources, setResources] = useState(STARTING_RESOURCES);

  const [choices, setChoices] = useState<Blueprint[]>([]);
  const [choicesActive, setChoicesActive] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(ROOMS.entrance_hall);
  const [openingRoom, setOpeningRoom] = useState("");
  const [draftingDir, setDraftingDir] = useState<Direction | undefined>(
    undefined
  );
  const [isFrozen, setIsFrozen] = useState(false);
  const [victory, setVictory] = useState(false);
  const [resetActive, setResetBtnHighlight] = useState(false);

  const [day, setDay] = useState(getDay());

  useEffect(() => {
    const savedData = localStorage.getItem("manorState");
    if (savedData) {
      setManorState(JSON.parse(savedData));
    }
  }, []);

  const activateSurroundingRooms = useCallback(
    (roomId: string) => {
      const newManorState = { ...manorState };
      const directions = manorState[roomId].blueprint?.directions;

      if (!directions) {
        return;
      }
      for (const direction of directions) {
        const neighborId = newManorState[roomId][direction];
        if (!neighborId) {
          continue;
        }
        const neighborStatus = newManorState[neighborId].status;
        if (neighborStatus === STATUSES.locked_hidden) {
          newManorState[neighborId].status = STATUSES.locked;
        } else if (neighborStatus === STATUSES.inactive) {
          newManorState[neighborId].status = STATUSES.active;
        }
      }
      newManorState[roomId].status = STATUSES.activated;
      setManorState(newManorState);
    },
    [manorState]
  );

  const saveNewManorState = useCallback(
    (
      roomId: string,
      property: string,
      // eslint-disable-next-line
      newVal: any
    ) => {
      const newManorState = { ...manorState };
      // @ts-expect-error: Used to help avoid repetition when saving state
      newManorState[roomId][property] = newVal;
      setManorState(newManorState);
    },
    [manorState]
  );

  const updateRoomStatus = useCallback(
    (roomId: string, newStatus: string) => {
      saveNewManorState(roomId, "status", newStatus);
      if (newStatus === STATUSES.activated) {
        activateSurroundingRooms(roomId);
      }
      if (newStatus === STATUSES.activated && roomId === ROOMS.antechamber) {
        setVictory(true);
      }
    },
    [activateSurroundingRooms, saveNewManorState]
  );

  const openRoom = useCallback(
    (roomId: string, direction: Direction) => {
      const goToChoice = () => {
        setIsFrozen(true);
        setChoicesActive(true);
        setDraftingDir(direction);
        setOpeningRoom(roomId);
        setChoices(getRandomBlueprints());
      };

      const status = manorState[roomId].status;

      // Skip drafting when going to Antechamber
      if (status === STATUSES.active && roomId === ROOMS.antechamber) {
        updateRoomStatus(ROOMS.antechamber, STATUSES.activated);
        return;
      }

      // Begin drafting if unlocked
      if (status === STATUSES.active) {
        saveNewManorState(roomId, "status", STATUSES.current);
        setMessage(["Select a room to place:"]);
        goToChoice();
        return;
      }

      // Begin drafting if locked and have a key, or else reject if no keys
      if (status === STATUSES.locked) {
        if (!resources.keys) {
          setMessage(["You don't have any keys!"]);
          return;
        }
        setMessage([
          "You used a key to unlock this room.",
          "Select a room to place:",
        ]);
        setResources(() => {
          const newResources = { ...resources };
          newResources.keys -= 1;
          return newResources;
        });
        saveNewManorState(roomId, "status", STATUSES.current);
        goToChoice();
        return;
      }
    },
    [resources, manorState, saveNewManorState, updateRoomStatus]
  );

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      // Prevent movement while frozen
      if (isFrozen) {
        if (choicesActive) {
          setMessage(["You need to choose a blueprint before you can move."]);
        }
        return;
      }

      // Check the next room to see if it's a valid movement
      const checkNextRoom = (direction: Direction) => {
        const nextRoomId = moveRooms[direction](currentRoomId);
        if (nextRoomId === currentRoomId) {
          return;
        }
        // Block movement if no door
        if (
          !manorState[currentRoomId].blueprint?.directions.includes(direction)
        ) {
          setMessage(["There's no door there!"]);
          return;
        }

        // If valid movement
        switch (manorState[nextRoomId].status) {
          // If existing room, move to and subtract a step
          case STATUSES.activated:
            setCurrentRoomId(nextRoomId);
            setResources(() => {
              const newResources = { ...resources };
              newResources.steps -= 1;
              return newResources;
            });
            setMessage([
              "Use the WASD or arrow keys to move to an active room.",
            ]);
            break;
          // If opening new room
          case STATUSES.active:
          case STATUSES.locked:
            openRoom(nextRoomId, direction);
        }
      };

      switch (event.key) {
        case "ArrowUp":
        case "w":
          checkNextRoom(DIRECTIONS.up);
          break;
        case "ArrowDown":
        case "s":
          checkNextRoom(DIRECTIONS.down);
          break;
        case "ArrowLeft":
        case "a":
          checkNextRoom(DIRECTIONS.left);
          break;
        case "ArrowRight":
        case "d":
          checkNextRoom(DIRECTIONS.right);
          break;
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [currentRoomId, isFrozen, manorState, resources, openRoom, choicesActive]);

  useEffect(() => {
    if (victory) {
      setMessage([
        "You've reached the fabled Antechamber, a room with stark marble walls and featureless barring a single pedastal in the center with a letter: you've inherited the manor!  But looking to the north, you see a final locked door.  Is there more to come?",
        "　",
        "Press the 'Reset Manor' button to play again.",
      ]);
      setResetBtnHighlight(true);
    }
  }, [victory]);

  useEffect(() => {
    if (!resources.steps) {
      setMessage([
        "You ran out of steps!",
        "Press the clear button to try again.",
      ]);
      setIsFrozen(true);
      setResetBtnHighlight(true);
    }
  }, [resources]);

  // Set arrow display on surrounding rooms when drafting
  const highlightSurroundingRooms = (
    roomId: string,
    choiceBlueprint: Blueprint
  ) => {
    if (!choiceBlueprint) {
      return;
    }
    const newManorState = { ...manorState };
    const currentRoomIdInfo = newManorState[roomId];
    const directions = choiceBlueprint.directions;
    if (directions) {
      directions.forEach((direction) => {
        if (!direction) {
          return;
        }
        if (!currentRoomIdInfo[direction]) return;
        const neighborStatus =
          newManorState[currentRoomIdInfo[direction]].status;
        if (
          neighborStatus === STATUSES.inactive ||
          neighborStatus === STATUSES.locked_hidden
        ) {
          newManorState[currentRoomIdInfo[direction]].arrow = direction;
        }
      });
    }
    setManorState(newManorState);
  };

  // Remove arrow display when mouse off
  const removeArrows = (roomId: string) => {
    if (!roomId) {
      return;
    }
    const newManorState = { ...manorState };
    const { up, down, left, right } = manorState[roomId];
    for (const neighborId of [up, down, left, right]) {
      if (!neighborId || !newManorState[neighborId]) {
        continue;
      }
      delete newManorState[neighborId].arrow;
    }
    setManorState(newManorState);
  };

  const handleChoiceClick = (blueprint: Blueprint) => {
    const disableInvalidDoors = () => {
      const dirsOfNeighborsToChange = Object.values(DIRECTIONS).filter(
        (dir) => !nextRoom.blueprint?.directions.includes(dir)
      );
      dirsOfNeighborsToChange.forEach((neighborDir) => {
        const neighborRoomId = nextRoom[neighborDir];
        if (
          !neighborRoomId ||
          newManorState[neighborRoomId].status !== STATUSES.activated ||
          neighborRoomId === currentRoomId
        ) {
          return;
        }
        const neighborDoors = manorState[neighborRoomId].blueprint?.directions;
        const newNeighborDoors = neighborDoors?.filter(
          (dir) => dir !== reversedDirections[neighborDir]
        );
        if (manorState[neighborRoomId].blueprint && newNeighborDoors) {
          manorState[neighborRoomId].blueprint.directions = newNeighborDoors;
        }
      });
    };

    const removeInvalidDirections = () => {
      nextRoom.blueprint?.directions.forEach((dir, i) => {
        if (!nextRoom[dir]) {
          return;
        }
        const neighborRoom = manorState[nextRoom[dir]];
        if (
          !neighborRoom.blueprint?.directions.includes(dir) &&
          neighborRoom.status === STATUSES.activated
        ) {
          nextRoom.blueprint?.directions.splice(i, 1);
        }
      });
    };

    const updateMessage = () => {
      const message: string[] = [];
      message.push(blueprint.message);
      message.push("　");
      [RESOURCES.keys, RESOURCES.gems].forEach((resource) => {
        message.push(getFoundResourcesMessage(resource, blueprint));
      });

      [
        { type: RESOURCES.keys, count: genKeys },
        { type: RESOURCES.gems, count: genGems },
      ].forEach((resource) => {
        message.push(getExtraResourcesMessage(resource.type, resource.count));
      });
      setMessage(message);
    };

    // Do nothing if clicking choice box while inactive
    if (!choicesActive) {
      return;
    }

    // If choice blueprint is too expensive
    if (resources.gems < blueprint.cost) {
      setMessage(["You don't have enough gems for that room!"]);
      return;
    }

    // If valid choice, update next room info
    const newManorState = { ...manorState };
    const nextRoom = newManorState[openingRoom];
    // Set blueprint to next room
    nextRoom.blueprint = blueprint;
    // Remove the chosen blueprint from the pool
    nextRoom.blueprint.draftable = false;

    // Disable doors which lead into new room but that new room doesn't have
    disableInvalidDoors();

    // Remove direction from drafted blueprint where there exists a room already without opposite direction
    removeInvalidDirections();

    // Allow movement from previous room and prevent duplicate directions
    if (draftingDir) {
      const reversedDir = reversedDirections[draftingDir];
      if (!nextRoom.blueprint.directions.includes(reversedDir)) {
        nextRoom.blueprint.directions.push(reversedDirections[draftingDir]);
      }
    }

    setManorState(newManorState);
    updateRoomStatus(openingRoom, STATUSES.activated);
    setCurrentRoomId(openingRoom);
    removeArrows(openingRoom);

    setChoices([]);
    setIsFrozen(false);
    setChoicesActive(false);

    const { genKeys, genGems } = generateInventory();

    updateMessage();

    setResources(() => {
      const newResources = { ...resources };
      newResources.keys += genKeys + (blueprint.keys ? blueprint.keys : 0);
      newResources.gems +=
        genGems + (blueprint.gems ? blueprint.gems : 0) + blueprint.cost * -1;
      newResources.steps -= 1;
      return newResources;
    });

    localStorage.setItem("manorState", JSON.stringify(manorState));
  };

  const reset = () => {
    setManorState(JSON.parse(startingState));
    setVictory(false);
    setResetBtnHighlight(false);
    setIsFrozen(false);
    setChoices([]);
    setChoicesActive(false);
    setResources(STARTING_RESOURCES);
    setDay(day + 1);
    setMessage(["Click an active room."]);
    setCurrentRoomId(ROOMS.entrance_hall);
    resetBlueprints();
    localStorage.setItem("manorState", "");
    localStorage.setItem("day", (day + 1).toString());
  };

  return (
    <>
      <div className="puzzle-explain">
        Your uncle bestowed upon you his manor in his will, but only if you can
        reach the Antechamber. Can you make your way through the manor?
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div className="choice-row-container">
          <div className="day-display">Day {day}</div>
          <MessageDisplay message={message} />
          <div className="choice-row">
            {Array.from({ length: 3 }).map((_, index) => {
              return (
                <ChoiceBox
                  key={"choice_" + index}
                  blueprint={choices[index]}
                  handleClick={handleChoiceClick}
                  active={choicesActive}
                  highlightSurroundingRooms={() => {
                    highlightSurroundingRooms(openingRoom, choices[index]);
                  }}
                  removeArrows={() => {
                    removeArrows(openingRoom);
                  }}
                ></ChoiceBox>
              );
            })}
          </div>
        </div>
        <div className="room-grid">
          <div>
            {[
              { type: RESOURCES.steps, count: resources.steps },
              { type: RESOURCES.keys, count: resources.keys },
              { type: RESOURCES.gems, count: resources.gems },
            ].map((resource, idx) => {
              return (
                <ResourceDisplay
                  key={idx}
                  resource={resource.type}
                  count={resource.count}
                />
              );
            })}
          </div>
          <ResetButton resetActive={resetActive} onClick={reset} />
          {Array.from({ length: LAYOUT.rows }).map((_, rowIdx) => (
            <div className="room-row" key={rowIdx}>
              {Array.from({ length: LAYOUT.cols }).map((_, colIdx) => {
                const roomId = createRoomId(colIdx, rowIdx);
                return (
                  <Room
                    roomId={roomId}
                    key={roomId}
                    state={manorState[roomId]}
                    current={currentRoomId === roomId}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Puzzle;
