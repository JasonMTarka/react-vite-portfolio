import "../../CSS/Puzzle/Puzzle.css";
import { STATUSES, ROOMS } from "./constants";
import type { RoomData, Status } from "./types";

const Room = ({
  roomId,
  state,
  handleClick,
}: {
  roomId: string;
  state: RoomData;
  handleClick: (roomId: string, status: Status) => void;
}) => {
  const setClass = (status: string, roomId: string) => {
    if (roomId === ROOMS.antechamber) {
      return "antechamber";
    } else if (
      status === STATUSES.inactive ||
      status === STATUSES.locked_hidden
    ) {
      return "inactive-room";
    } else if (status === STATUSES.active) {
      return "active-room";
    } else if (status === STATUSES.activated) {
      return "activated-room";
    } else if (status === STATUSES.locked) {
      return "locked-room";
    } else if (status === STATUSES.current) {
      return "current-room";
    }
  };

  return (
    <div
      className={"room " + setClass(state.status, roomId)}
      id={roomId}
      onClick={() => handleClick(roomId, state.status)}
    >
      {[state.blueprint?.name].map((line, index) => {
        return <div key={index}>{line}</div>;
      })}
      <div>
        {state.status === STATUSES.locked ? "Locked" : ""}
        {state.status === STATUSES.active ? "Available" : ""}
      </div>
      {state.arrow ? <div className="room-arrow">{state.arrow}</div> : ""}
    </div>
  );
};

export default Room;
