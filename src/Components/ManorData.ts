export interface ManorData {
  [key: string]: {
    status: string;
    roomType?: string;
  };
}

const manorData: ManorData = {};

Array.from({ length: 49 }).map((_, index) => {
  manorData["room_" + index.toString().padStart(2, "0")] = {
    status: "inactive",
  };
});

manorData["room_18"] = { status: "active" };
manorData["room_27"] = { status: "active" };
manorData["room_28"] = { status: "activated" };
manorData["room_38"] = { status: "active" };

export default manorData;
