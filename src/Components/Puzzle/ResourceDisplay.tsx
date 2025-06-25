import { useEffect, useState } from "react";
import { RESOURCES } from "./puzzleConstants";
import type { Resource } from "./puzzleTypes";

const ResourceDisplay = ({
  resource,
  count,
}: {
  resource: Resource;
  count: number;
}) => {
  const [className, setClassName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    let text = "";
    switch (resource) {
      case RESOURCES.steps:
        text = "Steps";
        break;
      case RESOURCES.gems:
        text = "Gems";
        break;
      case RESOURCES.keys:
        text = "Keys";
        break;
      case RESOURCES.coins:
        text = "Coins";
    }
    setClassName(`resource-display ${resource}`);
    setText(`${text}: ${count}`);
  }, [className, text, count, resource]);

  return <span className={className}>{text}</span>;
};

export default ResourceDisplay;
