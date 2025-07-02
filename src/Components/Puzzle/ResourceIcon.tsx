import { FaRegGem } from "react-icons/fa";
import { RiKey2Fill } from "react-icons/ri";
import { PiCoins } from "react-icons/pi";
import { IoFootsteps } from "react-icons/io5";
import type { Resource } from "./puzzleTypes";
import { RESOURCES } from "./puzzleConstants";

const ResourceIcon = ({ resource }: { resource: Resource }) => {
  switch (resource) {
    case RESOURCES.steps:
      return <IoFootsteps />;
    case RESOURCES.gems:
      return <FaRegGem />;
    case RESOURCES.keys:
      return <RiKey2Fill />;
    case RESOURCES.coins:
      return <PiCoins />;
    default:
      return null;
  }
};

export default ResourceIcon;
