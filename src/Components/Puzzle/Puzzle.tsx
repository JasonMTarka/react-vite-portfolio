import "../../CSS/Puzzle/Puzzle.css";
import React, { useEffect, useState } from "react";
import Room from "./Room";
import manorData from "./manorData";
import {
  STATUSES,
  ROOMS,
  LAYOUT,
  STARTING_STEPS,
  RESOURCES,
  DIRECTIONS,
} from "./constants";
import { getRandomBlueprints, resetBlueprints } from "./blueprints";
import ChoiceBox from "./ChoiceBox";
import type { Blueprint, ManorData, Resource, Direction } from "./types";
import {
  getDay,
  getExtraResourcesMessage,
  getFoundResourcesMessage,
  createRoomId,
  generateInventory,
} from "./puzzleUtil";
import ResourceDisplay from "./ResourceDisplay";
import ResetButton from "./ResetButton";
import MessageDisplay from "./MessageDisplay";

const startingState = JSON.stringify(manorData);

const Puzzle: React.FC = () => {
  const [message, setMessage] = useState(["Click an active room."]);

  const [manorState, setManorState] = useState<ManorData>({ ...manorData });
  const [gems, setGems] = useState(0);
  const [keys, setKeys] = useState(0);
  const [steps, setSteps] = useState(STARTING_STEPS);

  const [choices, setChoices] = useState<Blueprint[]>([]);
  const [choicesActive, setChoicesActive] = useState(false);
  const [currentRoom, setCurrentRoom] = useState("");
  const [isFrozen, setIsFrozen] = useState(false);
  const [victory, setVictory] = useState(false);

  const [day, setDay] = useState(getDay());

  useEffect(() => {
    const savedData = localStorage.getItem("manorState");
    if (savedData) {
      setManorState(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (victory) {
      setMessage([
        "You inherited the manor!",
        "Press the 'Reset Manor' button to play again.",
      ]);
    }
  }, [victory]);

  useEffect(() => {
    if (!steps) {
      setMessage([
        "You ran out of steps!",
        "Press the clear button to try again.",
      ]);
      setIsFrozen(true);
    }
  }, [steps]);

  const saveNewManorState = (
    roomId: string,
    property: string,
    // eslint-disable-next-line
    newVal: any
  ) => {
    const newManorState = { ...manorState };
    // @ts-expect-error: Used to help avoid repetition when saving state
    newManorState[roomId][property] = newVal;
    setManorState(newManorState);
  };

  const updateResources = (
    resource: Resource,
    sources: (number | undefined)[]
  ) => {
    let sum = sources.reduce((prev, curr) => {
      if (!curr) {
        curr = 0;
      }
      if (!prev) {
        prev = 0;
      }
      return prev + curr;
    });

    if (!sum) {
      return;
    }

    if (resource === RESOURCES.gems) {
      sum += gems;
      setGems(sum);
    } else if (resource === RESOURCES.keys) {
      sum += keys;
      setKeys(sum);
    }
  };

  const activateSurroundingRooms = (roomId: string) => {
    const newManorState = { ...manorState };
    const directions = manorState[roomId].blueprint?.directions;
    const neighbors = getSurroundingRooms(roomId);
    if (!neighbors || !directions) {
      return;
    }
    for (const direction of directions) {
      const neighborId = neighbors[direction];
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
  };

  const getSurroundingRooms = (roomId: string) => {
    if (!roomId) {
      return;
    }
    const [colStr, rowStr] = roomId.replace("room_", "").split("");
    const col = parseInt(colStr, 10);
    const row = parseInt(rowStr, 10);
    const directions = [
      [0, 1], // down
      [0, -1], // up
      [1, 0], // right
      [-1, 0], // left
    ];
    const neighbors: Partial<Record<Direction, string>> = {};
    directions.forEach(([dc, dr], index) => {
      const nCol = col + dc;
      const nRow = row + dr;

      // Remove invalid rooms
      if (nCol < 0 || nCol >= 5) {
        return;
      }
      if (nRow >= 9 || nRow < 0) {
        return;
      }

      const neighborId = `room_${nCol}${nRow}`;
      if (index === 0) {
        neighbors[DIRECTIONS.down] = neighborId;
      }
      if (index === 1) {
        neighbors[DIRECTIONS.up] = neighborId;
      }
      if (index === 2) {
        neighbors[DIRECTIONS.right] = neighborId;
      }
      if (index === 3) {
        neighbors[DIRECTIONS.left] = neighborId;
      }
    });
    return neighbors;
  };

  const highlightSurroundingRooms = (
    roomId: string,
    choiceBlueprint: Blueprint
  ) => {
    const neighbors = getSurroundingRooms(roomId);
    if (!neighbors) {
      return;
    }
    const newManorState = { ...manorState };
    const directions = choiceBlueprint.directions;
    if (directions) {
      directions.map((direction) => {
        if (!neighbors[direction]) {
          return;
        }
        const neighborStatus = newManorState[neighbors[direction]].status;
        if (
          neighborStatus === STATUSES.inactive ||
          neighborStatus === STATUSES.locked_hidden
        ) {
          newManorState[neighbors[direction]].arrow = direction;
        }
      });
    }
    setManorState(newManorState);
  };

  const removeArrows = (roomId: string) => {
    const neighbors = getSurroundingRooms(roomId);
    if (!neighbors) {
      return;
    }
    const newManorState = { ...manorState };
    for (const value of Object.values(neighbors)) {
      newManorState[value].arrow = undefined;
    }
    setManorState(newManorState);
  };

  const updateRoomStatus = (roomId: string, newStatus: string) => {
    saveNewManorState(roomId, "status", newStatus);
    if (newStatus === STATUSES.activated) {
      activateSurroundingRooms(roomId);
    }
    if (newStatus === STATUSES.activated && roomId === ROOMS.antechamber) {
      setVictory(true);
    }
  };

  const handleRoomClick = (roomId: string, status: string) => {
    const goToChoice = () => {
      setIsFrozen(true);
      setChoicesActive(true);
      setCurrentRoom(roomId);
      setChoices(getRandomBlueprints());
    };

    if (isFrozen && steps) {
      setMessage(["You need to choose a blueprint first."]);
      return;
    }
    if (isFrozen && !steps) {
      return;
    }
    if (status === STATUSES.inactive || status === STATUSES.locked_hidden) {
      setMessage(["That's an inactive room!"]);
      return;
    }
    if (status === STATUSES.activated) {
      setMessage(["You've already drafted that room."]);
      return;
    }
    if (status === STATUSES.active && roomId === ROOMS.antechamber) {
      updateRoomStatus(ROOMS.antechamber, STATUSES.activated);
      return;
    }
    if (status === STATUSES.active) {
      saveNewManorState(roomId, "status", STATUSES.current);
      setMessage(["Select a room to place:"]);
      goToChoice();
      return;
    }
    if (status === STATUSES.locked) {
      if (!keys) {
        setMessage(["You don't have any keys!"]);
        return;
      }
      setMessage([
        "You used a key to unlock this room.",
        "Select a room to place:",
      ]);
      updateResources(RESOURCES.keys, [-1]);
      saveNewManorState(roomId, "status", STATUSES.current);
      goToChoice();
      return;
    }
  };

  const handleChoiceClick = (blueprint: Blueprint) => {
    if (!choicesActive) {
      return;
    }
    if (gems < blueprint.cost) {
      setMessage(["You don't have enough gems for that room!"]);
      return;
    }

    const newManorState = { ...manorState };
    newManorState[currentRoom].blueprint = blueprint;
    newManorState[currentRoom].blueprint.draftable = false;
    setManorState(newManorState);
    updateRoomStatus(currentRoom, STATUSES.activated);
    removeArrows(currentRoom);

    setChoices([]);
    setIsFrozen(false);
    setChoicesActive(false);
    setCurrentRoom("");
    setSteps(steps - 1);

    const message: string[] = [];
    message.push(blueprint.message);
    message.push("　");
    [RESOURCES.keys, RESOURCES.gems].map((resource) => {
      message.push(getFoundResourcesMessage(resource, blueprint));
    });

    const { genKeys, genGems } = generateInventory();
    [
      { type: RESOURCES.keys, count: genKeys },
      { type: RESOURCES.gems, count: genGems },
    ].map((resource) => {
      message.push(getExtraResourcesMessage(resource.type, resource.count));
    });
    setMessage(message);

    updateResources(RESOURCES.keys, [genKeys, blueprint.keys]);
    updateResources(RESOURCES.gems, [
      genGems,
      blueprint.gems,
      blueprint.cost * -1,
    ]);

    localStorage.setItem("manorState", JSON.stringify(manorState));
  };

  const reset = () => {
    setManorState(JSON.parse(startingState));
    setVictory(false);
    setIsFrozen(false);
    setChoices([]);
    setChoicesActive(false);
    setGems(0);
    setKeys(0);
    setDay(day + 1);
    setMessage(["Click an active room."]);
    setSteps(STARTING_STEPS);
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
                    highlightSurroundingRooms(currentRoom, choices[index]);
                  }}
                  removeArrows={() => {
                    removeArrows(currentRoom);
                  }}
                ></ChoiceBox>
              );
            })}
          </div>
        </div>
        <div className="room-grid">
          <div>
            {[
              { type: RESOURCES.steps, count: steps },
              { type: RESOURCES.keys, count: keys },
              { type: RESOURCES.gems, count: gems },
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
          <ResetButton victory={victory} onClick={reset} />
          {Array.from({ length: LAYOUT.rows }).map((_, rowIdx) => (
            <div className="room-row" key={rowIdx}>
              {Array.from({ length: LAYOUT.cols }).map((_, colIdx) => {
                const roomId = createRoomId(colIdx, rowIdx);
                return (
                  <Room
                    roomId={roomId}
                    key={roomId}
                    state={manorState[roomId]}
                    handleClick={handleRoomClick}
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
