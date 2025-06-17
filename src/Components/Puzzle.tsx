import React, { useEffect, useState } from "react";
import "../CSS/Puzzle.css";
import Room from "./Room";
import { type ManorData } from "./ManorData";
import manorData from "./ManorData";

const ROWS = 9;
const COLS = 5;

const STATUSES = {
  inactive: "inactive",
  active: "active",
  activated: "activated",
};

const ROOMS = {
  antechamber: "room_20",
  entrance_hall: "room_28",
};

const Puzzle: React.FC = () => {
  const [message, setMessage] = useState("Click an active room.");
  const [victory, setVictory] = useState(false);
  const [manorState, setManorState] = useState<ManorData>(manorData);

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
        newManorState[neighborId].status === "inactive"
      ) {
        newManorState[neighborId].status = "active";
      }
    });
    newManorState[roomId].status = "activated";
    setManorState(newManorState);
  };

  const updateRoomStatus = (roomId: string, status: string) => {
    const newManorState = { ...manorState };
    newManorState[roomId].status = status;
    setManorState(newManorState);
    if (status === "activated") {
      activateSurroundingRooms(roomId);
    }
    if (status === "activated" && roomId === ROOMS.antechamber) {
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
  };

  const setRoomId = (col: number, row: number) => {
    return "room_" + col.toString() + row.toString();
  };

  return (
    <>
      <div className="puzzle-explain">
        Your uncle bestowed upon you his manor in his will, but only if you can
        reach the final room. Can you make your way through the maze?
      </div>
      <div className="puzzle-explain">{message}</div>
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
                  text={[status, roomId]}
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
