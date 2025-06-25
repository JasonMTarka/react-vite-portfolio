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
    let className = "";
    let text = "";
    switch (resource) {
      case RESOURCES.steps:
        className = "steps-display";
        text = "Steps";
        break;
      case RESOURCES.gems:
        className = "gems-display";
        text = "Gems";
        break;
      case RESOURCES.keys:
        className = "keys-display";
        text = "Keys";
        break;
      case RESOURCES.coins:
        className = "coins-display";
        text = "Coins";
    }
    setClassName(`resource-display ${className}`);
    setText(`${text}: ${count}`);
  }, [className, text, count, resource]);

  return <span className={className}>{text}</span>;
};

export default ResourceDisplay;
