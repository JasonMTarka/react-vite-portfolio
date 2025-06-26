import { LAYOUT } from "./puzzleConstants";
import type { ManorData, RoomId } from "./puzzleTypes";
import { createRoomId } from "./puzzleUtil";
import Room from "./Room";

const RoomRow = ({
  rowIdx,
  manorState,
  currentRoomId,
}: {
  rowIdx: number;
  manorState: ManorData;
  currentRoomId: RoomId;
}) => {
  const renderRooms = () => {
    return Array.from({ length: LAYOUT.cols }).map((_, colIdx) => {
      const roomId = createRoomId(colIdx, rowIdx);
      return (
        <Room
          roomId={roomId}
          key={roomId}
          state={manorState[roomId]}
          current={currentRoomId === roomId}
        />
      );
    });
  };

  return <div className="room-row">{renderRooms()}</div>;
};

export default RoomRow;
