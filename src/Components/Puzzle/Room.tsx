import "../../CSS/Puzzle/Puzzle.css";
import { STATUSES, ROOMS } from "./constants";
import type { Blueprint, Status } from "./types";

const Room = ({
  roomId,
  state,
  handleClick,
}: {
  roomId: string;
  state: { status: Status; blueprint?: Blueprint };
  handleClick: (roomId: string, status: Status) => void;
}) => {
  const setClass = (status: string, roomId: string) => {
    if (roomId === ROOMS.antechamber) {
      return "antechamber";
    } else if (
      status === STATUSES.inactive ||
      status === STATUSES.locked_hidden
    ) {
      return "inactive-puzzle-cell";
    } else if (status === STATUSES.active) {
      return "active-puzzle-cell";
    } else if (status === STATUSES.activated) {
      return "activated-puzzle-cell";
    } else if (status === STATUSES.locked) {
      return "locked-puzzle-cell";
    } else if (status === STATUSES.current) {
      return "current-puzzle-cell";
    }
  };

  return (
    <div
      className={"puzzle-cell " + setClass(state.status, roomId)}
      key={roomId}
      id={roomId}
      onClick={() => handleClick(roomId, state.status)}
    >
      {state.status === STATUSES.locked ? "Locked" : ""}
      {state.status === STATUSES.active ? "Available" : ""}
      {[state.blueprint?.name].map((line, index) => {
        return <div key={index}>{line}</div>;
      })}
    </div>
  );
};

export default Room;
