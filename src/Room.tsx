import "./Puzzle.css";

const Room = ({
  col,
  row,
  status,
  updateStatus,
  setMessage,
}: {
  col: number;
  row: number;
  status: string;
  updateStatus: (roomId: string, status: string) => void;
  setMessage: (message: string) => void;
}) => {
  const roomId = "room_" + col.toString() + row.toString();
  const STATUSES = {
    inactive: "inactive",
    active: "active",
    activated: "activated",
  };

  const handleClick = () => {
    if (status === STATUSES.inactive) {
      setMessage("That's an inactive room!");
    } else if (status === STATUSES.active) {
      setMessage("Select another active room.");
      updateStatus(roomId, STATUSES.activated);
    }
  };

  const setClass = (status: string) => {
    if (status === STATUSES.inactive) {
      return "inactive-puzzle-cell";
    } else if (status === STATUSES.active) {
      return "active-puzzle-cell";
    } else if (status === STATUSES.activated) {
      return "activated-puzzle-cell";
    }
  };

  return (
    <div
      className={"puzzle-cell " + setClass(status)}
      key={roomId}
      id={roomId}
      onClick={handleClick}
    >
      <div> {status}</div>
      <div>{roomId}</div>
    </div>
  );
};

export default Room;
