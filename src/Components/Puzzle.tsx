import React, { useEffect, useState } from "react";
import "../CSS/Puzzle.css";
import Room from "./Room";

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
  const [manorState, setManorState] = useState<{ [key: string]: string }>({
    room_00: "inactive",
    room_01: "inactive",
    room_02: "inactive",
    room_03: "inactive",
    room_04: "inactive",
    room_05: "inactive",
    room_06: "inactive",
    room_07: "inactive",
    room_08: "inactive",
    room_10: "inactive",
    room_11: "inactive",
    room_12: "inactive",
    room_13: "inactive",
    room_14: "inactive",
    room_15: "inactive",
    room_16: "inactive",
    room_17: "inactive",
    room_18: "active",
    room_20: "inactive",
    room_21: "inactive",
    room_22: "inactive",
    room_23: "inactive",
    room_24: "inactive",
    room_25: "inactive",
    room_26: "inactive",
    room_27: "active",
    room_28: "activated",
    room_30: "inactive",
    room_31: "inactive",
    room_32: "inactive",
    room_33: "inactive",
    room_34: "inactive",
    room_35: "inactive",
    room_36: "inactive",
    room_37: "inactive",
    room_38: "active",
    room_40: "inactive",
    room_41: "inactive",
    room_42: "inactive",
    room_43: "inactive",
    room_44: "inactive",
    room_45: "inactive",
    room_46: "inactive",
    room_47: "inactive",
    room_48: "inactive",
  });

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
      console.log(neighborId);
      if (
        nCol >= 0 &&
        nCol < COLS &&
        nRow >= 0 &&
        nRow < ROWS &&
        newManorState[neighborId] === "inactive"
      ) {
        newManorState[neighborId] = "active";
      }
    });
    newManorState[roomId] = "activated";
    setManorState(newManorState);
  };

  const updateRoomStatus = (roomId: string, status: string) => {
    const newManorState = { ...manorState };
    newManorState[roomId] = status;
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
              return (
                <Room
                  roomId={roomId}
                  key={roomId}
                  status={manorState[roomId]}
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
