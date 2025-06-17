import "../CSS/Puzzle.css";

const STATUSES = {
  inactive: "inactive",
  active: "active",
  activated: "activated",
};

const Room = ({
  roomId,
  text,
  status,
  handleClick,
}: {
  roomId: string;
  text: string[];
  status: string;
  handleClick: (roomId: string, status: string) => void;
}) => {
  const setClass = (status: string, roomId: string) => {
    if (roomId === "room_20") {
      return "antechamber";
    } else if (status === STATUSES.inactive) {
      return "inactive-puzzle-cell";
    } else if (status === STATUSES.active) {
      return "active-puzzle-cell";
    } else if (status === STATUSES.activated) {
      return "activated-puzzle-cell";
    }
  };

  const onClick = () => {
    handleClick(roomId, status);
  };

  return (
    <div
      className={"puzzle-cell " + setClass(status, roomId)}
      key={roomId}
      id={roomId}
      onClick={onClick}
    >
      {text.map((line) => {
        return <div>{line}</div>;
      })}
    </div>
  );
};

export default Room;
