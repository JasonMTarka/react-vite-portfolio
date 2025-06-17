import { STATUSES } from "./constants";

export interface ManorData {
  [key: string]: {
    status: string;
    roomType?: string;
    inventory?: string[];
  };
}

const manorData: ManorData = {};

Array.from({ length: 49 }).map((_, index) => {
  manorData["room_" + index.toString().padStart(2, "0")] = {
    status: STATUSES.inactive,
  };
});

["room_18", "room_27", "room_38"].map((room) => {
  manorData[room] = { status: STATUSES.active };
});
manorData["room_28"] = { status: STATUSES.activated };

export default manorData;
