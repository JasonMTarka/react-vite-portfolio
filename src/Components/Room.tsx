import "../CSS/Puzzle.css";
import { STATUSES, ROOMS } from "./constants";
import { type Blueprint } from "./blueprints";

const Room = ({
  roomId,
  state,
  handleClick,
}: {
  roomId: string;
  state: { status: string; blueprint?: Blueprint };
  handleClick: (roomId: string, status: string) => void;
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

  const onClick = () => {
    handleClick(roomId, state.status);
  };

  return (
    <div
      className={"puzzle-cell " + setClass(state.status, roomId)}
      key={roomId}
      id={roomId}
      onClick={onClick}
    >
      {state.status === STATUSES.locked ? "Locked" : ""}
      {state.status === STATUSES.active && roomId != ROOMS.antechamber
        ? "Available"
        : ""}
      {[state.blueprint?.name].map((line, index) => {
        return <div key={index}>{line}</div>;
      })}
    </div>
  );
};

export default Room;
