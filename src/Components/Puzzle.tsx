import React, { useEffect, useState } from "react";
import "../CSS/Puzzle.css";
import Room from "./Room";
import manorData, { type Blueprint, type ManorData } from "./manorData";
import { STATUSES, ROOMS, BLUEPRINTS } from "./constants";
import ChoiceBox from "./ChoiceBox";

const ROWS = 9;
const COLS = 5;

const startingState = JSON.stringify(manorData);

const Puzzle: React.FC = () => {
  const [message, setMessage] = useState("Click an active room.");
  const [victory, setVictory] = useState(false);
  const [manorState, setManorState] = useState<ManorData>({ ...manorData });
  const [gems, setGems] = useState(0);
  const [keys, setKeys] = useState(0);
  const [isFrozen, setIsFrozen] = useState(false);
  const [choices, setChoices] = useState<Blueprint[]>([]);
  const [currentRoom, setCurrentRoom] = useState("");
  const [choicesActive, setChoicesActive] = useState(false);

  useEffect(() => {
    if (victory) {
      setMessage("You inherited the manor!");
      setIsFrozen(true);
    }
  }, [victory]);

  const saveNewManorState = (
    roomId: string,
    attribute: string,
    // eslint-disable-next-line
    newVal: any
  ) => {
    const newManorState = { ...manorState };
    // @ts-expect-error Used to help avoid repetition when saving state
    newManorState[roomId][attribute] = newVal;
    setManorState(newManorState);
  };

  const activateSurroundingRooms = (roomId: string) => {
    const [colStr, rowStr] = roomId.replace("room_", "").split("");
    const col = parseInt(colStr, 10);
    const row = parseInt(rowStr, 10);
    const directions = [
      [0, 1], // down
      [0, -1], // up
      [1, 0], // right
      [-1, 0], // left
    ];
    const newManorState = { ...manorState };
    directions.forEach(([dc, dr]) => {
      const nCol = col + dc;
      const nRow = row + dr;
      const neighborId = `room_${nCol}${nRow}`;
      if (nCol >= 0 && nCol < COLS && nRow >= 0 && nRow < ROWS) {
        const neighborStatus = newManorState[neighborId].status;
        if (neighborStatus === STATUSES.locked_hidden) {
          newManorState[neighborId].status = STATUSES.locked;
        } else if (neighborStatus === STATUSES.inactive) {
          newManorState[neighborId].status = STATUSES.active;
        }
      }
    });
    newManorState[roomId].status = STATUSES.activated;
    setManorState(newManorState);
  };

  const updateRoomStatus = (roomId: string, status: string) => {
    saveNewManorState(roomId, "status", status);
    // const newManorState = { ...manorState };
    // newManorState[roomId].status = status;
    // setManorState(newManorState);
    if (status === STATUSES.activated) {
      activateSurroundingRooms(roomId);
    }
    if (status === STATUSES.activated && roomId === ROOMS.antechamber) {
      setVictory(true);
    }
  };

  const handleRoomClick = (roomId: string, status: string) => {
    const goToChoice = () => {
      setIsFrozen(true);
      setChoicesActive(true);
      setCurrentRoom(roomId);
      setChoices([BLUEPRINTS.parlor, BLUEPRINTS.hallway, BLUEPRINTS.security]);
    };

    if (isFrozen) {
      setMessage("You need to choose a blueprint first.");
      return;
    }
    if (status === STATUSES.inactive) {
      setMessage("That's an inactive room!");
      return;
    }
    if (status === STATUSES.activated) {
      setMessage("You've already drafted that room.");
      return;
    }
    if (status === STATUSES.active && roomId === ROOMS.antechamber) {
      updateRoomStatus(ROOMS.antechamber, STATUSES.activated);
      return;
    }
    if (status === STATUSES.active) {
      setMessage("Select a room to place:");
      goToChoice();
      return;
    }
    if (status === STATUSES.locked) {
      setMessage("You used a key to unlock this room.");
      setKeys(keys - 1);
      saveNewManorState(roomId, "status", STATUSES.active);
      // const newManorState = { ...manorState };
      // newManorState[roomId].status = STATUSES.active;
      // setManorState(newManorState);
      goToChoice();
      return;
    }
  };

  const handleChoiceClick = (blueprint: Blueprint) => {
    if (!choicesActive) {
      return;
    }
    if (gems < blueprint.cost) {
      setMessage("You don't have enough gems for that room!");
      return;
    }

    saveNewManorState(currentRoom, "blueprint", blueprint);
    // const newManorState = { ...manorState };
    // newManorState[currentRoom].blueprint = blueprint;
    // setManorState(newManorState);
    updateRoomStatus(currentRoom, STATUSES.activated);

    setChoices([]);
    setIsFrozen(false);
    setChoicesActive(false);
    setCurrentRoom("");

    const inventory = manorState[currentRoom].inventory;
    setKeys(keys + inventory.keys);
    setGems(gems + inventory.gems - blueprint.cost);
    inventory.keys = 0;
    inventory.gems = 0;

    localStorage.setItem("manorState", JSON.stringify(manorState));
  };

  const setRoomId = (col: number, row: number) => {
    return "room_" + col.toString() + row.toString();
  };

  useEffect(() => {
    const savedData = localStorage.getItem("manorState");
    if (savedData) {
      setManorState(JSON.parse(savedData));
    }
  }, []);

  const reset = () => {
    setManorState(JSON.parse(startingState));
    setVictory(false);
    setGems(0);
    setKeys(0);
    localStorage.clear();
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
        <div className="side-row-container">
          <div>
            <span className="keys-display">Keys: {keys}</span>
            <span className="gems-display">Gems: {gems}</span>
          </div>
          <div className="message-display">{message}</div>
          <button className="clear-grid-btn" onClick={reset}>
            Clear Grid
          </button>
          <div className="side-row">
            {Array.from({ length: 3 }).map((_, index) => {
              return (
                <ChoiceBox
                  key={"choice_" + index}
                  blueprint={choices[index]}
                  handleClick={handleChoiceClick}
                  active={choicesActive}
                ></ChoiceBox>
              );
            })}
          </div>
        </div>
        <div className="puzzle-grid">
          {Array.from({ length: ROWS }).map((_, rowIdx) => (
            <div className="puzzle-row" key={rowIdx}>
              {Array.from({ length: COLS }).map((_, colIdx) => {
                const roomId = setRoomId(colIdx, rowIdx);
                const status = manorState[roomId].status;
                const blueprint = manorState[roomId].blueprint;
                let name = "";
                if (blueprint) {
                  name = blueprint.name;
                }
                return (
                  <Room
                    roomId={roomId}
                    key={roomId}
                    text={[
                      name,
                      "gems: " + manorState[roomId].inventory.gems.toString(),
                      "keys: " + manorState[roomId].inventory.keys.toString(),
                      status,
                    ]}
                    status={status}
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
