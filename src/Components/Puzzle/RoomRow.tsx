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
  return (
    <div className="room-row" key={rowIdx}>
      {Array.from({ length: LAYOUT.cols }).map((_, colIdx) => {
        const roomId = createRoomId(colIdx, rowIdx);
        return (
          <Room
            roomId={roomId}
            key={roomId}
            state={manorState[roomId]}
            current={currentRoomId === roomId}
          />
        );
      })}
    </div>
  );
};

export default RoomRow;
