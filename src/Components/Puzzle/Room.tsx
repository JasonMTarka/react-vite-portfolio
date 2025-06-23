import "../../CSS/Puzzle/Puzzle.css";
import { STATUSES, ROOMS } from "./constants";
import type { RoomData, Direction } from "./types";
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

  const doorClasses = () => {
    if (state.status !== STATUSES.activated) {
      return "";
    }
    const allDirections: Direction[] = ["up", "down", "left", "right"];
    const presentDirections = state.blueprint?.directions || [];
    return allDirections
      .filter((dir) => !presentDirections.includes(dir))
      .map((dir) => `door-${dir}`)
      .join(" ");
  };

  return (
    <div
      className={`room ${setBaseClass(
        state.status,
        roomId
      )} ${setCurrentClass()} ${doorClasses()}`}
      id={roomId}
    >
      {[state.blueprint?.name].map((line, index) => {
        return <div key={index}>{line}</div>;
      })}
      <div>
        {state.status === STATUSES.locked ? "Locked" : ""}
        {state.status === STATUSES.active ? "Available" : ""}
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
