import React, { useEffect, useState } from "react";
import "../CSS/Puzzle.css";
import Room from "./Room";
import manorData, { type ManorData } from "./ManorData";
import { STATUSES, ROOMS } from "./constants";

const ROWS = 9;
const COLS = 5;

const startingState = JSON.stringify(manorData);

const Puzzle: React.FC = () => {
  const [message, setMessage] = useState("Click an active room.");
  const [victory, setVictory] = useState(false);
  const [manorState, setManorState] = useState<ManorData>({ ...manorData });
  const [gems, setGems] = useState(0);
  const [keys, setKeys] = useState(0);

  useEffect(() => {
    if (victory) {
      setMessage("You inherited the manor!");
    }
  }, [victory]);

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
      if (
        nCol >= 0 &&
        nCol < COLS &&
        nRow >= 0 &&
        nRow < ROWS &&
        newManorState[neighborId].status === STATUSES.inactive
      ) {
        newManorState[neighborId].status = STATUSES.active;
      }
    });
    newManorState[roomId].status = STATUSES.activated;
    setManorState(newManorState);
  };

  const updateRoomStatus = (roomId: string, status: string) => {
    const newManorState = { ...manorState };
    newManorState[roomId].status = status;
    setManorState(newManorState);
    if (status === STATUSES.activated) {
      activateSurroundingRooms(roomId);
    }
    if (status === STATUSES.activated && roomId === ROOMS.antechamber) {
      setVictory(true);
    }
  };

  const handleClick = (roomId: string, status: string) => {
    if (status === STATUSES.inactive) {
      setMessage("That's an inactive room!");
    } else if (status === STATUSES.active) {
      setMessage("Select another active room.");
      updateRoomStatus(roomId, STATUSES.activated);
    }

    const inventory = manorState[roomId].inventory;

    setKeys(keys + inventory.keys);
    setGems(gems + inventory.gems);

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
    localStorage.clear();
  };

  return (
    <>
      <div className="puzzle-explain">
        Your uncle bestowed upon you his manor in his will, but only if you can
        reach the final room. Can you make your way through the maze?
      </div>
      <div>
        <span className="message-display">{message}</span>
        <span className="keys-display">Keys: {keys}</span>
        <span className="gems-display">Gems: {gems}</span>
      </div>
      <button className="clear-grid-btn" onClick={reset}>
        Clear Grid
      </button>
      <div className="puzzle-grid">
        {Array.from({ length: ROWS }).map((_, rowIdx) => (
          <div className="puzzle-row" key={rowIdx}>
            {Array.from({ length: COLS }).map((_, colIdx) => {
              const roomId = setRoomId(colIdx, rowIdx);
              const status = manorState[roomId].status;
              return (
                <Room
                  roomId={roomId}
                  key={roomId}
                  text={[
                    status,
                    roomId,
                    "keys: " + manorState[roomId].inventory.keys.toString(),
                    "gems: " + manorState[roomId].inventory.gems.toString(),
                  ]}
                  status={status}
                  handleClick={handleClick}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default Puzzle;
