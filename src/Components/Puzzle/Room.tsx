import "../../CSS/Puzzle/Puzzle.css";
import { STATUSES, ROOMS, DIRECTIONS } from "./puzzleConstants";
import type { RoomData, RoomId, Status } from "./puzzleTypes";
import { arrowDisplay } from "./puzzleUtil";

const Room = ({
  roomId,
  state,
  current,
}: {
  roomId: RoomId;
  state: RoomData;
  current: boolean;
}) => {
  const setBaseClass = (status: Status, roomId: RoomId) => {
    if (roomId === ROOMS.antechamber) {
      return "antechamber";
    } else if (
      status === STATUSES.inactive ||
      status === STATUSES.locked_hidden
    ) {
      return "inactive";
    } else if (status === STATUSES.active) {
      return "active";
    } else if (status === STATUSES.activated) {
      return "activated";
    } else if (status === STATUSES.locked) {
      return "locked";
    } else if (status === STATUSES.current) {
      return "current";
    }
    return "";
  };

  const setCurrentClass = () => {
    return current ? " current" : "";
  };

  const doorClasses = () => {
    if (state.status !== STATUSES.activated) {
      return "";
    }
    const allDirections = Object.values(DIRECTIONS);
    const presentDirections = state.blueprint?.directions || [];
    return allDirections
      .filter((dir) => !presentDirections.includes(dir))
      .map((dir) => `wall-${dir}`)
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
        {state.status === STATUSES.locked
          ? "Locked"
          : state.status === STATUSES.active
          ? "Available"
          : ""}
      </div>
      {state.arrow ? (
        <div className="room-arrow">{arrowDisplay[state.arrow]}</div>
      ) : null}
    </div>
  );
};

export default Room;
