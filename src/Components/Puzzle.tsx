import React, { useEffect, useState } from "react";
import "../CSS/Puzzle.css";
import Room from "./Room";
import manorData, { type ManorData } from "./manorData";
import { STATUSES, ROOMS, LAYOUT, STARTING_STEPS } from "./constants";
import { type Blueprint, getRandomBlueprints } from "./blueprints";
import ChoiceBox from "./ChoiceBox";

const startingState = JSON.stringify(manorData);

const Puzzle: React.FC = () => {
  const [message, setMessage] = useState(["Click an active room."]);

  const [manorState, setManorState] = useState<ManorData>({ ...manorData });
  const [gems, setGems] = useState(0);
  const [keys, setKeys] = useState(0);
  const [steps, setSteps] = useState(STARTING_STEPS);

  const [choices, setChoices] = useState<Blueprint[]>([]);
  const [currentRoom, setCurrentRoom] = useState("");
  const [choicesActive, setChoicesActive] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [victory, setVictory] = useState(false);

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
      if (nCol >= 0 && nCol < LAYOUT.cols && nRow >= 0 && nRow < LAYOUT.rows) {
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

  const updateRoomStatus = (roomId: string, newStatus: string) => {
    saveNewManorState(roomId, "status", newStatus);
    // const newManorState = { ...manorState };
    // newManorState[roomId].status = newStatus;
    // setManorState(newManorState);
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
      setMessage(["You don't have enough gems for that room!"]);
      return;
    }

    //saveNewManorState(currentRoom, "blueprint", blueprint);
    const newManorState = { ...manorState };
    newManorState[currentRoom].blueprint = blueprint;
    newManorState[currentRoom].blueprint.draftable = false;
    setManorState(newManorState);
    updateRoomStatus(currentRoom, STATUSES.activated);

    setChoices([]);
    setIsFrozen(false);
    setChoicesActive(false);
    setCurrentRoom("");
    setSteps(steps - 1);

    const generateInventory = () => {
      // Weighted random: 0 (60%), 1 (20%), 2 (10%), 3 (10%)
      const weightedRandom = () => {
        const r = Math.random();
        if (r < 0.8) return 0;
        if (r < 0.9) return 1;
        return 2;
      };
      return { genKeys: weightedRandom(), genGems: weightedRandom() };
    };

    const { genKeys, genGems } = generateInventory();

    const message: string[] = [];
    message.push(blueprint.message);
    message.push("　");
    message.push(
      blueprint.gems
        ? `\nThere were ${blueprint.gems} gems inside the ${blueprint.name}.`
        : ""
    );
    message.push(
      blueprint.keys
        ? `\nThere were ${blueprint.keys} keys inside the ${blueprint.name}.`
        : ""
    );
    message.push(genKeys ? `\nYou found ${genKeys} extra keys!` : "");
    message.push(genGems ? `\nYou found ${genGems} extra gems!` : "");
    setMessage(message);

    setKeys(keys + genKeys + (blueprint.keys ? blueprint.keys : 0));
    setGems(
      gems + genGems - blueprint.cost + (blueprint.gems ? blueprint.gems : 0)
    );

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
    setMessage(["Click an active room."]);
    setSteps(STARTING_STEPS);
    localStorage.clear();
  };

  const createRoomId = (col: number, row: number) => {
    return "room_" + col.toString() + row.toString();
  };

  useEffect(() => {
    const savedData = localStorage.getItem("manorState");
    if (savedData) {
      setManorState(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (victory) {
      setMessage(["You inherited the manor!"]);
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
          <div className="message-display">
            {message.map((val, i) => {
              return <div key={i}>{val}</div>;
            })}
          </div>
          <button className="clear-grid-btn" onClick={reset}>
            Reset
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
          <div>
            <span className="resource-display steps-display">
              Steps: {steps}
            </span>
            <span className="resource-display keys-display">Keys: {keys}</span>
            <span className="resource-display gems-display">Gems: {gems}</span>
          </div>
          {Array.from({ length: LAYOUT.rows }).map((_, rowIdx) => (
            <div className="puzzle-row" key={rowIdx}>
              {Array.from({ length: LAYOUT.cols }).map((_, colIdx) => {
                const roomId = createRoomId(colIdx, rowIdx);
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
                    text={[name, status]}
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
