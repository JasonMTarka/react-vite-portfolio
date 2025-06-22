import "../../CSS/Puzzle/Puzzle.css";
import { STATUSES, ROOMS } from "./constants";
import type { RoomData } from "./types";
import { arrowDisplay } from "./puzzleUtil";

const Room = ({
  roomId,
  state,
  current,
}: {
  roomId: string;
  state: RoomData;
  current: boolean;
}) => {
  const setBaseClass = (status: string, roomId: string) => {
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

  const setCurrentClass = () => {
    return current ? " current-room" : "";
  };

  return (
    <div
      className={
        "room " + setBaseClass(state.status, roomId) + setCurrentClass()
      }
      id={roomId}
    >
      {[state.blueprint?.name].map((line, index) => {
        return <div key={index}>{line}</div>;
      })}
      <div>
        {state.status === STATUSES.locked ? "Locked" : ""}
        {state.status === STATUSES.active ? "Available" : ""}
        {roomId}
      </div>
      {state.arrow ? (
        <div className="room-arrow">{arrowDisplay[state.arrow]}</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Room;
